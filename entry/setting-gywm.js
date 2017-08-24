mui.init({
			swipeBack: true //启用右滑关闭功能

		});
		
		mui.plusReady(function() {
			var zhiweiInfoData = {
				"token":plus.storage.getItem('token')
			}
			
			
		//链接
		mui('.mui-table-view-cell-sub').on('tap', 'a', function(e) {

			var href = this.getAttribute('href');
			if(href=='tel'){
                plus.device.dial('4006266650', false);
                return false;
			}
			if(href=='#'){
				if(plus.os.name=='iOS'){
					var UIPasteboard  = plus.ios.importClass("UIPasteboard");					
					var generalPasteboard = UIPasteboard.generalPasteboard();					
					generalPasteboard.setValueforPasteboardType("huirenshiyun", "public.utf8-plain-text");
					var value = generalPasteboard.valueForPasteboardType("public.utf8-plain-text");
					mui.alert('已复制公众号账号，请打开微信进行粘贴！')
				}else{
					var Context = plus.android.importClass("android.content.Context");
					var main = plus.android.runtimeMainActivity();
					var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
					plus.android.invoke(clip,"setText","huirenshiyun");
					mui.alert('已复制公众号账号，请打开微信进行粘贴！'); 
				}
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
	})