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
				
				
				if(plus.storage.getItem("if_company")==1)
					var Url = 'Boss/tongxunlu';
				else
					var Url = 'employee/tongxunlu';
				
				mui.ajax(apiUrl +  Url, {
					data: getAddressData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						console.log(data)
						var data = JSON.parse(data);
						var addressHtml = '';
						if(data.status == 1 && !!data.data) {
							
							mui.each(data.data,function(index,item){ 
								addressHtml += '<li data-group="'+index+'" class="mui-table-view-divider mui-indexed-list-group">'+index+'</li>'; 
								mui.each(item,function(index1,item1){									
									addressHtml += '<li class="mui-table-view-cell mui-indexed-list-item"><img class="mui-media-object mui-pull-left" style="width:40px;height:40px" src="' + (item1.users_image!=null&&item1.users_image!=""?item1.users_image:"images/logo-white.png")  + '"><div class="mui-media-object mui-pull-right"><i class="icon iconfont icon-address-phone" id="dial" tel="' + (item1.telephone!=""?item1.telephone:"暂无") + '" ></i></div><div class="mui-media-body">'+ (item1.users_name!=""?item1.users_name:"暂无")+'（' + (item1.telephone!=""?item1.telephone:"暂无") + '）<p class="mui-ellipsis">' + (item1.zhi_wei!=""?item1.zhi_wei:"暂无")+'<p class="mui-ellipsis">邮箱:' + (item1.email!=null&&item1.email!=""?item1.email:"暂无") + '</p></div></li>';
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
						if(typeinfo=='abort'){
							mui.alert('连接不到网络，请检查您当前的网络设置');
						}else{
							mui.alert('参数错误' + typeinfo);
						}
					}
				});
				
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
				
			}, 800);
		}

		mui.plusReady(function() {
			//拨打电话
			mui('.mui-table-view').on('tap','i',function(){
				var telephone = this.getAttribute('tel');
				var btnArray = ['拨打', '取消']; 
                var Phone = telephone; 
                mui.confirm('是否拨打 ' + Phone , '提示', btnArray, function(e) { 
                    if (e.index == 0) { 
                        plus.device.dial(Phone, false);
                    }  
                });
			 
			})
			//选项卡
			mui('.mui-bar-tab').on('tap', 'a', function(e) {
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
						title: '拼命加载中...'
					},

				})
			})

		})