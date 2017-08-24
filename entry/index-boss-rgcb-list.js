mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {
			//列表
			var getInfoData = {
				"token": plus.storage.getItem("token"),
				"dis_int_id": plus.webview.currentWebview().wageIntId				
			}	
			
			mui.ajax(apiUrl + 'cmpint/item_users_list', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {					
					var data = JSON.parse(data);
					
					if(data.data.users_wage_int_list!=''||data.data.users_wage_int_list!=null){
						
						var bumenMingxiHtmlList = '';
						mui.each(data.data.users_wage_int_list,function(index,item){ 
							bumenMingxiHtmlList += '<li class="mui-table-view-divider">' + index + '</li>'; 
							mui.each(item,function(index1,item1){									
								bumenMingxiHtmlList += '<li class="mui-table-view-cell mui-media"><a class="mui-navigate-right" users-id="' + item1.users_id + '" href="index-boss-rgcb-list-detail"><img class="mui-media-object mui-pull-left" src="' + (item1.users_image!=null&&item1.users_image!=""?item1.users_image:"images/logo-white.png") + '"><div class="mui-media-body">' + (item1.real_name!=null?item1.real_name:'暂无') + ' <p>实发工资：<span class="text-danger">' + item1.int + '</span></p></div></a></li>'
							}) 
							
						})
						document.getElementById('bu-men-ming-xi-list').innerHTML = bumenMingxiHtmlList;
					}
				},
				beforeSend: function() {
					plus.nativeUI.showWaiting("玩命加载中...", {
						background: "rgba(0,0,0,0.5)"
					});

				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				},
				error: function(xhr, typeinfo) {
					mui.alert("参数错误：" + typeinfo);
				}
			});
			//链接
			mui('.mui-table-view').on('tap', 'a', function() {
				var href = this.getAttribute('href');
				var usersId = this.getAttribute('users-id');
				mui.openWindow({
					url: href + '.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},
					extras: {
						"usersId": usersId
					},
					waiting: {
						autoShow: false,
						title: '玩命加载中...'
					},

				})
				return false;
			})
		})