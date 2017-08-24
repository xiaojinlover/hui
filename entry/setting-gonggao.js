mui.init({
			swipeBack: true //启用右滑关闭功能  

		});
		mui.plusReady(function() {
				var gonggaoData = {
					"token": plus.storage.getItem('token'),
					"notice_type":1,
					"notice_id": "#"
				}
				
				mui.ajax(apiUrl + 'employee/notice_new', {
					data: gonggaoData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						
						var data = JSON.parse(data);
						if(data.status == 1 && data.data!='') {
							var gonggaoListHtml = ''
							mui.each(data.data,function(index,item){								
//								gonggaoListHtml += '<li class="mui-table-view-cell"><a href="setting-gonggao-detail" data-id="' + item.id + '" class="mui-navigate-right"><div class="mui-media-body"><i class="icon iconfont icon-gonggao text-999"></i> ' + item.title + '<span style="margin-right:15px;margin-top:6px;color:#bbb" class="mui-badge mui-badge-inverted mui-pull-right">' + item.add_time + '</span></div></a></li>';
								gonggaoListHtml += '<li class="mui-table-view-cell mui-media"><a class="mui-navigate-right" data-id="' + item.id + '" href="setting-gonggao-detail"><div class="mui-media-body"><i class="icon iconfont icon-gonggao text-999"></i> ' + item.title + '<p class="mui-ellipsis">' + item.add_time + '</p></div></a></li>'
							
							})
							document.getElementById('gonggao-list').innerHTML = gonggaoListHtml;
						} 
					},
					beforeSend: function() {
						plus.nativeUI.showWaiting("玩命加载中...");
					},
					complete: function() {
						plus.nativeUI.closeWaiting();
					},
					error: function(xhr, typeinfo) {
						mui.alert("参数错误：" + typeinfo);
					}
				});
				
				//公告详情跳转
				
				mui(document).on('tap', 'a', function() {
					
					var noticeId = this.getAttribute('data-id');
					var href = this.getAttribute('href');
					mui.openWindow({
						url: href + '.html',
						id: href,
						createNew: true,
						show: {
							autoShow: true,
							aniShow: "slide-in-right"
						},
						extras:{
							noticeId:noticeId
						},
						waiting: {
							autoShow: false,
							title: '玩命加载中...'
						}	
					})
				})				
			})