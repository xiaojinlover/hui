!function(e){function t(a){if(n[a])return n[a].exports;var u=n[a]={i:a,l:!1,exports:{}};return e[a].call(u.exports,u,u.exports,t),u.l=!0,u.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=73)}({73:function(e,t){mui.init({swipeBack:!0}),mui.plusReady(function(){var e=plus.webview.currentWebview(),t=e.dataId,n=e.dataValue,a=e.dataTitle;document.getElementById("title").innerHTML=a,document.getElementsByTagName("form")[0].dataValue.value=n,document.getElementById("update-info").addEventListener("tap",function(){var e=document.getElementsByTagName("form")[0].dataValue.value,n='{"token":"'+plus.storage.getItem("token")+'","'+t+'":"'+e+'"}';n=JSON.parse(n),mui.ajax(apiUrl+"app/update_user_info",{data:n,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);if(1==e.status)return document.getElementsByTagName("form")[0].dataValue.blur(),mui.alert(e.detail),!1;mui.alert(e.detail)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){"abort"==t?mui.alert("连接不到网络，请检查您当前的网络设置"):mui.alert("参数错误"+t)}})})})}});