mui.init({
			swipeBack: true, //启用右滑关闭功能  
		});
		mui.plusReady(function() {
			//获取花名册
			var yghmcData = {
				"token":plus.storage.getItem('token'),
			}
			mui.ajax(apiUrl +  'boss/department_list', {
					data: yghmcData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						if(data.status == 1) {
							var headerInfoHtml = '<div class="mui-col-xs-12">' + data.data.employee_num + '<p>职员总数</p></div><div class="mui-col-xs-4">' + data.data.join_num + '<p>最近30天新入职</p></div><div class="mui-col-xs-4">' + data.data.leave_num + '<p>最近30天离职</p></div><div class="mui-col-xs-4">' + (data.data.lizhilv*100).toFixed(2) + '%<p>本月离职率</p></div>'
							document.getElementById('header-info').innerHTML = headerInfoHtml;
							//列表
							var yghmcListHtml = ''
							mui.each(data.data.department,function(index,item){
								yghmcListHtml += '<li class="mui-table-view-cell"><a class="mui-navigate-right" department-name="' + item.department_name + '" department-id="' + index + '" href="index-boss-yghmc-detail"><div class="mui-pull-left title">' + item.department_name + '</div><div class="mui-pull-right mui-badge"><p>入职：' + item.join_num + '</p><p>离职：' + item.leave_num + '</p></div></a></li>'
							})
							document.getElementById("yghmc-list").innerHTML = yghmcListHtml;
//							document.getElementById('yghmc-list').innerHTML = yghmcListHtml;
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
				var href = this.getAttribute('href');
				var departmentId = this.getAttribute('department-id');
				var departmentName = this.getAttribute('department-name');
				mui.openWindow({
					url: href + '.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},
					extras:{
						departmentId:departmentId,
						departmentName:departmentName
					},
					waiting: {
						autoShow: false,
						title: '玩命加载中...'
					},

				})
			})
		})