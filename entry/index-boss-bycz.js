mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {			
			mui('.mui-media').on('tap','a', function(e) {
				mui.openWindow({
					url: 'score-syjf.html',
					id: 'score-syjf',
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},
					waiting: {
						autoShow: true,
						title: '拼命加载中...'
					},
				})				
			})
			
			var getInfoData = {
				"token":plus.storage.getItem('token')
			}
			mui.ajax(apiUrl + 'cmpint/month_in_list', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					if(data.status == 1) {						
					
						var xinzengListHtml = '<li class="mui-table-view-divider" style="font-size:15px;">本月充值：' + data.data.month_in + '元</li>';
						if(data.data.have_int_list!=''){
							mui.each(data.data.add_int_list,function(index,item){
								xinzengListHtml += '<li class="mui-table-view-cell"><i class="mui-icon mui-icon-plusempty"></i>充值：<span class="text-danger">' + item.add_int_num + '</span><span class="mui-badge mui-badge-inverted">' + item.add_time +'</span></li>'
							})
						}						
						document.getElementById('ben-yue-chong-zhi-list').innerHTML = xinzengListHtml; 
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