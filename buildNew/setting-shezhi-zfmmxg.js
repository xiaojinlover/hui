!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=15)}({15:function(e,t){mui.init({swipeBack:!0}),mui.plusReady(function(){var e={token:plus.storage.getItem("token")};mui.ajax(apiUrl+"Usersint/check_pay_password",{data:e,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);1==e.status&&0==e.data.if_set&&(document.getElementById("is-set").innerHTML="登录密码",document.getElementById("title").innerHTML="设置支付密码"),plus.storage.setItem("if-set-psw",e.data.if_set.toString())},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){"abort"==t?mui.alert("连接不到网络，请检查您当前的网络设置"):mui.alert("参数错误"+t)}}),mui(document).on("tap","#btn-update-psw",function(){if(0==plus.storage.getItem("if-set-psw")){var e=document.forms[0].old_password.value,t=document.forms[0].new_password.value,n=document.forms[0].new_password1.value;if(""==e||""==t||""==n)return mui.alert("请完善您的信息"),!1;if(t!=n)return mui.alert("两次输入密码不一致"),!1;var r={token:plus.storage.getItem("token"),password:e,pay_password:t};mui.ajax(apiUrl+"Usersint/set_pay_password",{data:r,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);1==e.status?mui.alert(e.detail,function(){document.forms[0].reset()}):mui.alert(e.detail)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){"abort"==t?mui.alert("连接不到网络，请检查您当前的网络设置"):mui.alert("参数错误"+t)}})}else{var e=document.forms[0].old_password.value,t=document.forms[0].new_password.value,n=document.forms[0].new_password1.value;if(""==e||""==t||""==n)return mui.alert("请完善您的信息"),!1;if(t!=n)return mui.alert("两次输入密码不一致"),!1;var r={token:plus.storage.getItem("token"),old_pay_password:e,new_pay_password:t};mui.ajax(apiUrl+"Usersint/update_pay_password",{data:r,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);1==e.status?mui.alert(e.detail,function(){document.forms[0].reset()}):mui.alert(e.detail)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){mui.alert("参数错误："+t)}})}})})}});