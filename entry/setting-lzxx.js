mui.init({
			swipeBack: true //启用右滑关闭功能

		});
		mui.plusReady(function() {
			document.getElementById('gong-si-min-cheng').value = plus.storage.getItem('companyname')
				//日历
			mui('form').on('tap', '#date', function() {
				var options = {
					'type': 'date',
					'beginDate': new Date(1900, 01, 01)
				}
				var picker = new mui.DtPicker(options);
				var _this = this;
				picker.show(function(e) {
					_this.value = e.text;
					this.value = e.text;
					picker.dispose();
				})
			});
			//离职提交
			mui(document).on('tap', '#update-lizhi', function() {
				if(document.getElementsByTagName('form')[0].li_zhi_ri_qi.value == '') {
					mui.alert('请填写您的离职日期！');
					return false;
				}
				var lizhiData = {
					"token":plus.storage.getItem('token'),
					"li_zhi_ri_qi":document.getElementsByTagName('form')[0].li_zhi_ri_qi.value,
					"li_zhi_yuan_yin":document.getElementsByTagName('form')[0].li_zhi_yuan_yin.value
				}
				mui.ajax(apiUrl +  'employee/quit_company', {
					data: lizhiData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						if(data.status == 1) {
							mui.alert(data.detail,function(){
								plus.webview.currentWebview().opener().reload();
							});
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