mui.init({
			swipeBack: true //启用右滑关闭功能

		});
		mui.plusReady(function() {
			mui(document).on('tap','#btn-update-psw',function(){
				var old_password = document.getElementsByTagName('form')[0].old_password.value;
				var new_password1 = document.getElementsByTagName('form')[0].new_password1.value;
				var new_password = document.getElementsByTagName('form')[0].new_password.value;
				if(old_password==''||new_password1==''||new_password==''){
					mui.alert('请完善您的密码信息');
					return false;
				}
				if(new_password1!=new_password){
					mui.alert('二次输入的新密码不相等');
					return false;
				}
				var updatePswData = {
					"token":plus.storage.getItem('token'),
					"new_password":new_password,
					"old_password":old_password
				}
				mui.ajax(apiUrl +  'app/update_password', {
					data: updatePswData,
					type: 'post',
					timeout: 10000,
					success: function(data) {						
						var data = JSON.parse(data);
						if(data.status == 1) {
							mui.alert(data.detail);
							
						}else{
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