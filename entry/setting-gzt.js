mui.init({
			swipeBack: true //启用右滑关闭功能  

		});
		mui.plusReady(function() {
			//密码验证
			mui(document).on('tap', '.btn-check-psw', function() {
				document.getElementsByTagName('form')[0].password.blur;
				var password = document.getElementsByTagName('form')[0].password.value;
				if(!password){
					mui.alert('请输入您的查询密码！');
					return false;
				}
				var checkPswData = {
					"token": plus.storage.getItem('token'),
					"password": password
				}

				mui.ajax(apiUrl +  'wage/check_password', {
					data: checkPswData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						if(data.status == 1) {
							document.getElementsByTagName('form')[0].reset();
							document.activeElement.blur(); 
							mui.openWindow({
								url: 'setting-gzt-list.html',
								id: 'setting-gzt-list',
								createNew: true,
								show: {
									autoShow: true,
									aniShow: "slide-in-right"
								},
								waiting: {
									autoShow: false,
									title: '玩命加载中...'
								},

							})
						} else {
							mui.alert(data.detail);
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
		})