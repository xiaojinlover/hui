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
			if(plus.webview.currentWebview().opener()!=null){
				if(plus.webview.currentWebview().opener().id!='HBuilder')
				plus.webview.currentWebview().opener().close();	
			}	
			document.activeElement.blur();
			//获取首页数 据(全局)
			getInfo.prototype.getData = function() {
				//用户头像				
				var getInfoData = {
					"token": plus.storage.getItem("token")
				}				

				 
				//今日考勤、今日假勤、今日审批、本月异动
				mui.ajax(apiUrl +  'Boss/index', {
					data: getInfoData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						
						var data = JSON.parse(data);
						if(data.status == 1){
							//是否代发
							if(data.data.if_daifa==1){
								document.getElementById('dai-fa').className = 'score-detail-wrap';
							} 
							
//							document.getElementById('jrkq').innerHTML = data.data.kao_qin_num;
//							document.getElementById('jrjq').innerHTML = data.data.jia_qin_num;
//							document.getElementById('byyd').innerHTML = data.data.yi_dong;  
							
							plus.storage.setItem("users_image", data.data.users_image != null ? data.data.users_image : 'images/test-head.png');
							document.getElementById('users-head').setAttribute('src',plus.storage.getItem('users_image'));
							plus.storage.setItem('companyname', data.data.company_name);
							document.getElementById('title').innerHTML = plus.storage.getItem('companyname');
							
							document.getElementById('gerenInfo').innerHTML = data.data.users_name!=null?data.data.users_name:"暂无";
							//缓存登录第三方登录注册信息
							
							if(data.data.platform){
								plus.storage.setItem('platform',JSON.stringify(data.data.platform));
								plus.storage.setItem('if_reg',data.data.platform[0].if_reg.toString());
							} 
							if(data.data.wage_int!=''){
								document.getElementById('ben-yue-chong-zhi').innerHTML = data.data.wage_int.month_in;
								document.getElementById('ke-yong-yu-e').innerHTML = data.data.wage_int.total_int;
								document.getElementById('ben-yue-shi-yong').innerHTML = data.data.wage_int.already_int;
							}
						}
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

			//选项卡  
			mui('.mui-bar-tab').on('tap', 'a', function() {
					var href = this.getAttribute('href');
					if(href == "index" && plus.storage.getItem('if_company') == 1) {
						href = "index-boss";
					} else if(href == "index" && plus.storage.getItem('if_company') != 1){
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
//							url: 'http://www.91lxg.com/LeXiangGou-wx/index.html',
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
					if(href=='index-boss-kyye')
						var int = document.getElementById('ke-yong-yu-e').innerHTML;					
					
					mui.openWindow({
						url: href + '.html',
						id: href,
						createNew: true,
						show: {
							autoShow: true,
							aniShow: "slide-in-right"
						},	
						extras:{
							int:int
						},
						waiting: {
							autoShow: false,
							title: '玩命加载中...'
						},

					})
					return false;
				})
				
		})