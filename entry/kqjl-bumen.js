mui.init({
			swipeBack: true //启用右滑关闭功能      
		});

		mui.plusReady(function() {
			
			//获取今日考勤列表
			var kaoqingData = {
				"token": plus.storage.getItem('token')
			}			
			mui.ajax(apiUrl +  'Employee/daka_list', {
				data: kaoqingData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					if(data.status==1){
						var kaoQinJiLuHtml = '';
						var kaoQinJiLuNum =0 ;
						var chiDaoZaoTuiHtml = '';
						var chiDaoZaoTuiNum = 0;
						var queQinKuangGongHtml = '';
						var queQinKuangGongNum = 0;
						
						mui.each(data.data,function(index,item){
							kaoQinJiLuHtml += '<li class="mui-table-view-cell mui-media"><a class="mui-navigate-right" employee-id="' + item.employee_id + '" href="index-bumen-ygkq-detail"><img class="mui-media-object mui-pull-left" src="' + (!!item.users_image?item.users_image:"images/logo-white.png") + '"><div class="mui-media-body">' + item.real_name + ' <small class="text-999">' + item.department_name + '</small><p>签到：<span class="' + (item.start_error==1?"text-danger":"text-333") + '">' + item.start_check_in_time+ '</span></p><p>签退：<span class="' + (item.end_error==1?"text-danger":"text-333") + '">' + item.end_check_in_time + '</span></p></div></a></li>'
							kaoQinJiLuNum++;
							if(item.if_late==1||item.if_early==1){
								chiDaoZaoTuiHtml += '<li class="mui-table-view-cell mui-media"><a class="mui-navigate-right" employee-id="' + item.employee_id + '" href="index-bumen-ygkq-detail"><img class="mui-media-object mui-pull-left" src="' + (!!item.users_image?item.users_image:"images/logo-white.png") + '"><div class="mui-media-body">' + item.real_name + ' <small class="text-999">' + item.department_name + '</small><p>签到：<span class="' + (item.start_error==1?"text-danger":"text-333") + '">' + item.start_check_in_time+ '</span></p><p>签退：<span class="' + (item.end_error==1?"text-danger":"text-333") + '">' + item.end_check_in_time + '</span></p></div></a></li>'
								chiDaoZaoTuiNum++; 
							}
							
							if(item.if_queqin==1||item.if_kuanggong==1){
								queQinKuangGongHtml += '<li class="mui-table-view-cell mui-media"><a class="mui-navigate-right" employee-id="' + item.employee_id + '" href="index-bumen-ygkq-detail"><img class="mui-media-object mui-pull-left" src="' + (!!item.users_image?item.users_image:"images/logo-white.png") + '"><div class="mui-media-body">' + item.real_name + ' <small class="text-999">' + item.department_name + '</small><p>签到：<span class="' + (item.start_error==1?"text-danger":"text-333") + '">' + item.start_check_in_time+ '</span></p><p>签退：<span class="' + (item.end_error==1?"text-danger":"text-333") + '">' + item.end_check_in_time + '</span></p></div></a></li>'
								queQinKuangGongNum++; 
							}
						})
						if(kaoQinJiLuHtml!='')
							document.getElementById('kao-qin-ji-lu').innerHTML = kaoQinJiLuHtml;						
						if(chiDaoZaoTuiHtml!='')
							document.getElementById('chi-dao-zao-tui').innerHTML = chiDaoZaoTuiHtml;
						if(queQinKuangGongHtml!='')
							document.getElementById('que-qin-kuang-gong').innerHTML = queQinKuangGongHtml;
							
						document.getElementById('kao-qin-ji-lu-num').innerHTML = kaoQinJiLuNum;
						document.getElementById('chi-dao-zao-tui-num').innerHTML = chiDaoZaoTuiNum;
						document.getElementById('que-qin-kuang-gong-num').innerHTML = queQinKuangGongNum;
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
			
			//链接
			mui('.mui-table-view').on('tap', 'a', function() {
				var href = this.getAttribute('href');
					var employeeId = this.getAttribute('employee-id');
				mui.openWindow({
					url: href + '.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},
					extras:{
						"employeeId":employeeId
					},
					waiting: {
						autoShow: false,
						title: '玩命加载中...'
					},

				})
				return false;
			})
		})