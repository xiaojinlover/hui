!function(t){function e(o){if(n[o])return n[o].exports;var u=n[o]={i:o,l:!1,exports:{}};return t[o].call(u.exports,u,u.exports,e),u.l=!0,u.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=78)}({78:function(t,e){mui.init(),mui.plusReady(function(){mui(document).on("tap","#submit",function(){var t=document.forms[0];if(""==t.content.value)return mui.toast("请输入您的问题和意见！"),!1;var e={token:plus.storage.getItem("token"),contact:t.contact.value,content:t.content.value};mui.ajax(apiUrl+"Employee/feedback",{data:e,type:"post",timeout:1e4,success:function(t){var t=JSON.parse(t);0!=t.status&&mui.alert(t.detail)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...",{background:"rgba(0,0,0,0.4)"})},complete:function(){plus.nativeUI.closeWaiting()},error:function(t,e){"abort"==e?mui.alert("连接不到网络，请检查您当前的网络设置"):mui.alert("参数错误"+e)}})})})}});