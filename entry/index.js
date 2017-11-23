mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				down: {
					callback: pulldownRefresh,
					auto: true
				}
			}
		});

		var getInfo = function getInfo() {} //全局

		//下拉刷新
		function pulldownRefresh() {
			setTimeout(function() {
				var data1 = new getInfo();
				data1.getData();
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
			}, 800);
		}

		mui.plusReady(function() {
			
			
			if(plus.storage.getItem('token') != null) {
				var login = plus.webview.getWebviewById('login');
				if(login != null)
					login.close();
			}

			//获取首页数 据(全局)
			getInfo.prototype.getData = function() {

				//未入职
				if(plus.storage.getItem('role') == "0") {
					document.getElementById('index-header-info').removeAttribute('class');
					document.getElementById('li-ji-ru-zhi').setAttribute('class', 'mui-btn mui-btn-outlined');
				} else {
					document.getElementById('index-header-info').setAttribute('class', 'mui-navigate-right');
					document.getElementById('li-ji-ru-zhi').setAttribute('class', 'mui-btn mui-btn-outlined mui-hidden');

				}

				document.getElementById('gerenInfo').innerHTML = (plus.storage.getItem("real_name") != null ? plus.storage.getItem("real_name") : "暂无") + '<p class="mui-ellipsis" id="zhi-wei">' + (plus.storage.getItem("zhi_wei") != null ? plus.storage.getItem("zhi_wei") : "暂无") + '</p>';

				//公司名称
				document.getElementById('title').innerHTML = (plus.storage.getItem("companyname") != "" ? plus.storage.getItem("companyname") : "未入职");

				//用户头像
				document.getElementById('users-head').setAttribute('src', plus.storage.getItem('users_image'));

				var getInfoData = {
					"token": plus.storage.getItem("token")
				}

				mui.ajax(apiUrl + 'employee/index', {

					data: getInfoData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						plus.storage.setItem('ruzhi-status', data.detail);
						if(data.detail == '离职') {
							document.getElementById('kuaishebao').setAttribute('class', 'mui-table-view-cell mui-media mui-col-xs-4');
						}
						if(data.detail == '离职' || data.detail == '待入职') {
							document.getElementById('gong-gao').setAttribute('class', 'mui-table-view-cell mui-media mui-col-xs-4 mui-hidden');
							document.getElementById('zhi-du').setAttribute('class', 'mui-table-view-cell mui-media mui-col-xs-4 mui-hidden');
						} else {
							document.getElementById('gong-gao').setAttribute('class', 'mui-table-view-cell mui-media mui-col-xs-4');
							document.getElementById('zhi-du').setAttribute('class', 'mui-table-view-cell mui-media mui-col-xs-4');
						}
						//是否代发
						if(data.data.if_daifa == 1) {
							document.getElementById('dai-fa').className = 'mui-table-view mui-grid-view mui-grid-9 score-wrap';
						}
						//入职状态 
						if(data.detail == "离职") {
							document.getElementById('index-header-info').removeAttribute('class');
							//							document.getElementById('li-ji-ru-zhi').setAttribute('href', 'ruzhi-wdll-grzl');
							document.getElementById('li-ji-ru-zhi').setAttribute('class', 'mui-btn mui-btn-outlined');
							document.getElementById('li-ji-ru-zhi').innerHTML = '立即入职';
						} else if(data.detail == "待入职") {

							document.getElementById('index-header-info').removeAttribute('class');
							document.getElementById('li-ji-ru-zhi').setAttribute('class', 'mui-btn mui-btn-outlined');
							document.getElementById('li-ji-ru-zhi').setAttribute('href', 'ruzhi-wdll-grzl');
							document.getElementById('li-ji-ru-zhi').innerHTML = '入职审核中';
						} else {
							plus.storage.setItem('ruzhi-status', '');
						}

						if(data.status == 1 && data.data != '') {

							plus.storage.setItem('companyname', data.data.company_name);
							plus.storage.setItem('zhi_wei', data.data.zhi_wei);
							plus.storage.setItem("real_name", data.data.real_name);
							plus.storage.setItem('serviceHotline', data.data.service_hotline)
							//会员头像
							plus.storage.setItem("users_image", data.data.users_image != null ? data.data.users_image : 'images/test-head.png');
							document.getElementById('users-head').setAttribute('src', plus.storage.getItem('users_image'));

							plus.storage.setItem('telephone_key', data.data.telephone_key);

							//缓存登录第三方登录注册信息

							if(data.data.platform) {
								plus.storage.setItem('platform', JSON.stringify(data.data.platform));
								plus.storage.setItem('if_reg', data.data.platform[0].if_reg.toString());
								plus.storage.setItem('user_key', data.data.platform[0].user_key);
							}

							//用户福利券		
							if(data.data.wage_int != null) {
								document.getElementById('xian-jin-gong-zi').innerHTML = data.data.wage_int.have_int_num != null ? data.data.wage_int.have_int_num : '0';
								document.getElementById('zeng-song-ji-fen').innerHTML = data.data.wage_int.already_int != null ? data.data.wage_int.already_int : '0';
								document.getElementById('dai-zeng-ji-fen').innerHTML = data.data.wage_int.stay_back_int != null ? data.data.wage_int.stay_back_int : '0';
								document.getElementById('mai-fen').innerHTML = data.data.wage_int.maifen != null ? data.data.wage_int.maifen : '0.00';
							}
						}
						
						
						
						
						
						
						//APP自动更新
						if(plus.os.name == 'iOS') {
			                      
							var localVer = plus.runtime.version.replace(/\./g, '');
			                      
							$.ajax({
			                    type:"get",
			                    dataType:'json',
			                    url:"https://itunes.apple.com/lookup?id=1195486419",//获取当前上架APPStore版本信息
			                    data:{            
			                        id:1195486419 //APP唯一标识ID
			                    },
			                    contentType:'application/x-www-form-urlencoded;charset=UTF-8',
			                    success:function(data){
			                    	
			                        $.each(data, function(i,norms) {  
			                               $.each(norms, function(key,value) {
			                               var notes = value.releaseNotes
			                              var storeVer = value.version.replace(/\./g, '');
												if(localVer<storeVer){
													mui.alert(notes,'新版本更新提示',function(){
														 document.location.href="https://itunes.apple.com/cn/app/san-gu-hui/id1195486419?mt=8";
													})
												}
			                            });
			                        });        
			                        return ;
			                    }
			                });
			            }else{
			
							var localVer = plus.runtime.version.replace(/\./g, '');
							mui.ajax(apiUrl + 'login/get_version', {
								data: {},
								type: 'post',
								timeout: 10000,
								success: function(data) {
			
									var data = JSON.parse(data);
									if(data.status == 1) {
										var storeVer = data.data.version.replace(/\./g, '');
										if(localVer < storeVer) {
											mui.confirm('发现新版本，确认更新', '版本更新提示', function(e) {
												if(e.index == 1) {
													var wgtWaiting = plus.nativeUI.showWaiting("开始下载",{
														background: 'rgba(0,0,0,0.5)'
													});
													var wgtUrl = data.data.android_url;
													var wgtOption = {
														filename: "_doc/update/",
														retry: 1
													};
													var task = plus.downloader.createDownload(wgtUrl, wgtOption, function(download, status) {
														if(status == 200) {
															wgtWaiting.setTitle("开始安装");
															plus.runtime.install(download.filename, {}, function(wgtinfo) {
																wgtWaiting.close();
																mui.alert("更新完成，须重启应用！", function() {
																	plus.runtime.restart();
																});
															}, function(error) {
																wgtWaiting.close();
																mui.alert("应用更新失败！\n" + error.message);
															});
														} else {
															mui.alert("应用升级失败！");
															wgtWaiting.close();
														}
													});
													task.addEventListener("statechanged", function(download, status) {
														switch(download.state) {
															case 2:
																wgtWaiting.setTitle("已连接到服务器");
																break;
															case 3:
																var percent = download.downloadedSize / download.totalSize * 100;
																wgtWaiting.setTitle("已下载 " + parseInt(percent) + "%");
																break;
															case 4:
																wgtWaiting.setTitle("下载完成");
																break;
														}
													});
													task.start();
												}
												return;
											})
										}
			
									}
			
								}
							})
			            }
						
						
						
						
						
						
						
						return false;
					},
					beforeSend: function() {
						plus.nativeUI.showWaiting("玩命加载中...", {
							background: 'rgba(0,0,0,0.5)'
						});
					},
					complete: function() {
						plus.nativeUI.closeWaiting();
					},
					error: function(xhr, typeinfo) {
						if(typeinfo == 'abort') {
							mui.alert('连接不到网络，请检查您当前的网络设置');
						} else {
							mui.alert('参数错误' + typeinfo);
						}
					}
				});

			}
			//选项卡  
			mui('.mui-bar-tab').on('tap', 'a', function() {
				var href = this.getAttribute('href');

				if(href == "index" && plus.storage.getItem('if_company') == 1) {
					href = "index-boss";
				} else if(href == "index" && plus.storage.getItem('if_company') != 1) {
					href = "index";
				}
				if(href == 'address') {
					if(plus.storage.getItem('if_reg') == '1') {
						href = 'shop';
					} else {
						href = 'authorize-login';
					}
				}
				mui.openWindow({
					url: href + '.html',
					id: href,
					createNew: false,
					show: {
						autoShow: true,
						aniShow: false
					},
					waiting: {
						autoShow: true,
						title: '玩命加载中...'
					},
				})
			})

			//链接
			mui('.mui-table-view,.mui-row').on('tap', 'a', function() {
				var href = this.getAttribute('href');

				if(href == 'setting-zwxx' && plus.storage.getItem('role') == "0") {
					return false;
				}

				if(href == 'shop') {
					if(plus.storage.getItem('if_reg') == '1') {
						href = 'shop';
					} else {
						href = 'authorize-login';
					}

					mui.openWindow({

						url: href + '.html',
						id: href,
						createNew: true,
						show: {
							autoShow: true,
							aniShow: "slide-in-right"

						},
						waiting: {
							autoShow: false,
							title: '玩命加载中...'
						},
					})
					return false;
				}
				mui.openWindow({
					url: href + '.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},
					waiting: {
						autoShow: false,
						title: '玩命加载中...'
					},

				})
			})

			//跳转BOSS
			if(plus.storage.getItem('if_company') == 1) {

				mui.openWindow({
					url: 'index-boss.html',
					id: 'index-boss',
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},
					waiting: {
						autoShow: false,
						title: '玩命加载中...'
					},

				})

			}
			//获取推送信息
			if(plus.storage.getItem('getuiClientInfo') != 1) {
				var system = 0;
				if(plus.os.name == 'iOS') {
					system = 1;
				} else {
					system = 2;
				}

				var getuiData = {
					"token": plus.storage.getItem('token'),
					"cid": plus.push.getClientInfo().clientid,
					"device_token": plus.push.getClientInfo().token,
					"system": system
				}
				console.log(JSON.stringify(getuiData))

				mui.ajax(apiUrl + 'app/get_device_token', {
					data: getuiData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						if(data.status == 1) {

							plus.storage.setItem('getuiClientInfo', '1')
						}
					}
				});
			}
			//处理推送

			if(plus.os.name == 'Android') {

				plus.push.addEventListener("receive", function(msg) {

					var data = JSON.parse(msg.payload)

					if(data.type == 'gonggao' || data.type == 'zhidu') {
						mui.confirm('您有一条新的消息', '慧人事', function(e) {
							if(e.index == 1) {
								var toUrl = ''
								if(data.type == 'gonggao')
									toUrl = 'setting-gonggao-detail';
								else if(data.type == 'zhidu')
									toUrl = 'setting-gzzd';

								mui.openWindow({
									url: toUrl + '.html',
									id: toUrl,
									createNew: true,
									extras: {
										noticeId: data.id
									},
									show: {
										autoShow: true,
										aniShow: "slide-in-right"
									},
									waiting: {
										autoShow: false,
										title: '玩命加载中...'
									},

								})
							}
						})
					} else if(data.type == 'gongzitiao') {
						mui.alert(data.title)
					}
				})

			} else {

				plus.push.addEventListener("receive", function(msg) {
					if(msg.payload.type == 'gonggao' || msg.payload.type == 'zhidu') {
						mui.confirm('您有一条新的消息', '慧人事', function(e) {

							if(e.index == 1) {

								var toUrl = ''
								if(msg.payload.type == 'gonggao')
									toUrl = 'setting-gonggao-detail';
								else if(msg.payload.type == 'zhidu')
									toUrl = 'setting-gzzd';

								mui.openWindow({
									url: toUrl + '.html',
									id: toUrl,
									createNew: true,
									extras: {
										noticeId: msg.payload.id
									},
									show: {
										autoShow: true,
										aniShow: "slide-in-right"
									},
									waiting: {
										autoShow: false,
										title: '玩命加载中...'
									},

								})
							}
							plus.push.clear();
						})
					} else if(msg.type == 'gongzhitiao') {
						mui.alert(msg.payload.tile)
					}
				})

				plus.push.addEventListener("click", function(msg) {
					if(msg.payload.type == 'gonggao' || msg.payload.type == 'zhidu') {
						var toUrl = ''
						if(msg.payload.type == 'gonggao')
							toUrl = 'setting-gonggao-detail';
						else if(msg.payload.type == 'zhidu')
							toUrl = 'setting-gzzd';

						mui.openWindow({
							url: toUrl + '.html',
							id: toUrl,
							createNew: true,
							extras: {
								noticeId: msg.payload.id
							},
							show: {
								autoShow: true,
								aniShow: "slide-in-right"
							},
							waiting: {
								autoShow: false,
								title: '玩命加载中...'
							},

						})
						plus.push.clear();
					} else if(msg.type == 'gongzhitiao') {
						mui.alert(msg.payload.title);
					}
				})

			}
			
		})