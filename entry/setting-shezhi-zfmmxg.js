mui.init({
			swipeBack: true //启用右滑关闭功能

		});
		mui.plusReady(function() {

			//检查是否设置支付密码
			var getInfoData = {
				"token": plus.storage.getItem('token')
			}
			mui.ajax(apiUrl + 'Usersint/check_pay_password', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					if(data.status == 1 && data.data.if_set == 0) {
						document.getElementById('is-set').innerHTML = '登录密码';
						document.getElementById('title').innerHTML = '设置支付密码';
//						document.getElementById('tishi-info').setAttribute('class', 'mui-content-padded');
					}
					plus.storage.setItem('if-set-psw', data.data.if_set.toString());
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

			//设置密码
			mui(document).on('tap', '#btn-update-psw', function() {
				if(plus.storage.getItem('if-set-psw') == 0) {
					var old_password = document.forms[0].old_password.value;
					var new_password = document.forms[0].new_password.value;
					var new_password1 = document.forms[0].new_password1.value;

					if(old_password == '' || new_password == '' || new_password1 == '') {
						mui.alert('请完善您的信息');
						return false;
					}
					if(new_password != new_password1) {
						mui.alert('两次输入密码不一致');
						return false;
					}
					var setPasswordData = {
						"token": plus.storage.getItem('token'),
						"password": old_password,
						"pay_password": new_password
					}
					mui.ajax(apiUrl + 'Usersint/set_pay_password', {
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
				} else {
					var old_password = document.forms[0].old_password.value;
					var new_password = document.forms[0].new_password.value;
					var new_password1 = document.forms[0].new_password1.value;

					if(old_password == '' || new_password == '' || new_password1 == '') {
						mui.alert('请完善您的信息');
						return false;
					}
					if(new_password != new_password1) {
						mui.alert('两次输入密码不一致');
						return false;
					}
					var setPasswordData = {
						"token": plus.storage.getItem('token'),
						"old_pay_password": old_password,
						"new_pay_password": new_password
					}
					mui.ajax(apiUrl + 'Usersint/update_pay_password', {
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
							mui.alert("参数错误：" + typeinfo);
						}
					});
				}
			})

		})