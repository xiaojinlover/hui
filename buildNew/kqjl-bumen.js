!function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var i={};t.m=e,t.c=i,t.d=function(e,i,a){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=15)}({15:function(e,t){mui.init({swipeBack:!0}),mui.plusReady(function(){var e={token:plus.storage.getItem("token")};mui.ajax(apiUrl+"Employee/daka_list",{data:e,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);if(1==e.status){var t="",i=0,a="",n=0,s="",l=0;mui.each(e.data,function(e,r){t+='<li class="mui-table-view-cell mui-media"><a class="mui-navigate-right" employee-id="'+r.employee_id+'" href="index-bumen-ygkq-detail"><img class="mui-media-object mui-pull-left" src="'+(r.users_image?r.users_image:"images/logo-white.png")+'"><div class="mui-media-body">'+r.real_name+' <small class="text-999">'+r.department_name+'</small><p>签到：<span class="'+(1==r.start_error?"text-danger":"text-333")+'">'+r.start_check_in_time+'</span></p><p>签退：<span class="'+(1==r.end_error?"text-danger":"text-333")+'">'+r.end_check_in_time+"</span></p></div></a></li>",i++,1!=r.if_late&&1!=r.if_early||(a+='<li class="mui-table-view-cell mui-media"><a class="mui-navigate-right" employee-id="'+r.employee_id+'" href="index-bumen-ygkq-detail"><img class="mui-media-object mui-pull-left" src="'+(r.users_image?r.users_image:"images/logo-white.png")+'"><div class="mui-media-body">'+r.real_name+' <small class="text-999">'+r.department_name+'</small><p>签到：<span class="'+(1==r.start_error?"text-danger":"text-333")+'">'+r.start_check_in_time+'</span></p><p>签退：<span class="'+(1==r.end_error?"text-danger":"text-333")+'">'+r.end_check_in_time+"</span></p></div></a></li>",n++),1!=r.if_queqin&&1!=r.if_kuanggong||(s+='<li class="mui-table-view-cell mui-media"><a class="mui-navigate-right" employee-id="'+r.employee_id+'" href="index-bumen-ygkq-detail"><img class="mui-media-object mui-pull-left" src="'+(r.users_image?r.users_image:"images/logo-white.png")+'"><div class="mui-media-body">'+r.real_name+' <small class="text-999">'+r.department_name+'</small><p>签到：<span class="'+(1==r.start_error?"text-danger":"text-333")+'">'+r.start_check_in_time+'</span></p><p>签退：<span class="'+(1==r.end_error?"text-danger":"text-333")+'">'+r.end_check_in_time+"</span></p></div></a></li>",l++)}),""!=t&&(document.getElementById("kao-qin-ji-lu").innerHTML=t),""!=a&&(document.getElementById("chi-dao-zao-tui").innerHTML=a),""!=s&&(document.getElementById("que-qin-kuang-gong").innerHTML=s),document.getElementById("kao-qin-ji-lu-num").innerHTML=i,document.getElementById("chi-dao-zao-tui-num").innerHTML=n,document.getElementById("que-qin-kuang-gong-num").innerHTML=l}},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...",{background:"rgba(0,0,0,0.4)"})},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){mui.alert("参数错误："+t)}}),mui(".mui-table-view").on("tap","a",function(){var e=this.getAttribute("href"),t=this.getAttribute("employee-id");return mui.openWindow({url:e+".html",id:e,createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},extras:{employeeId:t},waiting:{autoShow:!1,title:"玩命加载中..."}}),!1})})}});