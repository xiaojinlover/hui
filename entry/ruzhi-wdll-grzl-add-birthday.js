mui.init({
			swipeBack: true, 
		});
		mui.plusReady(function() {
			
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
			
			
			var self = plus.webview.currentWebview();
			var dataId = self.dataId;
			var dataValue = self.dataValue;
			var dataTitle = self.dataTitle;
						
			document.getElementById('title').innerHTML = dataTitle;
			document.getElementsByTagName('form')[0].dataValue.value = dataValue;
			//提交数据
			document.getElementById('update-info').addEventListener('tap',function(){
				var infoValue = document.getElementsByTagName('form')[0].dataValue.value;
				var updateInfoData = '{"token":"' + plus.storage.getItem("token") + '","' + dataId +'":"' + infoValue + '"}';
				
				updateInfoData = JSON.parse(updateInfoData);
				
				mui.ajax(apiUrl +  'app/update_user_info', {
					data: updateInfoData,
					type: 'post',
					timeout: 10000,
					success: function(data) {						
						var data = JSON.parse(data);
						if(data.status == 1) {
							
							document.getElementsByTagName('form')[0].dataValue.blur();
							var preWebview = plus.webview.currentWebview().opener();
							mui.toast(data.detail);
							preWebview.reload();
							return false;	
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