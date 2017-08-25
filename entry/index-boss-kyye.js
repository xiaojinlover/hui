mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {
			
			//可用余额
			var getIntData = {
				token:plus.storage.getItem('token')
			}
			mui.ajax(apiUrl +  'cmpint/int_num' , {
					data: getIntData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						
						var data = JSON.parse(data);
						if(data.status==1){
							document.getElementById('ke-yong-yu-e').innerHTML = data.data.int_num;
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
				
				if(href=="score-tixian"||href == "zhongda-chongzhi-boss"){
					mui.alert('开发中，敬请期待');
					return false;
//					var haveIntNum = document.getElementById('ke-yong-yu-e').innerHTML;
				}
				if(href == 'select-tongshi'){
					var haveIntNum = document.getElementById('ke-yong-yu-e').innerHTML;				
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
						'haveIntNum':haveIntNum
					},
					waiting: {
						autoShow: true,
						title: '拼命加载中...'
					},
				})				
			})
			mui('.mui-bar-nav').on('tap','.mui-btn-link', function(e) {				
				var href = this.getAttribute('href');				
				mui.openWindow({
					url: href+'.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},					
					waiting: {
						autoShow: true,
						title: '拼命加载中...'
					},
				})
				
			})
		})