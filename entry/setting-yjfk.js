mui.init();
			mui.plusReady(function() {
				
				mui(document).on('tap', '#submit', function() {
					
					var form = document.forms[0];
					
					if(form.content.value == ''){
						mui.toast('请输入您的问题和意见！');
						return false;
					}
					var yijianData = {
						"token":plus.storage.getItem('token'),
						"contact":form.contact.value,
						"content":form.content.value
					}
					mui.ajax(apiUrl + 'Employee/feedback', {
						data: yijianData,
						type: 'post',
						timeout: 10000,
						success: function(data) {
							var data = JSON.parse(data);
							if(data.status != 0) {
								mui.alert(data.detail);
							}
						},
						beforeSend: function() {
							plus.nativeUI.showWaiting("玩命加载中...", {
								background: "rgba(0,0,0,0.4)"
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
			})