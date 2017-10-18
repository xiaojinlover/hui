mui.init({
			swipeBack: true //启用右滑关闭功能  
		});
		mui.plusReady(function() {
			var getInfoData = {
				"token":plus.storage.getItem('token')
			}
			mui.ajax(apiUrl + 'Wage/wage_list', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {					 
					var data = JSON.parse(data);
					if(data.status == 1) {	
						var gongziListHtml = '';
						mui.each(data.data,function(index,item){
							if(item.if_extend!=0) 
								gongziListHtml += '<li class="mui-table-view-cell"><a class="mui-navigate-right" href="setting-gzt-detail" data-id="' + item.users_wage_int_id + '"><div class="text-666 size14">实发工资:' + item.int + '</div><div class="mui-badge mui-badge-inverted size14">' + item.time +  '</div></a></li>';
						})
						if(gongziListHtml!='')
							document.getElementById('gong-zi-list').innerHTML = gongziListHtml;
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
			
			mui('.mui-table-view').on('tap','a', function(e) {
				var href = this.getAttribute('href'); 
				var wageId = this.getAttribute('data-id');
				
				mui.openWindow({
					url: href + '.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},
					extras:{
						wageId:wageId
					},
					waiting: {
						autoShow: true,
						title: '拼命加载中...'
					},

				})				
			})
		})