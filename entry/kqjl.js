mui.init({
			swipeBack: true //启用右滑关闭功能  

		});
		mui.plusReady(function() {
			var param = plus.webview.currentWebview().param;
			
			if(param == 'if_chidaozaotui'||param == 'if_kuanggongqueqing'){
				document.getElementById('da-ka-ji-lu').setAttribute('class','mui-control-item ');
				document.getElementById('yi-chang-ji-lu').setAttribute('class','mui-control-item mui-active');
				document.getElementById('item1').setAttribute('class','mui-control-content');
				document.getElementById('item2').setAttribute('class','mui-control-content mui-active');
			}
				
			var kaoqinData = {
					"token": plus.storage.getItem('token'),
					"type": 1
				}
			//打卡记录
			mui.ajax(apiUrl +  'Employee/record', {
				data: kaoqinData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					console.log(data)
					var data = JSON.parse(data);
					
					if(data.status == 1) {
						var jiaqinListHtml = '';
						var jiaqinYichangListHtml = '';
						var chidaoZaotuiListHtml = '';
						var kuanggongQueqinListHtml = '';
						mui.each(data.data,function(index,item){
							jiaqinListHtml += '<li class="mui-table-view-cell text-333">' + item.month_day + '（' + item.week + '）</li><li class="mui-table-view-cell"><p>签到 ：<span class="' + (item.start_error==1?"text-danger":"text-333") + '">' + item.start_check_in_time + '</span></p><p>签退 ：<span class="' + (item.end_error==1?"text-danger":"text-333") + '">' + item.end_check_in_time + '</span></p></li>';
							
							if(item.end_error==1||item.start_error==1){
								
								jiaqinYichangListHtml += '<li class="mui-table-view-cell text-333">' + item.month_day + '（' + item.week + '）</li><li class="mui-table-view-cell"><p>签到 ：<span class="' + (item.start_error==1?"text-danger":"text-333") + '">' + item.start_check_in_time + '</span></p><p>签退 ：<span class="' + (item.end_error==1?"text-danger":"text-333") + '">' + item.end_check_in_time + '</span></p></li>';
							}
							if(param == 'if_chidaozaotui'&&(item.if_late==1||item.if_early==1)){
								
								chidaoZaotuiListHtml += '<li class="mui-table-view-cell text-333">' + item.month_day + '（' + item.week + '）</li><li class="mui-table-view-cell"><p>签到 ：<span class="' + (item.start_error==1?"text-danger":"text-333") + '">' + item.start_check_in_time + '</span></p><p>签退 ：<span class="' + (item.end_error==1?"text-danger":"text-333") + '">' + item.end_check_in_time + '</span></p></li>';
							
							}
							if(param == 'if_kuanggongqueqing'&&(item.if_queqin==1||item.if_kuanggong==1)){
								
								kuanggongQueqinListHtml += '<li class="mui-table-view-cell text-333">' + item.month_day + '（' + item.week + '）</li><li class="mui-table-view-cell"><p>签到 ：<span class="' + (item.start_error==1?"text-danger":"text-333") + '">' + item.start_check_in_time + '</span></p><p>签退 ：<span class="' + (item.end_error==1?"text-danger":"text-333") + '">' + item.end_check_in_time + '</span></p></li>';
							
							}
						})
						 
						if(jiaqinListHtml!='')
							document.getElementById('jiaqin-list').innerHTML = jiaqinListHtml;
						if(jiaqinYichangListHtml!='' && param != 'if_chidaozaotui' && param != 'if_kuanggongqueqing')
							document.getElementById('jiaqin-yichang-list').innerHTML = jiaqinYichangListHtml;
						else if(chidaoZaotuiListHtml!='' && param == 'if_chidaozaotui')
							document.getElementById('jiaqin-yichang-list').innerHTML = chidaoZaotuiListHtml;
						else if(kuanggongQueqinListHtml!='' && param == 'if_kuanggongqueqing')
							document.getElementById('jiaqin-yichang-list').innerHTML = kuanggongQueqinListHtml;
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