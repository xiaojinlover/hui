mui.init({
			swipeBack: true, //启用右滑关闭功能  
		});
		mui.plusReady(function() {
			var tongjiData = {
				"token":plus.storage.getItem('token')
			}
			
			mui.ajax(apiUrl +  'Boss/employee_list', {
				data: tongjiData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					if(data.status!=0){
						var headerInfo = '<div class="mui-col-xs-12">' + data.data.all_num + '<p>职员总数</p></div><div class="mui-col-xs-4">' + data.data.ru_zhi_num + '<p>本月入职</p></div><div class="mui-col-xs-4">' + data.data.li_zhi_num + '<p>本月离职</p></div><div class="mui-col-xs-4">' + data.data.li_zhi_lv + '<p>本月离职率</p></div>';
						document.getElementById('header-info').innerHTML = headerInfo;
						if(data.data.employee_list!=''){
							var yuanGongTongJiListHtml = '';
							mui.each(data.data.employee_list,function(index,item){
								if(item.li_zhi_shi_jian == null){								
									yuanGongTongJiListHtml += '<li class="mui-table-view-cell mui-media"><img class="mui-media-object mui-pull-left" src="' + (!!item.users_image?item.users_image:"images/logo-white.png") + '"><div class="mui-media-body">' + item.real_name + ' <small class="text-999">' + item.department_name + '</small><p>时间：<span class="text-333">' + item.set_time + '</span></p><p>状态：<span class="text-blue">入职</span></p></div></li>';
								}else{
									yuanGongTongJiListHtml += '<li class="mui-table-view-cell mui-media"><img class="mui-media-object mui-pull-left" src="' + (!!item.users_image?item.users_image:"images/logo-white.png") + '"><div class="mui-media-body">' + item.real_name + ' <small class="text-999">' + item.department_name + '</small><p>时间：<span class="text-333">' + item.set_time + '</span></p><p>状态：<span class="text-danger">离职</span></p></div></li>';
								}
							})
							document.getElementById('yuan-gong-tong-ji-list').innerHTML = yuanGongTongJiListHtml;
						}
						
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