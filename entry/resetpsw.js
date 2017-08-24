mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {

			var form = document.forms[0];
			var self = plus.webview.currentWebview();
			var username = self.username;
			var code01 = self.code01;
			//提交修改密码
			
			document.getElementById('btn-update-psw').addEventListener('tap', function(e) {
				var updateData = {
					"telephone": username,
					"password": form.password.value,
					"verify": code01,
					"if_company":plus.webview.currentWebview().if_company
				}
				
				mui.ajax(apiUrl +  'login/forget_passwd', {

					data: updateData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						if(data.status == 0) {
							mui.alert(data.detail);
							return false;
						} else if(data.status == 1) {
							mui.alert('密码修改成功,确认传送至登录页面^_^', function() {
								mui.openWindow({
									url: 'login.html',
									id: 'login' ,
									createNew: true,
									show: {
										autoShow: true,
										aniShow: 'slider-in-right',
										duration: 200
									},
									waiting: {
										autoShow: false
									}
								})

							});
						}
					},
					beforeSend: function() {
						plus.nativeUI.showWaiting("数据提交中...");
					},
					complete: function() {
						plus.nativeUI.closeWaiting();
					},
					error: function(xhr, typeinfo) {
						mui.alert(typeinfo);
					}
				});
			})
		})