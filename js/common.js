var h5pullDown = true;
var apiUrl = "http://newtest.huirenshi.com/v2/";
//打开窗口函數
function _openWindow(url) {
	mui.openWindow({
		url: url + '.html',
		id: url,
		createNew: true,
		show: {
			autoShow: true,
			aniShow: 'slider-in-right',
			duration: 200
		},
		waiting: {
			autoShow: true,
			title: '玩命加载中...'
		}
	})
}

//删除数组元素
function removeByValue(arr, val) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == val) {
			arr.splice(i, 1);
			break;
		}
	}
}

//判断IOS或Andriod
function isAndroidIos() {
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	var isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	if(isAndroid) {
		return 'isAndroid';
	} else if(isIos) {
		return 'isIos';
	}
}

//html转义
function html_decode(str) {
	var s = "";
	if(str.length == 0) return "";
	s = str.replace(/&amp;/g, "&");
	s = s.replace(/&lt;/g, "<");
	s = s.replace(/&gt;/g, ">");
	s = s.replace(/&nbsp;/g, " ");
	s = s.replace(/&#39;/g, "\'");
	s = s.replace(/&quot;/g, "\"");
	s = s.replace(/<br\/>/g, "\n");
	return s;
}

function html_clean(str) {
	var s = "";
	if(str.length == 0) return "";
	s = str.replace(/&amp;nbsp;/g, "");
	s = s.replace(/&lt;(.*?)&gt;/g, "");
	return s;
}

mui.plusReady(function() {
	//系统状态栏
//              alert(plus.navigator.isImmersedStatusbar())
//    plus.navigator.setStatusBarBackground("#f2595e");
//    plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
//        alert(plus.navigator.getStatusbarHeight())
	//	alert(plus.webview.getWebviewById('login'))
	//判断登录状态(通过Token,去除不需要判断的页面)
	var username = plus.storage.getItem("username");
	var password = plus.storage.getItem("password");
	var token = plus.storage.getItem('token');
	var _currentUrl = plus.webview.currentWebview().getURL();
	if((plus.webview.currentWebview().id == 'login' || plus.webview.currentWebview().id == 'HBuilder') && token != null) {
		return false;
	}

	if(token == null && _currentUrl.indexOf("login.html") < 0 && _currentUrl.indexOf("qiye-zhuce-step03.html") < 0 && _currentUrl.indexOf("setting-shezhi-yhxy.html") < 0 && _currentUrl.indexOf("qiye-zhuce-step02.html") < 0 && _currentUrl.indexOf("register.html") < 0 && _currentUrl.indexOf("findpsw.html") < 0 && _currentUrl.indexOf("resetpsw.html") < 0 && _currentUrl.indexOf("qiye-zhuce-step01.html") < 0) {
		if(plus.webview.getWebviewById('login') != null)
			createNew = false;
		else
			createNew = true;
		mui.openWindow({
			url: 'login.html',
			id: 'login',
			createNew: createNew,
			show: {
				autoShow: true,
				aniShow: 'slider-in-right',
				duration: 200
			},
			waiting: {
				autoShow: false
			}
		})
	}

	plus.webview.currentWebview().setStyle( {statusbar:{background:'#fff'},top:-plus.navigator.getStatusbarHeight(),bottom: 0} );
})

(function(w) {
		document.addEventListener('plusready', function() {
                                 
	//		console.log("Immersed-UserAgent: " + navigator.userAgent);
		}, false);
	
		var immersed = 0;
		var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
		if(ms && ms.length >= 3) {
			immersed = parseFloat(ms[2]);
		}
		w.immersed = immersed;
	
		if(!immersed) {
			return;
		}
		var t = document.getElementsByTagName('header')[0];
		//t&&(t.style.paddingTop=immersed+'px',t.style.background='-webkit-linear-gradient(top,rgba(215,75,40,1),rgba(215,75,40,0.8))',t.style.color='#FFF');
		t && (t.style.paddingTop = immersed + 'px', t.style.background = '#f2595e', t.style.color = '#259cef');
 t = document.getElementById('content');
 t && (t.style.marginTop = immersed + 'px');
 t = document.getElementById('scontent');
 t && (t.style.marginTop = immersed + 'px');
 t = document.getElementById('dcontent');
 t && (t.style.marginTop = immersed + 'px');
 t = document.getElementById('map');
 t && (t.style.marginTop = immersed + 'px');
	
	})(window);
