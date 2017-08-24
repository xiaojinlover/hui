mui.init({
			swipeBack: true //启用右滑关闭功能  

		});
		mui.plusReady(function() {
			var shenHeType = plus.webview.currentWebview().shenHeType;
			var forms = plus.webview.currentWebview().forms; 
			
			//选择联系人
			mui(document).on('change','input[type="checkbox"]',function(){
			var openerHtml = ''
			var usersIdArray = []; 
				var i = 0
				mui.each(mui('input[type="checkbox"]'),function(index,item){
					if(item.checked){
						
						usersIdArray[i] = this.parentNode.getAttribute('data-usersid');
						
						openerHtml += '<div class="image-item" ><div data-form = "' + forms + '" class="image-close" data-type="' + shenHeType + '" data-usersid="' + this.parentNode.getAttribute('data-usersid') + '">X</div><img class="file" src="' + this.parentNode.getAttribute('data-usersimage') + '"><p class="name">' + this.parentNode.getAttribute('data-realname') + '</p></div>'
						
						i++;
					}
				})
				
				
				var jqsp = plus.webview.currentWebview().opener();
				mui.fire(jqsp,'insertHtml',{
					usersHtml:openerHtml,
					forms:forms,
					id:shenHeType + '-item',
					shenHeType:shenHeType,
					usersIdArray:usersIdArray.toString()
				});
				mui.back()
				
			})
			
			if(shenHeType == 'shen-he-ren') {
				document.getElementById('title').innerHTML = '选择审批人';
			} else if(shenHeType == 'chao-song-ren') {
				document.getElementById('title').innerHTML = '选择抄送人';
			}
			var userLsitData = {
				"token": plus.storage.getItem('token')
			}
			mui.ajax(apiUrl +  'employee/get_leader', {
				data: userLsitData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					if(data.status == 1) {
						var userListHtml = '';
						mui.each(data.data,function(index,item){
							userListHtml += '<li class="mui-table-view-cell mui-checkbox mui-right"><a href="javascript:void(0)" data-realname="' + item.real_name + '" data-usersimage="' + (item.users_image!=null?item.users_image:"images/logo-white.png") + '" data-usersid="' + item.emp_id + '" data-zhiwei="' + item.zhi_wei + '"><img class="mui-media-object mui-pull-left" src="' + (item.users_image!=null?item.users_image:"images/logo-white.png") + '"><div class="mui-media-body">' + item.real_name + '<p class="mui-ellipsis">' + item.zhi_wei + '</p></div><input name="userid" type="checkbox"></a></li>';
						})
						document.getElementById('user-list').innerHTML = userListHtml;
						
						
						
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