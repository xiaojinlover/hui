!function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=16)}({16:function(t,e){mui.init({swipeBack:!0}),mui.plusReady(function(){var t={token:plus.storage.getItem("token")};mui.ajax(apiUrl+"cmpint/int_num",{data:t,type:"post",timeout:1e4,success:function(t){var t=JSON.parse(t);1==t.status&&(document.getElementById("ke-yong-yu-e").innerHTML=t.data.int_num)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(t,e){mui.alert("参数错误："+e)}}),mui(".mui-media").on("tap","a",function(t){var e=this.getAttribute("href");if("score-tixian"==e||"zhongda-chongzhi-boss"==e)return mui.alert("开发中，敬请期待"),!1;if("select-tongshi"==e)var n=document.getElementById("ke-yong-yu-e").innerHTML;mui.openWindow({url:e+".html",id:e,createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},extras:{haveIntNum:n},waiting:{autoShow:!0,title:"拼命加载中..."}})}),mui(".mui-bar-nav").on("tap",".mui-btn-link",function(t){var e=this.getAttribute("href");mui.openWindow({url:e+".html",id:e,createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!0,title:"拼命加载中..."}})})})}});