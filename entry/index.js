//时间显示
		function fa(j) {
			if(j < 10) {
				return '0' + j.toString();
			} else {
				return j;
			}
		}  
		var t = null;
		t = setTimeout(time, 1000);

		function time() {
			clearTimeout(t);
			dt = new Date();
			var h = dt.getHours(); 
			var m = dt.getMinutes();
			var s = dt.getSeconds();
			document.getElementById("timeShow").innerHTML = fa(h) + ":" + fa(m) + ":" + fa(s);
			t = setTimeout(time, 1000); 

			//打卡状态文字背景变色
			var work_start_time = plus.storage.getItem('work_start_time');
			var work_end_time = plus.storage.getItem('work_end_time');
			var if_work_start = plus.storage.getItem('if_work_start');
			var currentTime = (fa(h).toString() + fa(m).toString() + fa(s).toString()) * 1;
			if(work_start_time!=null)
				work_start_time = work_start_time.replace(/\:/g, "");
			if(work_end_time!=null)
				work_end_time = work_end_time.replace(/\:/g, ""); 
		
			if(if_work_start!=null&&if_work_start!=0) {
				
				if(currentTime < work_end_time) {
					document.getElementById('clock').style.background = "#fe9669";
				} else {
					document.getElementById('clock').style.background = "#45b3ff";
				}
				if(plus.storage.getItem('if_work_start') == 0) {
					document.getElementById('clock-text').innerHTML = "上班打卡";
				} else if(plus.storage.getItem('if_work_start') == 1 && plus.storage.getItem('if_work_end') == 0) {
					document.getElementById('clock-text').innerHTML = "下班打卡";
				} else {
					document.getElementById('clock-text').innerHTML = "打卡"; 
				}
			} else {
				
				if(work_start_time && work_end_time) {
					if(currentTime < work_end_time && currentTime > work_start_time) {
						document.getElementById('clock').style.background = "#fe9669";
					} else {
						document.getElementById('clock').style.background = "#45b3ff";
					}
					if(plus.storage.getItem('if_work_start') == 0) {
						document.getElementById('clock-text').innerHTML = "上班打卡";
					} else if(plus.storage.getItem('if_work_start') == 1 && plus.storage.getItem('if_work_end') == 0) {
						document.getElementById('clock-text').innerHTML = "下班打卡";
					} else {
						document.getElementById('clock-text').innerHTML = "打卡"; 
					}
				}
			}

		}
		
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
			
			if(plus.storage.getItem('token')!=null){
				var login = plus.webview.getWebviewById('login');
				if(login!=null)
					login.close();				
			}
			
			//白名单
			if(plus.storage.getItem('if_white')!='1'){ 
				document.getElementById('bai-daka').setAttribute('class','mui-row');
				document.getElementById('bai-01').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4');
				document.getElementById('bai-02').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4');
				document.getElementById('bai-03').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4');
			}else{
				document.getElementById('bai-daka').setAttribute('class','mui-row mui-hidden');
				document.getElementById('bai-01').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4 mui-hidden');
				document.getElementById('bai-02').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4 mui-hidden');
				document.getElementById('bai-03').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4 mui-hidden');
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
				//是否HR或总经理副总经理
				
				if(plus.storage.getItem('role') == "2"||plus.storage.getItem('role') == "3") {
					document.getElementById('feng-xian-yu-jing').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4'); 
					document.getElementById('shen-pi-guan-li').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4');
					document.getElementById('yuan-gong-jia-qin').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4');
					document.getElementById('kao-qin-ji-lu').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4');
				}else if(plus.storage.getItem('role') == "4"){
					document.getElementById('shen-pi-guan-li').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4');
					document.getElementById('feng-xian-yu-jing').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4 mui-hidden');
					document.getElementById('yuan-gong-jia-qin').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4 mui-hidden');
					document.getElementById('kao-qin-ji-lu').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4 mui-hidden');
				}

				document.getElementById('gerenInfo').innerHTML = (plus.storage.getItem("real_name") != null ? plus.storage.getItem("real_name") : "暂无") + '<p class="mui-ellipsis" id="zhi-wei">' + (plus.storage.getItem("zhi_wei") != null ? plus.storage.getItem("zhi_wei") : "暂无") + '</p>';

				//公司名称
				document.getElementById('title').innerHTML = (plus.storage.getItem("companyname") != "" ? plus.storage.getItem("companyname") : "未入职");
				
				//用户头像
				document.getElementById('users-head').setAttribute('src',plus.storage.getItem('users_image'));
				
				
				
				
				var getInfoData = {
					"token": plus.storage.getItem("token")
				}		
				
				mui.ajax(apiUrl +  'employee/index', {  
					
					data: getInfoData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						
						var data = JSON.parse(data);   
						plus.storage.setItem('ruzhi-status', data.detail);
						//是否代发
						if(data.data.if_daifa==1){
							document.getElementById('dai-fa').className = 'score-detail-wrap';
						}  
						//入职状态 
						if(data.detail == "离职") {
							plus.storage.setItem('role', '0');
							document.getElementById('index-header-info').removeAttribute('class');
//							document.getElementById('li-ji-ru-zhi').setAttribute('href', 'ruzhi-wdll-grzl');
							document.getElementById('li-ji-ru-zhi').setAttribute('class', 'mui-btn mui-btn-outlined');
							document.getElementById('li-ji-ru-zhi').innerHTML = '立即入职';
						} else if(data.detail == "待入职") {
							
							document.getElementById('index-header-info').removeAttribute('class');
//							document.getElementById('zhi-wei').innerHTML = "入职申请审核中...";
							document.getElementById('li-ji-ru-zhi').setAttribute('class', 'mui-btn mui-btn-outlined');
							document.getElementById('li-ji-ru-zhi').setAttribute('href', 'ruzhi-wdll-grzl');
							document.getElementById('li-ji-ru-zhi').innerHTML = '入职审核中';
						} else {
							plus.storage.setItem('ruzhi-status', '');  
						} 
						
						
						if(data.data.role == "2"||data.data.role == "3") {
							document.getElementById('feng-xian-yu-jing').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4'); 
							document.getElementById('shen-pi-guan-li').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4');
							document.getElementById('yuan-gong-jia-qin').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4');
							document.getElementById('kao-qin-ji-lu').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4');
						}else if(data.data.role == "4"){
							document.getElementById('shen-pi-guan-li').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4');
							document.getElementById('feng-xian-yu-jing').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4 mui-hidden');
							document.getElementById('yuan-gong-jia-qin').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4 mui-hidden');
							document.getElementById('kao-qin-ji-lu').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4 mui-hidden');
						}
						
						//是否领导							
						if(data.data.if_fu_ze_ren == '1') {
							document.getElementById('shen-pi-guan-li').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4');
							document.getElementById('bu-men-kao-qin').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4');
						}
						
						if(data.status == 1 && data.data != '') {
							
							document.getElementById("cdzt").innerHTML = data.data.late_early_num!='undefined'?data.data.late_early_num:'0';
							document.getElementById("kgqq").innerHTML = data.data.kuanggong_num!='undefined'?data.data.kuanggong_num:'0';
							document.getElementById("jqts").innerHTML = data.data.jia_qing_num!='undefined'?data.data.jia_qing_num:'0';

							plus.storage.setItem("allow_error_range", data.data.allow_error_range);

							//设置role
							plus.storage.setItem('role', data.data.role);
							plus.storage.setItem('companyname', data.data.company_name);
							plus.storage.setItem('zhi_wei',data.data.zhi_wei);
							plus.storage.setItem('if_white',data.data.if_white);
							
							//原始坐标
							plus.storage.setItem("position_x", data.data.position_x != null ? data.data.position_x : '0');
							plus.storage.setItem("position_y", data.data.position_y != null ? data.data.position_y : '0');

							//是否已打卡
							plus.storage.setItem("if_work_start", data.data.if_work_start != null ? data.data.if_work_start.toString() : '');
							plus.storage.setItem("if_work_end", data.data.if_work_end != null ? data.data.if_work_end.toString() : '');

							//上下班时间
							plus.storage.setItem("work_start_time", data.data.work_start_time != null ? data.data.work_start_time : '0');
							plus.storage.setItem("work_end_time", data.data.work_end_time != null ? data.data.work_end_time : '0');
							
							plus.storage.setItem("real_name",data.data.real_name);
							
							//会员头像
							plus.storage.setItem("users_image", data.data.users_image != null ? data.data.users_image : 'images/test-head.png');
							document.getElementById('users-head').setAttribute('src',plus.storage.getItem('users_image'));
							
							
							
							plus.storage.setItem('telephone_key',data.data.telephone_key);
							
							//缓存登录第三方登录注册信息
							
							if(data.data.platform){								
								plus.storage.setItem('platform',JSON.stringify(data.data.platform)); 
								plus.storage.setItem('if_reg',data.data.platform[0].if_reg.toString()); 								
							}
							
							//用户积分		
							if(data.data.wage_int!=null){
								document.getElementById('xian-jin-gong-zi').innerHTML = data.data.wage_int.have_int_num!=null?data.data.wage_int.have_int_num:'0';
								document.getElementById('zeng-song-ji-fen').innerHTML = data.data.wage_int.already_int!=null?data.data.wage_int.already_int:'0';
								document.getElementById('dai-zeng-ji-fen').innerHTML = data.data.wage_int.stay_back_int!=null?data.data.wage_int.stay_back_int:'0';
							}
						}
						//白名单
						if(plus.storage.getItem('if_white')!='1'){ 
							document.getElementById('bai-daka').setAttribute('class','mui-row');
							document.getElementById('bai-01').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4');
							document.getElementById('bai-02').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4');
							document.getElementById('bai-03').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4');
						}else{
							document.getElementById('bai-daka').setAttribute('class','mui-row mui-hidden');
							document.getElementById('bai-01').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4 mui-hidden');
							document.getElementById('bai-02').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4 mui-hidden');
							document.getElementById('bai-03').setAttribute('class','mui-table-view-cell mui-media mui-col-xs-4 mui-hidden');
						}
						//是否显示赠送积分
						if(data.data.if_ret_int==1){
							document.getElementById('zong-song-ji-fen').className = 'mui-col-xs-4 mui-hidden';
							document.getElementById('dai-zong-ji-fen').className = 'mui-col-xs-4 mui-hidden';
						}
						
						return false; 
					},
					beforeSend: function() {
						plus.nativeUI.showWaiting("玩命加载中...",{
							background:'rgba(0,0,0,0.5)'
						});
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

			}
			
			//打卡
			document.getElementById('clock').addEventListener("tap", function() {
				
				//判断是否设置考勤打卡
				if(plus.storage.getItem('position_x') == 0 || plus.storage.getItem('position_y')==0) {
					mui.alert('请联系管理员设置考勤组并刷新本页')
					return false;
				}
				mui.confirm('亲，确认打卡吗？', '提示', function(e) {
					
					if(e.index != 0) {
						
						//获取经纬度
						var geolocation = new BMap.Geolocation();
						
						geolocation.getCurrentPosition(function(r) {
							if(r==null){
								mui.alert('无法获取您的定位，请检查您的手机设置是否允许"慧人事"APP获取您的定位！'); 
								return false;
							}
								
							var position_x = r.point.lng;
							var position_y = r.point.lat;   
							
							//判断是否范围内
							
							var circle = new BMap.Circle(new BMap.Point(plus.storage.getItem('position_x'), plus.storage.getItem('position_y')), plus.storage.getItem('allow_error_range'));
							var point = new BMap.Point(position_x, position_y);
							
							if(BMapLib.GeoUtils.isPointInCircle(point, circle)) {
								
								//提交打卡
								
								var daka = '';
								if(plus.storage.getItem('if_work_start') == 0) {
									daka = 'start';
								} else if(plus.storage.getItem('if_work_end') == 0 && plus.storage.getItem('if_work_start') == 1) {
									daka = 'end';
								}else{
									daka = 'end';
								}
								
								if(plus.storage.getItem('if_work_start') == 0)
								
								if(daka=='') {
									mui.alert('您已经打过上下班卡');
									return false;
									
								}
								

								var clockData = {
									"daka": daka,
									"token": plus.storage.getItem('token')
								};
								mui.ajax(apiUrl +  'employee/clock_star', {
									data: clockData,
									type: 'post',
									timeout: 10000,
									success: function(data) { 
										 
										var data = JSON.parse(data);
										
										if(data.detail == '上班打卡成功') {						
											mui.alert(data.detail);
											plus.storage.setItem('if_work_start', '1');
											return false;
										} else if(data.detail == '下班打卡成功') {
											
											mui.alert(data.detail);
											plus.storage.setItem('if_work_end', '1');
											return false;
										} else {
											mui.alert(data.detail);
											return false;
										}
									},
									beforeSend: function() {
										plus.nativeUI.showWaiting("打卡中...");
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
								mui.alert('不在打卡范围内');
							}
						})

					}
				})

			})

			//选项卡  
			mui('.mui-bar-tab').on('tap', 'a', function() {
					var href = this.getAttribute('href');
					
					if(href == "index" && plus.storage.getItem('if_company') == 1) {
						href = "index-boss";
					} else if(href == "index" && plus.storage.getItem('if_company') != 1){
						href = "index";
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
			mui('.mui-table-view').on('tap', 'a', function() {
					var href = this.getAttribute('href');
					
					if(href == 'setting-zwxx' && plus.storage.getItem('role') == "0") {
						return false;
					}
					if(href=='shop'){						
						if(plus.storage.getItem('if_reg')=='1'){							
							href = 'shop';							
						}else{
							href = 'authorize-login';
						}
						
						mui.openWindow({
							
							url:href + '.html',
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
			//迟到 早退假勤链接跳转
			mui('.mui-row').on('tap', 'a', function() {
					
					var href = this.getAttribute('href');
					var param = this.getAttribute('param');
//					if(href=='score-dzjf'){
//						return false;
//					}
					mui.openWindow({
						url: href + '.html',
						id: href,
						createNew: true,
						show: {
							autoShow: true,
							aniShow: "slide-in-right"
						},
						extras:{
							"param":param
						},
						waiting: {
							autoShow: false,
							title: '玩命加载中...'
						},

					})
					return false;
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