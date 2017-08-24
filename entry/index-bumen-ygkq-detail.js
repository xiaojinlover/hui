mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {
			//获取今日考勤列表
			var kaoqingData = {
				"token": plus.storage.getItem('token'),
				"employee_id":plus.webview.currentWebview().employeeId
			}		
			
			mui.ajax(apiUrl +  'Employee/employee_month_kaoqin', {
				data: kaoqingData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					if(!!data.data.employee_info.users_image){
						document.getElementById('users-image').setAttribute('src',data.data.employee_info.users_image);
					}
					document.getElementById('title').innerHTML = data.data.employee_info.real_name;
					var userInfoHtml = '<div>' + data.data.employee_info.real_name + ' <small class="text-999">' + data.data.employee_info.department_name + '</small></div><p>迟到早退:<span class="text-danger">' + data.data.late_num + '次</span>  | 旷工缺勤:<span class="text-danger">' + data.data.kuanggong_num + '次</span></p>'
					document.getElementById('users-info').innerHTML = userInfoHtml;
					//考勤列表
					var kaoQinList = '';
					mui.each(data.data.duty_check_list,function(index,item){
//						kaoQinList += '<li class="mui-table-view-cell">' + item.month_day + '<div class="mui-badge">签到：<span class="' + (item.start_error==1?"text-danger":"text-333") + '">' + item.start_check_in_time + '</span><br/>签退：<span class="' + (item.end_error==1?"text-danger":"text-333") + '">' + item.end_check_in_time + '</span></div></li>'
						kaoQinList += '<li class="mui-table-view-cell text-999">签到：<span class="' + (item.start_error==1?"text-danger":"text-333") + '">' + item.start_check_in_time + '</span><br/>签退：<span class="' + (item.end_error==1?"text-danger":"text-333") + '">' + item.end_check_in_time + '</span><div class="mui-badge mui-badge-inverted text-333">' + item.month_day + '</div></li>'
						 
					})
					if(kaoQinList!='')  
						document.getElementById('kao-qin-list').innerHTML = kaoQinList;
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