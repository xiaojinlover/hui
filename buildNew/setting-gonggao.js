!function(t){function e(n){if(i[n])return i[n].exports;var o=i[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=50)}({50:function(t,e){mui.init({swipeBack:!0}),mui.plusReady(function(){var t={token:plus.storage.getItem("token"),notice_type:1,notice_id:"#"};mui.ajax(apiUrl+"employee/notice_new",{data:t,type:"post",timeout:1e4,success:function(t){var t=JSON.parse(t);if(1==t.status&&""!=t.data){var e="";mui.each(t.data,function(t,i){e+='<li class="mui-table-view-cell mui-media"><a class="mui-navigate-right" data-id="'+i.id+'" href="setting-gonggao-detail"><div class="mui-media-body"><i class="icon iconfont icon-gonggao text-999"></i> '+i.title+'<p class="mui-ellipsis">'+i.add_time+"</p></div></a></li>"}),document.getElementById("gonggao-list").innerHTML=e}},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(t,e){mui.alert("参数错误："+e)}}),mui(document).on("tap","a",function(){var t=this.getAttribute("data-id"),e=this.getAttribute("href");mui.openWindow({url:e+".html",id:e,createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},extras:{noticeId:t},waiting:{autoShow:!1,title:"玩命加载中..."}})})})}});