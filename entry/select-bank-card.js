mui.init({
			swipeBack: true //启用右滑关闭功能  

		});
		mui.plusReady(function() {
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
							bankCardListHtml += '<li class="mui-table-view-cell mui-checkbox mui-right mui-media"<div class="mui-media-body">' + item.bank_name + '<p class="mui-ellipsis">尾号（' + item.card_num.substring(item.card_num.length-4,item.card_num.length) + '）</p></div><input name="userid" data-card-num="' + item.card_num.substring(item.card_num.length-4,item.card_num.length) + '" data-bank-name="' + item.bank_name + '" data-card-id="' + item.users_bank_card_id + '" type="checkbox"></li>';
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
			//选择银行卡
			mui(document).on('change','input[type="checkbox"]',function(){
				
				var openerHtml = '<a class="mui-navigate-right">提现到<span>' + this.getAttribute('data-bank-name') + '(' + this.getAttribute('data-card-num') + ')</span></a>';
				var cardId = this.getAttribute('data-card-id'); 
				
				var scoreTixian = plus.webview.currentWebview().opener();
				mui.fire(scoreTixian,'insertSelectBank',{
					cardHtml:openerHtml,	
					cardId:cardId
				});
				mui.back()
				
			})
			
			//链接
			mui('.mui-table-view').on('tap','a', function(e) {
				
				var href = this.getAttribute('href');
				mui.openWindow({
					url: href+'.html',
					id: href,
					createNew: true,					
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
		})