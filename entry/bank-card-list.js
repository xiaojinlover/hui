mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {
			
			mui('.mui-table-view').on('tap','a', function(e) {
				var bankCardId = this.getAttribute('data-card-id');
				var bankName = this.getAttribute('data-bank-name');
				var cardNum = this.getAttribute('data-card-num');
				var href = this.getAttribute('href');
				mui.openWindow({
					url: href+'.html',
					id: href,
					createNew: true,
					extras:{
						"bankCardId":bankCardId,
						"bankName":bankName,
						"cardNum":cardNum
					},
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},
					waiting: {
						autoShow: true,
						title: '拼命加载中...'
					}
				})				
			})
			
			//获取卡列表
			var getInfoData = {
				"token":plus.storage.getItem('token')
			}
			mui.ajax(apiUrl + 'Usersint/bank_card_list', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					if(data.status==1&&data.data!=''){
						var bankCardListHtml = '';
						mui.each(data.data,function(index,item){
							bankCardListHtml += '<li class="mui-table-view-cell"><a class="mui-navigate-right" href="bank-card-delet" data-card-num="' + item.card_num.substring(item.card_num.length-4,item.card_num.length) + '" data-bank-name="' + item.bank_name + '" data-card-id="' + item.users_bank_card_id + '">' + (item.bank_name!=''?item.bank_name:"暂无") + '<p>' + (item.card_type!=''?item.card_type:"暂无") + '</p><span class="mui-badge mui-badge-primary mui-badge-inverted" style="font-size: 22px;">**** **** **** ' + item.card_num.substring(item.card_num.length-4,item.card_num.length) + '</span></a></li>';
						})
						document.getElementById('bank-card-list').innerHTML = bankCardListHtml;
					}					
				},
				beforeSend: function() {
					plus.nativeUI.showWaiting("玩命加载中...", {
						background: "rgba(0,0,0,0.5)"
					});

				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				},
				error: function(xhr, typeinfo) {
					mui.alert("参数错误：" + typeinfo);
				}
			});
			
		})