!function(e){function t(a){if(n[a])return n[a].exports;var i=n[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}({3:function(e,t){function n(){setTimeout(function(){(new a).getData(),mui("#pullrefresh").pullRefresh().endPulldownToRefresh()},800)}mui.init({pullRefresh:{container:"#pullrefresh",down:{callback:n,auto:!0}}});var a=function(){};mui.plusReady(function(){null!=plus.webview.currentWebview().opener()&&"HBuilder"!=plus.webview.currentWebview().opener().id&&plus.webview.currentWebview().opener().close(),document.activeElement.blur(),a.prototype.getData=function(){var e={token:plus.storage.getItem("token")};mui.ajax(apiUrl+"Boss/index",{data:e,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);1==e.status&&(1==e.data.if_daifa&&(document.getElementById("dai-fa").className="score-detail-wrap"),document.getElementById("jrkq").innerHTML=e.data.kao_qin_num,document.getElementById("jrjq").innerHTML=e.data.jia_qin_num,document.getElementById("byyd").innerHTML=e.data.yi_dong,plus.storage.setItem("users_image",null!=e.data.users_image?e.data.users_image:"images/test-head.png"),document.getElementById("users-head").setAttribute("src",plus.storage.getItem("users_image")),plus.storage.setItem("companyname",e.data.company_name),document.getElementById("title").innerHTML=plus.storage.getItem("companyname"),document.getElementById("gerenInfo").innerHTML=null!=e.data.users_name?e.data.users_name:"暂无",e.data.platform&&(plus.storage.setItem("platform",JSON.stringify(e.data.platform)),plus.storage.setItem("if_reg",e.data.platform[0].if_reg.toString())),""!=e.data.wage_int&&(document.getElementById("ben-yue-chong-zhi").innerHTML=e.data.wage_int.month_in,document.getElementById("ke-yong-yu-e").innerHTML=e.data.wage_int.total_int,document.getElementById("ben-yue-shi-yong").innerHTML=e.data.wage_int.already_int))},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...",{background:"rgba(0,0,0,0.5)"})},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){"abort"==t?mui.alert("连接不到网络，请检查您当前的网络设置"):mui.alert("参数错误"+t)}})},mui(".mui-bar-tab").on("tap","a",function(){var e=this.getAttribute("href");"index"==e&&1==plus.storage.getItem("if_company")?e="index-boss":"index"==e&&1!=plus.storage.getItem("if_company")&&(e="index"),mui.openWindow({url:e+".html",id:e,createNew:!1,show:{autoShow:!0,aniShow:!1},waiting:{autoShow:!0,title:"玩命加载中..."}})}),mui(".mui-table-view").on("tap","a",function(){var e=this.getAttribute("href");return("setting-zwxx"!=e||"0"!=plus.storage.getItem("role"))&&("shop"==e?(e="1"==plus.storage.getItem("if_reg")?"shop":"authorize-login",mui.openWindow({url:e+".html",id:e,createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!1,title:"玩命加载中..."}}),!1):void mui.openWindow({url:e+".html",id:e,createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!1,title:"玩命加载中..."}}))}),mui(".mui-row").on("tap","a",function(){var e=this.getAttribute("href");if("index-boss-kyye"==e)var t=document.getElementById("ke-yong-yu-e").innerHTML;return mui.openWindow({url:e+".html",id:e,createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},extras:{int:t},waiting:{autoShow:!1,title:"玩命加载中..."}}),!1})})}});