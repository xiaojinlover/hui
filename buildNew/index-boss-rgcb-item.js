!function(t){function e(n){if(i[n])return i[n].exports;var a=i[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=15)}({15:function(t,e){mui.init({swipeBack:!0}),mui.plusReady(function(){mui(".mui-table-view").on("tap","a",function(){var t=this.getAttribute("href"),e=this.getAttribute("wage-int-id");return mui.openWindow({url:t+".html",id:t,createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},extras:{wageIntId:e},waiting:{autoShow:!1,title:"玩命加载中..."}}),!1});var t={token:plus.storage.getItem("token"),year_month:plus.webview.currentWebview().wageMouthId};mui.ajax(apiUrl+"cmpint/month_yong_gong_cheng_ben",{data:t,type:"post",timeout:1e4,success:function(t){var t=JSON.parse(t),e="";""!=t.data.have_int_list&&(mui.each(t.data,function(t,i){e+='<li class="mui-table-view-cell"><a class="mui-navigate-right" wage-int-id="'+i.dis_int_id+'" href="index-boss-rgcb-list"><div class="mui-pull-left title text-333" style="width:30%;">'+i.int_item+'</div><div class="mui-pull-left"><p class="text-333">分配人数：'+i.users_num+'人<p/><p class="text-333">人工成本：<span class="text-danger">'+i.dis_int_num+'</span></p></div><div class="mui-badge mui-badge-primary mui-badge-inverted" >'+i.add_date+"</div></a></li>"}),document.getElementById("ren-gong-cheng-ben-list").innerHTML=e)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...",{background:"rgba(0,0,0,0.5)"})},complete:function(){plus.nativeUI.closeWaiting()},error:function(t,e){mui.alert("参数错误："+e)}})})}});