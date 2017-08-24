mui.init({
			swipeBack: true //启用右滑关闭功能  
		});
		mui.plusReady(function() {
			//获取公司
			var getInfo = {
				"token": plus.storage.getItem('token')
			}
			mui.ajax(apiUrl +  'app/get_company_list', {
				data: getInfo,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					
					var data = JSON.parse(data);
					if(data.data != '') {
						var company = data.data;
						
						$("#nope").trigger("onkeyup");
						$('#nope').autocompleter({
							highlightMatches: true,
							source: company,
							template: '{{ label }} ',             
							hint: true,
							matchContains: true,
							empty: false,
							limit: 5,
							callback: function(value, index, selected) {
								if(selected) {
									$('.icon').css('background-color', selected.hex);
									$("#cmp_id").val(selected.company_id);
								}
							}
						});

						$('input').bind('input propertychange', function() {
							$('input').trigger('keyup');
						});
					} else {
						mui.alert(data.detail)
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

			//入职申请
			mui(document).on('tap', '#li-ji-ru-zhi', function() {
				
				var company_id = document.getElementsByTagName('form')[0].company_id.value;
				var ruzhiData = {
					"token": plus.storage.getItem('token'),
					"company_id": company_id
				}
				
				mui.ajax(apiUrl +  'app/join_company', {
					data: ruzhiData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						
						var data = JSON.parse(data);
						if(data.status == 1) {
							plus.storage.setItem('role','1');
							document.activeElement.blur();
//							document.getElementById('nope').blur();
							
							mui.openWindow({
								url: 'ruzhi-wdll-zwpj.html',
								id: 'ruzhi-wdll-zwpj',
								createNew: true,
								show: {
									autoShow: true,
									aniShow: 'slide-in-right',
								},
								waiting: {
									autoShow: true,
									title: '玩命加载中...'
								},
							})
							
//							mui.alert('亲，请认真完善您的个人资料，入职之后不能修改哦！');
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