!function(e){function t(i){if(n[i])return n[i].exports;var u=n[i]={i:i,l:!1,exports:{}};return e[i].call(u.exports,u,u.exports,t),u.l=!0,u.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=40)}({40:function(e,t){mui.init({swipeBack:!0}),mui.plusReady(function(){var e=document.forms[0];document.getElementById("code").addEventListener("tap",function(){if(!e.username.value)return mui.alert("请输入手机号"),!1;var t={telephone:e.username.value,type:0,verify_token:hex_md5("m_a_i$"+e.username.value+"$z_h_i"),if_company:1};mui.ajax(apiUrl+"login/get_verify_2",{data:t,type:"post",timeout:1e4,success:function(e){function t(e){if(0==n)return e.removeAttribute("disabled"),e.innerHTML="重新获取验证码",void(n=60);e.setAttribute("disabled",!0),e.innerHTML="重新发送("+n+")",n--,setTimeout(function(){t(e)},1e3)}var e=JSON.parse(e);if(0==e.status)return mui.alert(e.detail),!1;var n=60;t(document.getElementById("code"))},beforeSend:function(){plus.nativeUI.showWaiting("数据提交中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){mui.alert(t)}})}),document.getElementById("btn-next-step").addEventListener("tap",function(t){if(!e.username.value)return mui.alert("请输入您的手机"),!1;if(!e.code01.value)return mui.alert("请输入您的验证码"),!1;if(e.code01.value){var n={telephone:e.username.value,verify:e.code01.value};mui.ajax(apiUrl+"login/check_verify",{data:n,type:"post",timeout:1e4,success:function(t){var t=JSON.parse(t);if(0==t.status)return mui.alert("参数错误，请检查您的手机号与验证码！"),!1;1==t.status&&mui.openWindow({url:"qiye-zhuce-step02.html",id:"qiye-zhuce-step02",createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right",duration:200},extras:{username:e.username.value,code01:e.code01.value},waiting:{autoShow:!1}})},beforeSend:function(){plus.nativeUI.showWaiting("数据提交中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){mui.alert(t)}})}})})}});