!function(t){function e(n){if(i[n])return i[n].exports;var o=i[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=53)}({53:function(t,e){mui.init({swipeBack:!0}),mui.plusReady(function(){var t={token:plus.storage.getItem("token"),notice_type:2,notice_id:"#"};mui.ajax(apiUrl+"employee/notice",{data:t,type:"post",timeout:1e4,success:function(t){console.log(t);var t=JSON.parse(t);if(1==t.status&&""!=t.data){var e="";mui.each(t.data,function(t,i){e+='<li class="mui-table-view-cell mui-media"><a doc-url="'+i.doc_url+'" href="setting-gzzd-detail" data-id="'+i.id+'" class="mui-navigate-right"><div class="mui-media-body"><i class="icon iconfont icon-iconfonticon text-999"></i>  '+i.title+'<p class="mui-ellipsis">'+i.add_time+"</p></div></a></li>"}),document.getElementById("gonggao-list").innerHTML=e}},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(t,e){mui.alert("参数错误："+e)}}),mui(document).on("tap","a",function(){var t=this.getAttribute("doc-url");plus.nativeUI.showWaiting("文件加载中...");var e=plus.downloader.createDownload(t,{},function(t,e){200==e?(plus.nativeUI.closeWaiting(),plus.runtime.openFile(t.filename)):(plus.nativeUI.closeWaiting(),mui.alert("文件下载失败: "+e))});null!=e&&e.start()})})}});