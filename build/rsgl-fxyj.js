!function(t){function e(n){if(i[n])return i[n].exports;var a=i[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=45)}({45:function(t,e){mui.init({swipeBack:!0}),mui.plusReady(function(){var t={token:plus.storage.getItem("token")},e="",i="";mui.ajax(apiUrl+"hr/wait_contract",{data:t,type:"post",timeout:1e4,success:function(t){var t=JSON.parse(t);1==t.status&&""!=t.data&&(mui.each(t.data,function(t,i){e+='<li class="mui-table-view-cell mui-collapse"><a class="mui-navigate-right" href="#">'+i.real_name+'</a><div class="mui-collapse-content"><table width="100%"><tbody><tr><td width="30%" class="text-999 mui-text-center">入职时间</td><td width="70%">'+(null!=i.ru_zhi_shi_jian?i.ru_zhi_shi_jian:"暂无")+'</td></tr><tr><td width="30%" class="text-999 mui-text-center">所属部门</td><td width="70%">'+(null!=i.department_name?i.department_name:"暂无")+'</td></tr><tr><td width="30%" class="text-999 mui-text-center">合同类型</td><td width="70%" class="text-red">'+(null!=i.he_tong_lei_xing?i.he_tong_lei_xing:"暂无")+"</td></tr></tbody></table></div></li>"}),document.getElementById("htdq-list").innerHTML=e)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(t,e){mui.alert("参数错误："+e)}}),mui.ajax(apiUrl+"hr/wait_social",{data:t,type:"post",timeout:1e4,success:function(t){var t=JSON.parse(t);1==t.status&&(mui.each(t.data,function(t,e){i+='<li class="mui-table-view-cell mui-collapse"><a class="mui-navigate-right" href="#">'+e.real_name+'</a><div class="mui-collapse-content"><table width="100%"><tbody><tr><td width="30%" class="text-999 mui-text-center">入职时间</td><td width="70%">'+(null!=e.ru_zhi_shi_jian?e.ru_zhi_shi_jian:"暂无")+'</td></tr><tr><td width="30%" class="text-999 mui-text-center">所属部门</td><td width="70%">'+(null!=e.department_name?e.department_name:"暂无")+'</td></tr><tr><td width="30%" class="text-999 mui-text-center">社保状态</td><td width="70%" class="text-red">'+(null!=e.sb_type?e.sb_type:"暂无")+"</td></tr></tbody></table></div></li>"}),document.getElementById("sbdj-list").innerHTML=i)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(t,e){mui.alert("参数错误："+e)}})})}});