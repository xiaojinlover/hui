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
		mui.init({
			swipeBack: true //启用右滑关闭功能

		});
		//		jing_li_id:jing_li_id,
		//						jing_li_name:jing_li_name,
		//						zhi_wei:zhi_wei,
		//						start_time:start_time,
		//						end_time:end_time,
		//						miao_shu:miao_shu
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			var jing_li_id = self.jing_li_id;
			var jing_li_name = self.jing_li_name;
			var zhi_wei = self.zhi_wei;
			var start_time = self.start_time;
			var end_time = self.end_time;
			var miao_shu = self.miao_shu;
			
			var job_reterence_name = self.job_reterence_name;
			var job_reterence_telephone = self.job_reterence_telephone;
			document.getElementsByTagName('form')[0].jing_li_name.value = jing_li_name;
			document.getElementsByTagName('form')[0].zhi_wei.value = zhi_wei;
			document.getElementsByTagName('form')[0].start_time.value = start_time;
			document.getElementsByTagName('form')[0].end_time.value = end_time;
			document.getElementsByTagName('form')[0].miao_shu.value = miao_shu;
			
			document.getElementsByTagName('form')[0].job_reterence_name.value = job_reterence_name;
			document.getElementsByTagName('form')[0].job_reterence_telephone.value = job_reterence_telephone;

			if(jing_li_id) {
				document.getElementById('delete-content').innerHTML = '<div class="mui-content-padded" ><a class="mui-btn mui-btn-danger mui-btn-block" id="btn-delete" data-id="' + jing_li_id + '"><i class="mui-icon mui-icon-trash"></i>删除</a></div>'
				//删除
				mui(document).on('tap', '#btn-delete', function() {
					
					var deleteGongZuoJingliData = {
						"token": plus.storage.getItem('token'),
						"job_exp_id": jing_li_id
					}
//					console.log(JSON.stringify(deleteGongZuoJingliData))
					mui.ajax(apiUrl + 'app/delete_job_exp', {
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

			//提交保存
			mui(document).on('tap', '#update-gong-zuo-jing-li', function() {
				if(document.getElementsByTagName('form')[0].jing_li_name.value == "" || document.getElementsByTagName('form')[0].zhi_wei.value == '') {
					mui.alert('请完善您的信息！');
					return false;
				}
				var updateGongZuoJingliData = {
					"token": plus.storage.getItem('token'),
					"jing_li_id": jing_li_id != null ? jing_li_id : '',
					"zhi_wei": document.getElementsByTagName('form')[0].zhi_wei.value,
					"jing_li_name": document.getElementsByTagName('form')[0].jing_li_name.value,
					"start_time": document.getElementsByTagName('form')[0].start_time.value,
					"end_time": document.getElementsByTagName('form')[0].end_time.value,
					"miao_shu": document.getElementsByTagName('form')[0].miao_shu.value,
					"job_reterence_name": document.getElementsByTagName('form')[0].job_reterence_name.value,
					"job_reterence_telephone": document.getElementsByTagName('form')[0].job_reterence_telephone.value
				}

				mui.ajax(apiUrl + 'app/update_job_exp', {
					data: updateGongZuoJingliData,
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
		})