mui.init({
			swipeBack: true //启用右滑关闭功能  

		});
		mui.plusReady(function() {
				var gonggaoData = {
					"token": plus.storage.getItem('token'),
					"notice_type":2,
					"notice_id": "#"
				}
				mui.ajax(apiUrl +  'employee/notice', {
					
					data: gonggaoData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						console.log(data)
						var data = JSON.parse(data);
						if(data.status == 1 && data.data!='') {
							var gonggaoListHtml = ''
							mui.each(data.data,function(index,item){
							
//								gonggaoListHtml += '<li class="mui-table-view-cell" style="height:50px;line-height:30px;"><a doc-url="' + item.doc_url + '" href="setting-gzzd-detail" data-id="' + item.id + '" class="mui-navigate-right"><i class="icon iconfont icon-iconfonticon text-999"></i>  ' + item.title   + '</a></li>';
								
								gonggaoListHtml += '<li class="mui-table-view-cell mui-media"><a doc-url="' + item.doc_url + '" href="setting-gzzd-detail" data-id="' + item.id + '" class="mui-navigate-right"><div class="mui-media-body"><i class="icon iconfont icon-iconfonticon text-999"></i>  ' + item.title   + '<p class="mui-ellipsis">' + item.add_time + '</p></div></a></li>'
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
					
					var docUrl = this.getAttribute('doc-url');
					plus.nativeUI.showWaiting("文件加载中...");
					var dtask = plus.downloader.createDownload( docUrl, {}, function ( d, status ) {						
						if ( status == 200 ) { 
							plus.nativeUI.closeWaiting();
							plus.runtime.openFile(d.filename)
						} else {					
							plus.nativeUI.closeWaiting();
							mui.alert( "文件下载失败: " + status ); 
						}  
					});
					if(dtask!=null)
						dtask.start(); 
				})				
			})