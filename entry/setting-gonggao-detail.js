mui.init({
			swipeBack: true //启用右滑关闭功能  

		});
		mui.plusReady(function() {
			var noticeId = plus.webview.currentWebview().noticeId;
			var gonggaoDetailData = {
					"token": plus.storage.getItem('token'),
					"notice_id": noticeId
				}
			
			mui.ajax(apiUrl +  'employee/notice', {
					data: gonggaoDetailData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						
						var data = JSON.parse(data);
						if(data.status == 1 && data.data!='') {
							document.getElementById('title').innerHTML = data.data.title;
							document.getElementById('detail-content').innerHTML = html_decode(data.data.content);
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
		})