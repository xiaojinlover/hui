!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=67)}({67:function(e,t){mui.init({swipeBack:!0}),mui.plusReady(function(){var e=plus.webview.currentWebview().noticeId,t={token:plus.storage.getItem("token"),notice_type:2,notice_id:e};mui.ajax(apiUrl+"employee/notice",{data:t,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);if(1==e.status&&""!=e.data){document.getElementById("title").innerHTML=e.data.title;plus.downloader.createDownload(e.data.doc_url,{},function(e,t){200==t?plus.runtime.openFile(e.filename):alert("下载失败: "+t)}).start()}},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){"abort"==t?mui.alert("连接不到网络，请检查您当前的网络设置"):mui.alert("参数错误"+t)}})})}});