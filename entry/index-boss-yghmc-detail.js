mui.init({
			swipeBack: true, //启用右滑关闭功能  
		});
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			var departmentId = self.departmentId;
			var departmentName = self.departmentName;
			document.getElementById('yghmc-title').innerHTML = departmentName;
			var detailData = {
				"token":plus.storage.getItem('token'),
				"department_id":departmentId
			}
			mui.ajax(apiUrl +  'boss/employee_list', {
				data: detailData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					var detailListHtml = ''
					if(data.status == 1) {
						
						mui.each(data.data,function(index,item){
							detailListHtml += '<li class="mui-table-view-cell"><div class="mui-pull-left title">' + (item.real_name!=""?item.real_name:"暂无姓名") + '</div><div class="mui-pull-right mui-badge"><p>' + (item.yuan_gong_zhuang_tai!="离职"?(item.ru_zhi_shi_jian!=null?item.ru_zhi_shi_jian:"暂无时间"):(item.li_zhi_shi_jian!=null?item.li_zhi_shi_jian:"暂无时间")) + '</p><p class="text-333">' + item.yuan_gong_zhuang_tai + '</p></div></li>';
						})
						document.getElementById('detail-list').innerHTML = detailListHtml;
						
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