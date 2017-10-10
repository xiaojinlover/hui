mui.init({
			swipeBack: true //启用右滑关闭功能

		});
		mui.plusReady(function() {
			//获取验证码
			mui(document).on('tap','#code',function(){
				var codeData = {
					token: plus.storage.getItem("token")
				}
				mui.ajax(apiUrl +  '/Usersint/get_pay_password_verify', {
					data: codeData,
					type: 'post',
					timeout: 10000,
					success: function(data) {                        
						var data = JSON.parse(data);
						if(data.status == 0) {
							mui.alert(data.detail);
							return false;
						} else {
							//计时器函数
							var countdown = 60;
							var obj = document.getElementById("code");

							function settime(obj) {
								if(countdown == 0) {
									obj.removeAttribute("disabled");
									obj.innerHTML = "重新获取验证码";
									countdown = 60;
									return;
								} else {
									obj.setAttribute("disabled", true);
									obj.innerHTML = "重新发送(" + countdown + ")";
									countdown--;
								}
								setTimeout(function() {
									settime(obj)
								}, 1000)
							}
							//计时器函数结束
							settime(obj);
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
			//设置密码
			mui(document).on('tap', '#btn-update-psw', function() {				
				var verify = document.forms[0].code01.value;
				var new_password = document.forms[0].new_password.value;
				var new_password1 = document.forms[0].new_password1.value;
				if(new_password == '' || new_password1 == ''|| verify == '') {
					mui.alert('请完善您的信息');
					return false;
				}
				if(new_password != new_password1) {
					mui.alert('两次输入密码不一致');
					return false;
				}
				var setPasswordData = {
					"token": plus.storage.getItem('token'),						
					"pay_password": new_password,
					"verify":verify
				}
				mui.ajax(apiUrl + 'Usersint/set_pay_password_with_verify', {
					data: setPasswordData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						if(data.status == 1) {
							mui.alert(data.detail, function() {
								document.forms[0].reset();
							});
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
						if(typeinfo=='abort'){
							mui.alert('连接不到网络，请检查您当前的网络设置');
						}else{
							mui.alert('参数错误' + typeinfo);
						}
					}
				});
				 
			})

		})