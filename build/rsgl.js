!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=44)}({44:function(e,t){mui.init({swipeBack:!0}),mui.plusReady(function(){var e={token:plus.storage.getItem("token")};mui.ajax(apiUrl+"hr/manage_list",{data:e,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);1==e.status&&(document.getElementById("rlzsh-num").innerHTML=e.data.join_leave_num,0!=e.data.join_leave_num&&(document.getElementById("rlzsh-num").style.display="none"),document.getElementById("fxyj-num").innerHTML=e.data.feng_xian_num,0==e.data.feng_xian_num&&(document.getElementById("fxyj-num").style.display="none"))},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){mui.alert("参数错误："+t)}}),mui(".mui-table-view").on("tap","a",function(){var e=this.getAttribute("href");mui.openWindow({url:e+".html",id:e,createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!1,title:"玩命加载中..."}})})})}});