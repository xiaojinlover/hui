mui.init({
			swipeBack: true
		});
		
		mui.plusReady(function() { 
			
			//跳转注册
//			document.getElementById('btn-register').addEventListener('tap', function() {
			mui(document).on('tap','#btn-register', function() {
				mui.openWindow({
					url: 'register.html',
					id: 'resetpsw',
					createNew: true,
					show: {
						autoShow: true,
						aniShow: 'slide-in-bottom',
						duration: 200
					},
					waiting: {
						autoShow: false
					}
				});
			});
			//跳转企业注册
//			document.getElementById('btn-qiye-register1').addEventListener('tap', function() {
			mui(document).on('tap','#btn-qiye-register1', function() {
				mui.openWindow({
					url: 'qiye-zhuce-step01.html',
					id: 'qiye-zhuce-step01',
					createNew: true,
					show: {
						autoShow: true,
						aniShow: 'slide-in-right',
						duration: 200
					},
					waiting: {
						autoShow: false
					}
				});
				return false;
			});

			//跳转找回密码
//			document.getElementById('btn-findpsw').addEventListener('tap', function() {
			mui(document).on('tap','#btn-findpsw', function() {
				mui.openWindow({
					url: 'findpsw.html',
					id: 'resetpsw',
					createNew: true,
					show: {
						autoShow: true,
						aniShow: 'slide-in-right',
						duration: 200
					},
					waiting: {
						autoShow: false
					}
				});
			});
			
			//登录
//			document.getElementById('btn-login').addEventListener('tap', function() {
	
			mui(document).on('tap','#btn-login', function() {
				var form = document.getElementsByTagName('form')[0];	
				var if_company = $('input[type="radio"]:checked').val();
				//关闭焦点（失去键盘）
				document.activeElement.blur();
				var loginData = {
						"user_name": form.username.value,
						"password": form.password.value,
						"if_company":if_company
					}
					//验证表单
				if(!form.username.value) {
					mui.alert('请输入您的账号！');
					return false;
				} else if(!form.password.value) {
					mui.alert("请输入您的密码！");
					return false;
				}
				//提交数据
				var telephone = form.username.value;
//				var password = document.getElementById("password");
				mui.ajax(apiUrl +  'login/login', {
					
					data: loginData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						console.log(data)
						var data = JSON.parse(data);
						
						if(data.status == 1) {
							plus.storage.setItem("companyname", data.data.company_name);
							plus.storage.setItem("username", telephone);
							plus.storage.setItem("password", data.data.password);
							plus.storage.setItem("token", data.token);
							plus.storage.setItem("role", data.data.role);
							plus.storage.setItem("zhi_wei", data.data.zhi_wei);
							plus.storage.setItem("real_name", data.data.real_name);
							plus.storage.setItem('if_white',data.data.if_white);
							plus.storage.setItem('telephone_key',data.data.telephone_key);
							plus.storage.setItem('if_company',data.data.if_company)
							//会员头像
							plus.storage.setItem("users_image", data.data.users_image != null ? data.data.users_image : 'images/test-head.png');
							
							if(data.data.if_company == 1) {
								mui.openWindow({
									url: 'index-boss.html',
									id: 'index-boss',
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
							} else {								
								mui.openWindow({
									url: 'index.html',
									id: 'index',
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
								
							}

						} else {
							mui.alert(data.detail);
						}

					},
					beforeSend: function() {
						plus.nativeUI.showWaiting("数据提交中...");
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

		})