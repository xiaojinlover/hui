!function(t){function e(n){if(o[n])return o[n].exports;var i=o[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var o={};e.m=t,e.c=o,e.d=function(t,o,n){e.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=2)}({2:function(t,e){mui.plusReady(function(){mui(document).on("tap","#btn-authorize",function(){var t={token:plus.storage.getItem("token"),key:JSON.parse(plus.storage.getItem("platform"))[0].key};mui.ajax(apiUrl+"zhongda/register",{data:t,type:"post",timeout:1e4,success:function(t){var t=JSON.parse(t);1==t.status?(plus.storage.setItem("if_reg","1"),mui.openWindow({url:"shop.html",id:"shop",createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!0,title:"拼命加载中..."}})):mui.alert(t.detail,function(){"已绑定"==t.detail&&mui.openWindow({url:"shop.html",id:"shop",createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!0,title:"拼命加载中..."}})})},beforeSend:function(){plus.nativeUI.showWaiting("授权中...",{background:"rgba(0,0,0,0.4)"})},complete:function(){plus.nativeUI.closeWaiting()},error:function(t,e){"abort"==e?mui.alert("连接不到网络，请检查您当前的网络设置"):mui.alert("参数错误"+e)}})})})}});