!function(e){function t(a){if(n[a])return n[a].exports;var o=n[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=41)}({41:function(e,t){mui.init({swipeBack:!0}),mui.plusReady(function(){var e=plus.webview.currentWebview(),t=e.usersFamilyId,n=e.name,a=e.relation,o=e.birthmonth,i=e.work_organize,u=e.telephone;document.getElementsByTagName("form")[0].name.value=n,document.getElementsByTagName("form")[0].relation.value=a,document.getElementsByTagName("form")[0].birthmonth.value=o,document.getElementsByTagName("form")[0].work_organize.value=i,document.getElementsByTagName("form")[0].telephone.value=u,t&&(document.getElementById("delete-content").innerHTML='<div class="mui-content-padded" ><a class="mui-btn mui-btn-danger mui-btn-block" id="btn-delete" users_family_id="'+t+'"><i class="mui-icon mui-icon-trash"></i>删除</a></div>',mui(document).on("tap","#btn-delete",function(){var e={token:plus.storage.getItem("token"),users_family_id:t};mui.ajax(apiUrl+"App/delete_users_family",{data:e,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);1==e.status?mui.alert(e.detail,function(){plus.webview.currentWebview().opener().reload()}):mui.alert(e.detail)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){mui.alert("参数错误："+t)}})})),mui(document).on("tap","#update-jiao-yu-jing-li",function(){if(""==document.getElementsByTagName("form")[0].name.value||""==document.getElementsByTagName("form")[0].relation.value)return mui.alert("请完善您的信息！"),!1;var e={token:plus.storage.getItem("token"),users_family_id:t,name:document.forms[0].name.value,relation:document.forms[0].relation.value,birthmonth:document.forms[0].birthmonth.value,work_organize:document.forms[0].work_organize.value,telephone:document.forms[0].telephone.value};mui.ajax(apiUrl+"app/update_users_family",{data:e,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);1==e.status?mui.alert(e.detail,function(){plus.webview.currentWebview().opener().reload()}):mui.alert(e.detail)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){mui.alert("参数错误："+t)}})})})}});