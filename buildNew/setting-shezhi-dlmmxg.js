!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=54)}({54:function(e,t){mui.init({swipeBack:!0}),mui.plusReady(function(){mui(document).on("tap","#btn-update-psw",function(){var e=document.getElementsByTagName("form")[0].old_password.value,t=document.getElementsByTagName("form")[0].new_password1.value,n=document.getElementsByTagName("form")[0].new_password.value;if(""==e||""==t||""==n)return mui.alert("请完善您的密码信息"),!1;if(t!=n)return mui.alert("二次输入的新密码不相等"),!1;var r={token:plus.storage.getItem("token"),new_password:n,old_password:e};mui.ajax(apiUrl+"app/update_password",{data:r,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);e.status,mui.alert(e.detail)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){mui.alert("参数错误："+t)}})})})}});