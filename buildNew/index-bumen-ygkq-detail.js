!function(e){function t(a){if(n[a])return n[a].exports;var i=n[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=8)}({8:function(e,t){mui.init({swipeBack:!0}),mui.plusReady(function(){var e={token:plus.storage.getItem("token"),employee_id:plus.webview.currentWebview().employeeId};mui.ajax(apiUrl+"Employee/employee_month_kaoqin",{data:e,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);e.data.employee_info.users_image&&document.getElementById("users-image").setAttribute("src",e.data.employee_info.users_image),document.getElementById("title").innerHTML=e.data.employee_info.real_name;var t="<div>"+e.data.employee_info.real_name+' <small class="text-999">'+e.data.employee_info.department_name+'</small></div><p>迟到早退:<span class="text-danger">'+e.data.late_num+'次</span>  | 旷工缺勤:<span class="text-danger">'+e.data.kuanggong_num+"次</span></p>";document.getElementById("users-info").innerHTML=t;var n="";mui.each(e.data.duty_check_list,function(e,t){n+='<li class="mui-table-view-cell text-999">签到：<span class="'+(1==t.start_error?"text-danger":"text-333")+'">'+t.start_check_in_time+'</span><br/>签退：<span class="'+(1==t.end_error?"text-danger":"text-333")+'">'+t.end_check_in_time+'</span><div class="mui-badge mui-badge-inverted text-333">'+t.month_day+"</div></li>"}),""!=n&&(document.getElementById("kao-qin-list").innerHTML=n)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...",{background:"rgba(0,0,0,0.4)"})},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){mui.alert("参数错误："+t)}})})}});