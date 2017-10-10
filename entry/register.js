mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {
			var form = document.forms[0];

			//获取手机验证码
			document.getElementById("code").addEventListener('tap', function() {

				if(!form.username.value) {
					mui.alert("请输入手机号");
					return false;
				}
				var codeData = {
						"telephone": form.username.value,
						"type": 0,	
						"verify_token": hex_md5("m_a_i$" + document.forms[0].username.value + "$z_h_i")
					}
					//ajax提交获取验证码
				mui.ajax(apiUrl +  'login/get_verify_2', {
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

			//获取验证码后提交数据注册
			document.getElementById("btn-register").addEventListener('tap', function() {
				//表单验证
				if(!form.realname.value) {
					mui.alert("请填写您的真实姓名");
					return false;
				} else if(!form.username.value) {
					mui.alert("请填写您的手机号");
					return false;
				} else if(!form.code01.value) {
					mui.alert("请填写验证码");
					return false;
				} else if(!form.password.value) {
					mui.alert("请设置您的密码");
					return false;
				}
				var registerData = {
					"real_name": form.realname.value,
					"telephone": form.username.value,
					"password": form.password.value,
					"verify": form.code01.value
				}
				mui.ajax(apiUrl +  'login/register', {
					data: registerData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						if(data.status == 1) {
							mui.alert(data.detail + "，点击确定传送至登录页面^_^",function(){
								mui.back();
							});
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
						mui.alert(typeinfo);
					}
				});
			})

		})