!function(t){function e(n){if(i[n])return i[n].exports;var r=i[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=40)}({40:function(t,e){mui.init({swipeBack:!0}),mui.plusReady(function(){var t={token:plus.storage.getItem("token")};mui.ajax(apiUrl+"App/users_family",{data:t,type:"post",timeout:1e4,success:function(t){var t=JSON.parse(t);if(""!=t.data){var e="";mui.each(t.data,function(t,i){e+='<li class="mui-table-view-cell mui-media"><a users_family_id="'+i.users_family_id+'" telephone="'+i.telephone+'" work_organize="'+i.work_organize+'" birthmonth="'+i.birthmonth+'" relation="'+i.relation+'" name="'+i.name+'" href="ruzhi-wdll-jtbj-add" class="mui-navigate-right"><div class="mui-media-body">'+i.name+'<p class="mui-ellipsis">'+i.relation+"</p></div></a></li>"}),document.getElementById("jia-ting-bei-jing-list").innerHTML=e}},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(t,e){mui.alert("参数错误："+e)}}),mui(".mui-table-view").on("tap","a",function(t){var e=this.getAttribute("href"),i=null!=this.getAttribute("users_family_id")?this.getAttribute("users_family_id"):"",n=this.getAttribute("name"),r=this.getAttribute("relation"),o=this.getAttribute("birthmonth"),a=this.getAttribute("work_organize"),u=this.getAttribute("telephone");mui.openWindow({url:e+".html",id:e,createNew:!0,show:{autoShow:!0,aniShow:"slide-in-bottom"},extras:{usersFamilyId:i,name:n,relation:r,birthmonth:o,work_organize:a,telephone:u},waiting:{autoShow:!1,title:"拼命加载中..."}})}),"待入职"==plus.storage.getItem("ruzhi-status")?(document.getElementById("next-step").innerHTML="下一步：完善自我评价",document.getElementById("next-step").setAttribute("href","ruzhi-wdll-zwpj")):(document.getElementById("next-step").innerHTML="下一步：选择公司",document.getElementById("next-step").setAttribute("href","li-ji-ru-zhi")),mui(".mui-content-padded").on("tap","a",function(){var t=this.getAttribute("href");return mui.openWindow({url:t+".html",id:t,createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!0,title:"玩命加载中..."}}),!1})})}});