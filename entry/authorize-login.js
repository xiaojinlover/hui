mui.plusReady(function() {
			
//			mui(document).on('tap','#btn-authorize',function(){
//			
//				var fengXianData = {
//					"token":plus.storage.getItem('token'),
//					"key":JSON.parse(plus.storage.getItem('platform'))[0].key
//				}
//
//				mui.ajax(apiUrl +  'zhongda/register', {
//					data: fengXianData,
//					type: 'post',
//					timeout: 10000,
//					success: function(data) {
//						
//						var data = JSON.parse(data);
//						if(data.status==1){
//							plus.storage.setItem('if_reg','1');
//							mui.openWindow({
//								url: 'shop.html',
//								id: 'shop',
//								createNew: true,
//								show: {
//									autoShow: true,
//									aniShow: "slide-in-right"
//								},
//								waiting: {
//									autoShow: true,
//									title: '拼命加载中...'
//								},					
//							})
//						}else{
//							
//							mui.alert(data.detail,function(){
//								if(data.detail=='已绑定'){
//									mui.openWindow({
//										url: 'shop.html',
//										id: 'shop',
//										createNew: true,
//										show: {
//											autoShow: true,
//											aniShow: "slide-in-right"
//										},
//										waiting: {
//											autoShow: true,
//											title: '拼命加载中...'
//										},					
//									})
//								}
//							});
//						}
//					},
//					beforeSend: function() {
//						plus.nativeUI.showWaiting("授权中...", {
//							background: "rgba(0,0,0,0.4)"
//						});
//					},
//					complete: function() {
//						plus.nativeUI.closeWaiting();
//					},
//					error: function(xhr, typeinfo) {
//						mui.alert("参数错误：" + typeinfo);
//					}
//				});
//			})
	
	
	
	mui.openWindow({
		url: 'shop.html',
		id: 'shop',
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