mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {
			document.getElementById('title').innerHTML = plus.webview.currentWebview().intItem + '分配明细';
			var getInfoData = {
				"token":plus.storage.getItem('token'),
				"dis_int_id":plus.webview.currentWebview().disIntId
			}
			
			
			mui.ajax(apiUrl + 'cmpint/month_detail_list', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					var mingxiListHtml = '';
					if(data.status  == 1){
						mui.each(data.data,function(index,item){
							mingxiListHtml += '<li class="mui-table-view-cell">' + item.real_name + ' <span class="mui-badge mui-badge-danger mui-badge-inverted">' + item.int + '(元)</span></li>';
						})
						if(mingxiListHtml!='')
							document.getElementById('xiangmu-mingxi-list').innerHTML = mingxiListHtml;
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
					mui.alert("参数错误：" + typeinfo);
				}
			});
		})