!function(e){function t(n){if(i[n])return i[n].exports;var a=i[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var i={};t.m=e,t.c=i,t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=18)}({18:function(e,t){mui.init({swipeBack:!0}),mui.plusReady(function(){var e=plus.webview.currentWebview(),t=e.departmentId,i={token:plus.storage.getItem("token"),department_id:t};mui.ajax(apiUrl+"boss/department_wage_info",{data:i,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e),t="";if(1==e.status){var i=e.data.small_month,n=e.data.big_month;mui.each(e.data.depa.employee,function(e,a){t+='<li class="mui-table-view-cell"><div class="mui-pull-left title">'+(""!=a.real_name?a.real_name:"暂无")+"<p>"+(""!=a.zhi_wei?a.zhi_wei:"暂无")+'</p></div><div class="mui-pull-left"><p>'+i+"月："+a.shi_fa_he_ji[i]+"</p><p>"+n+"月："+a.shi_fa_he_ji[n]+'</p></div><span class="mui-badge">'+(a.shi_fa_he_ji[n]-a.shi_fa_he_ji[i]).toFixed(2)+"</span></li>"})}document.getElementById("detail-list").innerHTML=t},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){"abort"==t?mui.alert("连接不到网络，请检查您当前的网络设置"):mui.alert("参数错误"+t)}})})}});