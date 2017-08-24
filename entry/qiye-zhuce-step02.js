mui.init({
			swipeBack: true //启用右滑关闭功能		
		});
					
		mui.plusReady(function() {
			var form = document.forms[0];
			var telephone = plus.webview.currentWebview().username;
			var verify = plus.webview.currentWebview().code01;
			//获取验证码后提交数据注册
			document.getElementById("btn-register").addEventListener('tap', function() {
				
//				//表单验证
				if(!form.company_name.value) {
					mui.alert("请输入公司全称");
					return false;
				} else if(!telephone||!verify) {
					mui.alert("参数错误，请返回上一步重新获取验证码");
					return false;
				} else if(!form.real_name.value) {
					mui.alert("请输入申请人姓名");
					return false;
				} else if(!form.zhi_wei.value) {
					mui.alert("请输入您的职位");
					return false;
				} else if(!form.password.value) {
					mui.alert("请设置您的密码");
					return false;
				}else if(!form.confirm_password.value){
					mui.alert("请设置您的确认密码");
					return false;
				}else if(form.password.value!=form.confirm_password.value){
					mui.alert("密码与确认密码不相同")
				}
				var registerData = {
					"real_name": form.real_name.value,
					"register_zhi_wei": form.zhi_wei.value,
					"telephone": telephone,
					"password": form.password.value,
					"verify": verify,
					"company_name":form.company_name.value,
					"if_company":1,
					"invite_telephone": form.invite_telephone.value
				}
				
				mui.ajax(apiUrl + 'login/register', {
					data: registerData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						if(data.status == 1){
							mui.alert(data.detail,function(){
								mui.openWindow({
									url: 'qiye-zhuce-step03.html',
									id: 'qiye-zhuce-step03',
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
						}else{
							mui.alert(data.detail);
							return false;
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