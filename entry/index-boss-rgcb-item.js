mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {
			//链接
			mui('.mui-table-view').on('tap', 'a', function() {
				var href = this.getAttribute('href');
				var wageIntId = this.getAttribute('wage-int-id');				
				mui.openWindow({
					url: href + '.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},
					extras: {
						"wageIntId": wageIntId
					},
					waiting: {
						autoShow: false,
						title: '玩命加载中...'
					},

				})
				return false;
			})
			
			var getInfoData = {
				"token":plus.storage.getItem('token'),
				'year_month':plus.webview.currentWebview().wageMouthId
			}
			
			mui.ajax(apiUrl + 'cmpint/month_yong_gong_cheng_ben', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					var rengongListHtml = '';
					if(data.data.have_int_list!=''){
						mui.each(data.data,function(index,item){
							rengongListHtml += '<li class="mui-table-view-cell"><a class="mui-navigate-right" wage-int-id="' + item.dis_int_id + '" href="index-boss-rgcb-list"><div class="mui-pull-left title text-333" style="width:30%;">' + item.int_item + '</div><div class="mui-pull-left"><p class="text-333">分配人数：' + item.users_num + '人<p/><p class="text-333">人工成本：<span class="text-danger">' + item.dis_int_num + '</span></p></div><div class="mui-badge mui-badge-primary mui-badge-inverted" >' + item.add_date + '</div></a></li>';
						})
						document.getElementById('ren-gong-cheng-ben-list').innerHTML = rengongListHtml;
						
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