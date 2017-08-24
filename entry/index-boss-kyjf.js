mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {
			
			//可用积分
			var getIntData = {
				token:plus.storage.getItem('token')
			}
			mui.ajax(apiUrl +  'cmpint/int_num' , {
					data: getIntData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						console.log(data)
						var data = JSON.parse(data);
						if(data.status==1){
							document.getElementById('ke-yong-ji-fen').innerHTML = data.data.already_int;
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
			
			 
			mui('.mui-media').on('tap','a', function(e) {
				
				var href = this.getAttribute('href');				

				if(href == 'select-tongshi'){
					var haveIntNum = document.getElementById('ke-yong-ji-fen').innerHTML;				
				}
				
				mui.openWindow({
					url: href+'.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},
					extras:{
						'haveIntNum':haveIntNum,
						'isJifen': 1
					},
					waiting: {
						autoShow: true,
						title: '拼命加载中...'
					},
				})				
			})

		})