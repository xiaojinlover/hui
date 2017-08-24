mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				down: {
					callback: pulldownRefresh,
					contentrefresh: "",
					contentover: "",
					auto: true,
				}
			}
		});

		function getInfo() {} //全局

		//下拉刷新
		
		function pulldownRefresh() {
			setTimeout(function() { 
				var getAddressData = {
					"token": plus.storage.getItem("token")
				};
				var url = '';
				if(plus.storage.getItem('if_company')==1){
					url = 'boss/tongxunlu';
				}else{
					url = 'employee/tongxunlu';
				}
				mui.ajax(apiUrl +  url , {
					data: getAddressData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						
						var data = JSON.parse(data);
						var addressHtml = '';
						if(data.status == 1 && !!data.data) {
							
							mui.each(data.data,function(index,item){ 
								addressHtml += '<li data-group="'+index+'" class="mui-table-view-divider mui-indexed-list-group">'+index+'</li>'; 
								mui.each(item,function(index1,item1){									
									addressHtml += '<li class="mui-table-view-cell mui-indexed-list-item"><a data-usersid = "' + item1.users_id + '" href="zhuanzhang-tongshi" data-zhiwei="' + (item1.zhi_wei!=""?item1.zhi_wei:"暂无") + '" data-name="' + (item1.users_name!=""?item1.users_name:"暂无") + '" data-touxiang="' + (item1.users_image!=null&&item1.users_image!=""?item1.users_image:"images/logo-white.png") + '"><img class="mui-media-object mui-pull-left" style="width:40px;height:40px" src="' + (item1.users_image!=null&&item1.users_image!=""?item1.users_image:"images/logo-white.png")  + '"><div class="mui-media-object mui-pull-right"></div><div class="mui-media-body">'+ (item1.users_name!=""?item1.users_name:"暂无")+'（' + (item1.telephone!=""?item1.telephone:"暂无") + '）<p class="mui-ellipsis">' + (item1.zhi_wei!=""?item1.zhi_wei:"暂无") + '</p></div></a></li>';
								}) 
								
							})
//							console.log(addressHtml);							
							document.getElementById('address-list').innerHTML = addressHtml ;
							//索引列表
							var header = document.querySelector('header.mui-bar'); 
							var nav = document.querySelector("nav");
							var list = document.getElementById('list');
							list.style.height = (document.body.offsetHeight - header.offsetHeight - nav.offsetHeight) + 'px';
							window.indexedList = new mui.IndexedList(list);
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
				
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
				
			}, 800);
		}

		mui.plusReady(function() {
			if(plus.storage.getItem('if_company')==1){
				document.getElementById('title').innerHTML= '选择员工';
			}
			//选择同事
			mui('.mui-table-view').on('tap','a',function(){
					
				var href = this.getAttribute('href');
				var touxiang = this.getAttribute('data-touxiang');
				var name = this.getAttribute('data-name');
				var zhiwei = this.getAttribute('data-zhiwei');
				var usersid = this.getAttribute('data-usersid');
				var haveIntNum = plus.webview.currentWebview().haveIntNum;
				if(plus.storage.getItem("if_company")==1){
					href = href + '-boss';
				}
				mui.openWindow({
					url: href + '.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},
					extras:{
						touxiang:touxiang,
						name:name,
						zhiwei:zhiwei,
						usersid:usersid,
						haveIntNum:haveIntNum,
						isJifen:plus.webview.currentWebview().isJifen
					},
					waiting: {
						autoShow: true,
						title: '退出成功...'
					},

				})
			})
		})