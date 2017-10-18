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
						if(data.detail == '离职'){
							document.getElementById('kuaishebao').setAttribute('class', 'mui-table-view-cell mui-media mui-col-xs-4');
							document.getElementById('gong-gao').setAttribute('class', 'mui-table-view-cell mui-media mui-col-xs-4 mui-hidden');
							document.getElementById('zhi-du').setAttribute('class', 'mui-table-view-cell mui-media mui-col-xs-4 mui-hidden');
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
				if(href=='address'){
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
		})