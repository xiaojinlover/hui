mui.init({
			swipeBack: true //启用右滑关闭功能

		});
		
		mui.plusReady(function() {
			var zhiweiInfoData = {
				"token":plus.storage.getItem('token')
			}
			if(plus.storage.getItem('role')!=3){
				document.getElementById('li-zhi-shen-qing').setAttribute('class','mui-table-view mui-table-view-item'); 
			}
			mui.ajax(apiUrl +  'Employee/zhi_wei_info', {
					data: zhiweiInfoData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						
						var data = JSON.parse(data);
						
						if(data.status == 1) {
							var headerInfoHtml = '';
							headerInfoHtml = '<img src="' + (!!data.data.users_image?data.data.users_image:"images/logo-white.png") + '" /><h2>' + data.data.real_name + '</h2><h3>' + data.data.department_name + '  |  ' + (!!data.data.zhi_wei?data.data.zhi_wei:"暂无") + '</h3>';
							document.getElementById('header-info').innerHTML = headerInfoHtml;
							
							document.getElementById('yuan_gong_zhuang_tai').innerHTML = data.data.yuan_gong_zhuang_tai!=null?data.data.yuan_gong_zhuang_tai:'暂无';
							document.getElementById('company_name').innerHTML = data.data.company_name!=null?data.data.company_name:'暂无';
							document.getElementById('department_name').innerHTML = data.data.department_name!=null?data.data.department_name:'暂无';
							document.getElementById('email').innerHTML = data.data.email!=null?data.data.email:'暂无';
							document.getElementById('telephone').innerHTML = data.data.telephone!=null?data.data.telephone:'暂无';
							document.getElementById('ru_zhi_shi_jian').innerHTML = data.data.ru_zhi_shi_jian!=null?data.data.ru_zhi_shi_jian:'暂无';
							if(data.data.yuan_gong_zhuang_tai=='待离职'){
								document.getElementById('li-zhi-shen-qing').innerHTML = '<li class="mui-table-view-divider"></li><li class="mui-table-view-cell mui-table-view-cell-sub"><a class="mui-navigate-right" data-action="che-xiao" href="setting-lzxx">撤销离职申请</a></li>'
							}
						}else{
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
				//链接
			mui('.mui-table-view').on('tap', 'a', function() {
					var action = this.getAttribute('data-action');
					
					if(action == 'che-xiao'){	
						mui.confirm("您确定要撤销入职",function(e){							
							if(e.index==1){								
								mui.ajax(apiUrl +  'Employee/cancel_leave', {
									data: zhiweiInfoData,
									type: 'post',
									timeout: 10000,
									success: function(data) {
										console.log(data)
										var data = JSON.parse(data);
										if(data.detail=="撤消离职成功"){
											mui.alert(data.detail,function(){
												document.getElementById('li-zhi-shen-qing').innerHTML = '<li class="mui-table-view-divider"></li><li class="mui-table-view-cell mui-table-view-cell-sub"><a class="mui-navigate-right" href="setting-lzxx">离职申请</a></li>';
												document.getElementById('yuan_gong_zhuang_tai').innerHTML = "在职";  
											});
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
							}							
						})
						
						
						return false;
					}
					
					var href = this.getAttribute('href');
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
		})