!function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}({8:function(t,e){mui.init({swipeBack:!0}),mui.plusReady(function(){var t={token:plus.storage.getItem("token")};mui.ajax(apiUrl+"app/get_company_list",{data:t,type:"post",timeout:1e4,success:function(t){var t=JSON.parse(t);if(""!=t.data){var e=t.data;$("#nope").trigger("onkeyup"),$("#nope").autocompleter({highlightMatches:!0,source:e,template:"{{ label }} ",hint:!0,matchContains:!0,empty:!1,limit:5,callback:function(t,e,n){n&&($(".icon").css("background-color",n.hex),$("#cmp_id").val(n.company_id))}}),$("input").bind("input propertychange",function(){$("input").trigger("keyup")})}else mui.alert(t.detail)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(t,e){mui.alert("参数错误："+e)}}),mui(document).on("tap","#li-ji-ru-zhi",function(){var t=document.getElementsByTagName("form")[0].company_id.value,e={token:plus.storage.getItem("token"),company_id:t};mui.ajax(apiUrl+"app/join_company",{data:e,type:"post",timeout:1e4,success:function(t){var t=JSON.parse(t);1==t.status?(plus.storage.setItem("role","1"),document.activeElement.blur(),mui.openWindow({url:"ruzhi-wdll-zwpj.html",id:"ruzhi-wdll-zwpj",createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!0,title:"玩命加载中..."}})):mui.alert(t.detail)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(t,e){mui.alert("参数错误："+e)}})})})}});