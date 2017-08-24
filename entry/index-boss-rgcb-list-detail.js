mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {
			//获取员工每月工资明细
			var getInfoData = {
				"token": plus.storage.getItem("token"),
				"users_id":plus.webview.currentWebview().usersId
			}
			
			mui.ajax(apiUrl +  'cmpint/users_yong_gong_detail', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					if(data.data.users_image!=null){
						document.getElementById('users-image').setAttribute('src',data.data.users_image) ;
					}
					
					if(data.status == 1){
						document.getElementById('title').innerHTML = data.data.real_name!=null?data.data.real_name:'暂无';  
						document.getElementById('user-name').innerHTML = data.data.real_name + '<small class="text-999"> ' + (data.data.department_name!=null?data.data.department_name:'暂无') + '</small>';
						document.getElementById('total-gong-zi').innerHTML = data.data.total_have_int!=null?data.data.total_have_int:'暂无';  
						var yuanGongMingXiList = '';
						var totalShiFaGongZi = 0
						mui.each(data.data.users_allot_list,function(index,item){
							yuanGongMingXiList += '<li class="mui-table-view-cell">' + item.time + '<div class="mui-badge">' + item.int_item + ':<span class="text-danger">' + item.int + '</span></div></li>';
											
						})
						document.getElementById('yuan-gong-ming-xi-list').innerHTML = yuanGongMingXiList;
					}
				},
				beforeSend: function() {
					plus.nativeUI.showWaiting("玩命加载中...", {
						background: "rgba(0,0,0,0.4)"
					});

				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				},
				error: function(xhr, typeinfo) {
					mui.alert("参数错误：" + typeinfo);
				}
			});
		})