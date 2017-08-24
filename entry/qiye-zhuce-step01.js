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
						"verify_token":hex_md5('m_a_i$' + (form.username.value) + '$z_h_i'),
						"if_company":1
					}
					//ajax提交获取验证码
				mui.ajax(apiUrl + 'login/get_verify_2', {
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

			//下一步
			document.getElementById('btn-next-step').addEventListener('tap', function(e) {
				if(!form.username.value) {
					mui.alert("请输入您的手机");
					return false;
				} else if(!form.code01.value) {
					mui.alert("请输入您的验证码");
					return false;
				}
				//检验验证码
				if(form.code01.value) {
					var checkData = {
						"telephone": form.username.value,
						"verify": form.code01.value
					};
					mui.ajax(apiUrl + 'login/check_verify', {
						data: checkData,
						type: 'post',
						timeout: 10000,
						success: function(data) {
							var data = JSON.parse(data);
							if(data.status == 0) {
								mui.alert('参数错误，请检查您的手机号与验证码！');
								return false;
							} else if(data.status == 1) {								
								mui.openWindow({
									url: 'qiye-zhuce-step02.html',
									id: 'qiye-zhuce-step02',
									createNew: true,
									show: {
										autoShow: true,
										aniShow: 'slide-in-right',
										duration: 200
									},
									extras: {
										username: form.username.value,
										code01 : form.code01.value
									},
									waiting: {
										autoShow: false
									}
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
				}

			});

		})