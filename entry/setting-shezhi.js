mui.init({
			swipeBack: true //启用右滑关闭功能

		});
		mui.plusReady(function() {
			//链接
			mui('.mui-table-view-cell').on('tap', 'a', function(e) {
				
				var href = this.getAttribute('href');
				if(href=='qing-chu-huan-cun'){
					 plus.cache.clear( function () {
						mui.alert( "缓存清除成功！" );
					});
					 return false;
				}
				mui.openWindow({
					url: href + '.html',
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
			//退出
			mui('.mui-content-padded').on('tap','#btn-login-out',function(){
//				var setting = plus.webview.getWebviewById('setting');
//				var address = plus.webview.getWebviewById('address');
//				var index = plus.webview.getWebviewById('index');
//				var settingshezhi = plus.webview.getWebviewById('setting-shezhi');
//				var indexboss = plus.webview.getWebviewById('index-boss');
//				if(setting!=null)
//					plus.webview.close(setting);
//				if(address!=null)
//					plus.webview.close(address);
//				if(index!=null)
//					plus.webview.close(index);
//				if(settingshezhi!=null)
//					plus.webview.close(settingshezhi);
//				if(indexboss!=null)
//					plus.webview.close(indexboss);				
				

		        var all = plus.webview.all(); 
		        var current = plus.webview.currentWebview().id; 
		        for(var i=0,len=all.length;i<len;i++){ 
		            if(all[i].id!==current){ 
		                all[i].close(); 
		            } 
		        } 
				
				plus.storage.clear(); 
				mui.openWindow({
					url: 'login.html',
					id: 'login',
					createNew: true,
					show: {
						autoShow: true,
						aniShow: false
					},
					waiting: {
						autoShow: false,
						title: '退出成功...'
					},

				})
			})
		})