!function(e){function t(i){if(n[i])return n[i].exports;var a=n[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=46)}({46:function(e,t){mui.init({swipeBack:!0}),mui.plusReady(function(){var e=plus.webview.currentWebview().wageId,t={token:plus.storage.getItem("token"),wage_int_id:e};mui.ajax(apiUrl+"Wage/wage_detail",{data:t,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);if(1==e.status){var t="";mui.each(e.data.list,function(e,n){t+='<li class="mui-table-view-cell size14 text-666">'+e+' <span class="mui-badge mui-badge-inverted mui-badge-warning size14">'+n+"</span></li> "}),""!=t&&(document.getElementById("gong-zi-list").innerHTML=t)}else mui.toast(e.detail)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...",{background:"rgba(0,0,0,0.5)"})},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){"abort"==t?mui.alert("连接不到网络，请检查您当前的网络设置"):mui.alert("参数错误"+t)}})})}});