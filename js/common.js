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
  for(var i=0; i<arr.length; i++) {
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
	plus.navigator.setStatusBarBackground("#259cf0");
	plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
//	alert(plus.webview.getWebviewById('login'))
	//判断登录状态(通过Token,去除不需要判断的页面)
	var username = plus.storage.getItem("username");
	var password = plus.storage.getItem("password");
	var token = plus.storage.getItem('token');
	var _currentUrl = plus.webview.currentWebview().getURL();
	if((plus.webview.currentWebview().id=='login'||plus.webview.currentWebview().id=='HBuilder')&&token != null){
		return false; 
	}	
	
	if(token == null && _currentUrl.indexOf("login.html") < 0 && _currentUrl.indexOf("qiye-zhuce-step03.html") < 0 && _currentUrl.indexOf("setting-shezhi-yhxy.html") < 0 && _currentUrl.indexOf("qiye-zhuce-step02.html") < 0 && _currentUrl.indexOf("register.html") < 0 && _currentUrl.indexOf("findpsw.html") < 0 && _currentUrl.indexOf("resetpsw.html") < 0 && _currentUrl.indexOf("qiye-zhuce-step01.html") < 0) {
		if(plus.webview.getWebviewById('login')!=null)
			createNew=false;
		else
			createNew=true;
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
})
