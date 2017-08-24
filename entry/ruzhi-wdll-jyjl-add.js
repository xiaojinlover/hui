mui.init({
			swipeBack: true //启用右滑关闭功能

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
			var jingLiId = self.jingLiId;
			if(jingLiId != '') {
				document.getElementsByTagName('form')[0].jing_li_name.value = self.jingLiName;
				document.getElementsByTagName('form')[0].major.value = self.major;
				//				document.getElementsByTagName('form')[0].degree.value = self.degree;
				document.getElementsByTagName('form')[0].start_time.value = self.startTime;
				document.getElementsByTagName('form')[0].end_time.value = self.endTime;

			}

			if(jingLiId) {
				document.getElementById('delete-content').innerHTML = '<div class="mui-content-padded" ><a class="mui-btn mui-btn-danger mui-btn-block" id="btn-delete" data-id="' + jingLiId + '"><i class="mui-icon mui-icon-trash"></i>删除</a></div>'
				//删除
				mui(document).on('tap', '#btn-delete', function() {

					var deleteGongZuoJingliData = {
						"token": plus.storage.getItem('token'),
						"jing_li_id": jingLiId
					}
					//					console.log(JSON.stringify(deleteGongZuoJingliData))
					mui.ajax(apiUrl + 'app/delete_education_exp ', {
						data: deleteGongZuoJingliData,
						type: 'post',
						timeout: 10000,
						success: function(data) {
							var data = JSON.parse(data);
							if(data.status == 1) {
								var preWebview = plus.webview.getWebviewById('ruzhi-wdll-gzjl');
								preWebview.reload();
								mui.alert(data.detail);
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

			//获取教育经历
			if(plus.storage.getItem('edu') == null) {
				var getEduData = {
					"token": plus.storage.getItem('token')
				}
				mui.ajax(apiUrl + 'app/get_edu_basic', {
					data: getEduData,
					type: 'post',
					timeout: 10000,
					success: function(data) {

						var data = JSON.parse(data);
						if(data.status == 1) {

							var edu = data.data;
							plus.storage.setItem('edu', JSON.stringify(edu));
							var xueLiHtml = '<option value="0">请选择</option>';
							mui.each(JSON.parse(plus.storage.getItem('edu')), function(index, item) {
								if(item.id == self.degree) {
									xueLiHtml += '<option value="' + item.id + '" selected>' + item.name + '</option>';
								} else {
									xueLiHtml += '<option value="' + item.id + '">' + item.name + '</option>';
								}
							})
							document.getElementById('degree').innerHTML = xueLiHtml;
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
			} else {
				var xueLiHtml = '<option value="0">请选择</option>';
				mui.each(JSON.parse(plus.storage.getItem('edu')), function(index, item) {
					if(item.id == self.degree) {
						xueLiHtml += '<option value="' + item.id + '" selected>' + item.name + '</option>';
					} else {
						xueLiHtml += '<option value="' + item.id + '">' + item.name + '</option>';
					}
				})
				document.getElementById('degree').innerHTML = xueLiHtml;
			}

			//提交保存
			//			alert(document.getElementsByTagName('form')[0].degree.value) 
			mui(document).on('tap', '#update-jiao-yu-jing-li', function() {
				if(document.getElementsByTagName('form')[0].major.value == "" || document.getElementsByTagName('form')[0].jing_li_name.value == '') {
					mui.alert('请完善您的信息！');
					return false;
				}
				var updateJiaoyuJingliData = {
					"token": plus.storage.getItem('token'),
					"jing_li_id": jingLiId,
					"degree": document.getElementsByTagName('form')[0].degree.value,
					"jing_li_name": document.getElementsByTagName('form')[0].jing_li_name.value,
					"start_time": document.getElementsByTagName('form')[0].start_time.value,
					"end_time": document.getElementsByTagName('form')[0].end_time.value,
					"major": document.getElementsByTagName('form')[0].major.value
				}

				mui.ajax(apiUrl + 'app/change_education_exp', {
					data: updateJiaoyuJingliData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						if(data.status == 1) {
							var preWebview = plus.webview.currentWebview().opener();
							preWebview.reload();
							mui.alert(data.detail);
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