mui.init({
			swipeBack: true //启用右滑关闭功能

		});
		
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			var usersFamilyId = self.usersFamilyId;
			var name = self.name;
			var relation = self.relation;
			var birthmonth = self.birthmonth;
			var work_organize = self.work_organize;
			var telephone = self.telephone;
			
			
			document.getElementsByTagName('form')[0].name.value = name;
			document.getElementsByTagName('form')[0].relation.value = relation;
			document.getElementsByTagName('form')[0].birthmonth.value = birthmonth;
			document.getElementsByTagName('form')[0].work_organize.value = work_organize;
			document.getElementsByTagName('form')[0].telephone.value = telephone;

			if(usersFamilyId) {
				document.getElementById('delete-content').innerHTML = '<div class="mui-content-padded" ><a class="mui-btn mui-btn-danger mui-btn-block" id="btn-delete" users_family_id="' + usersFamilyId + '"><i class="mui-icon mui-icon-trash"></i>删除</a></div>'
				//删除
				mui(document).on('tap', '#btn-delete', function() {
					
					var deleteJiatingBeijingData = {
						"token": plus.storage.getItem('token'),
						"users_family_id": usersFamilyId
					}
					mui.ajax(apiUrl + 'App/delete_users_family', {
						data: deleteJiatingBeijingData,
						type: 'post',
						timeout: 10000,
						success: function(data) {
							var data = JSON.parse(data);
							if(data.status == 1) {
								mui.alert(data.detail,function(){
									plus.webview.currentWebview().opener().reload();
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
			}

			//提交保存
			mui(document).on('tap', '#update-jiao-yu-jing-li', function() {
				if(document.getElementsByTagName('form')[0].name.value == "" || document.getElementsByTagName('form')[0].relation.value == '') {
					mui.alert('请完善您的信息！');
					return false;
				}
				var updateGongZuoJingliData = {
					token: plus.storage.getItem("token"),
					users_family_id: usersFamilyId,
					name: document.forms[0].name.value,
					relation: document.forms[0].relation.value,
					birthmonth: document.forms[0].birthmonth.value,
					work_organize: document.forms[0].work_organize.value,
					telephone: document.forms[0].telephone.value
				}

				mui.ajax(apiUrl + 'app/update_users_family', {
					data: updateGongZuoJingliData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						if(data.status == 1) {
							mui.alert(data.detail,function(){
								plus.webview.currentWebview().opener().reload();
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