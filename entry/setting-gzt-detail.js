mui.init({
			swipeBack: true //启用右滑关闭功能  
		});
		mui.plusReady(function() {
			var wageId = plus.webview.currentWebview().wageId;
			var getInfoData = {
				"token":plus.storage.getItem('token'),
				"wage_int_id":wageId
			}
			mui.ajax(apiUrl + 'Wage/wage_detail', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {					
					var data = JSON.parse(data);
					if(data.status == 1) {	
						var gongziDetailHtml = '';
						mui.each(data.data.list,function(index,item){ 							
								gongziDetailHtml += '<li class="mui-table-view-cell size14 text-666">' + index + ' <span class="mui-badge mui-badge-inverted mui-badge-warning size14">' + item + '</span></li> ';
						})  
						if(gongziDetailHtml!='')
							document.getElementById('gong-zi-list').innerHTML = gongziDetailHtml;
					}else{
						mui.toast(data.detail);
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
					if(typeinfo=='abort'){
						mui.alert('连接不到网络，请检查您当前的网络设置');
					}else{
						mui.alert('参数错误' + typeinfo);
					}
				}
			});
			
			
		})