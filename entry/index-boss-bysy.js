mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {
			
			mui('.mui-table-view').on('tap','a', function(e) {
				var href = this.getAttribute('href');
				var disIntId = this.getAttribute('data-mingxi-id');
				var intItem = this.getAttribute('data-int-item'); 
				
				mui.openWindow({
					url: href + '.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},
					extras:{
						disIntId:disIntId,
						intItem:intItem 
					},
					waiting: {
						autoShow: true,
						title: '拼命加载中...'
					},
				})
			})
			var isJifen = 0
			
			if(plus.webview.currentWebview().isJifen==1)
				isJifen=1;
			var getInfoData = {
				"token":plus.storage.getItem('token'),
				"if_int":isJifen
			}
			
			mui.ajax(apiUrl + 'cmpint/month_out_list', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					console.log(data)
					var data = JSON.parse(data);
					
					if(data.status == 1) {						
					
						var shiyongListHtml = '';
						if(data.data!=''){
							mui.each(data.data,function(index,item){
								if(item.dis_int_id!='0')
									shiyongListHtml += '<li class="mui-table-view-cell"><a data-int-item="' + item.int_item + '" class="mui-navigate-right" href="index-boss-bysy-detail" data-mingxi-id="' + item.dis_int_id + '"><div class="mui-row"><div class="mui-col-xs-5" style="overflow:hidden;text-overflow : ellipsis"><i class="mui-icon mui-icon-checkmarkempty"></i>' + item.int_item + '</div><div class="mui-col-xs-3"><span class="text-danger">' + item.dis_int_num + '</span></div><div class="mui-col-xs-4"><span class="mui-badge mui-badge-inverted">' + item.add_time + '</span></div></div></a></li>';
								else
									shiyongListHtml += '<li class="mui-table-view-cell"><div class="mui-row"><div class="mui-col-xs-5" style="overflow:hidden;text-overflow : ellipsis"><i class="mui-icon mui-icon-checkmarkempty"></i>' + item.int_item + '</div><div class="mui-col-xs-3"><span class="text-blue">' + item.dis_int_num + '</span></div><div class="mui-col-xs-4"><span class="mui-badge mui-badge-inverted">' + item.add_time + '</span></div></div></li>';
							})
						}			
						
						document.getElementById('ben-yue-shi-yong-list').innerHTML = shiyongListHtml;  
						
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
					if(typeinfo=='abort'){
						mui.alert('连接不到网络，请检查您当前的网络设置');
					}else{
						mui.alert('参数错误' + typeinfo);
					}
				}
			});
		})