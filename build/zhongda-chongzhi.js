!function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=80)}({80:function(t,e){mui.init({swipeBack:!0}),mui.plusReady(function(){1!=plus.storage.getItem("if_reg")&&mui.alert("请先授权商城登录",function(){mui.openWindow({url:"authorize-login.html",id:"authorize-login",createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!0,title:"拼命加载中..."}})}),document.getElementById("user-name").innerHTML=plus.storage.getItem("username");var t={token:plus.storage.getItem("token")};mui.ajax(apiUrl+"Usersint/platform_permit",{data:t,type:"post",timeout:1e4,success:function(t){var t=JSON.parse(t);1==t.status?document.getElementById("have-int-num").innerHTML=t.data:mui.alert("获取可用余额失败")},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...",{background:"rgba(0,0,0,0.5)"})},complete:function(){plus.nativeUI.closeWaiting()},error:function(t,e){"abort"==e?mui.alert("连接不到网络，请检查您当前的网络设置"):mui.alert("参数错误"+e)}}),mui(document).on("tap","#btn-tixian",function(){var t=document.forms[0].tran_total.value;if(""==t)return mui.alert("请输入需要充值的金额"),!1;mui.prompt("","","请输入您的支付密码",["取消","确定"],function(e){if(1==e.index){var n=e.value;if(""==n)return mui.toast("请输入支付密码！"),!1;if(t>1*document.getElementById("have-int-num").innerHTML)return mui.alert("您提现金额超过可提现金额"),!1;var i={token:plus.storage.getItem("token"),tran_total:t,platform_key:JSON.parse(plus.storage.getItem("platform"))[0].key,pay_password:hex_md5(n+"mz")};mui.ajax(apiUrl+"zhongda/tran_to_platform",{data:i,type:"post",timeout:1e4,success:function(e){console.log(e);var e=JSON.parse(e);1==e.status?(document.forms[0].reset(),mui.alert(e.detail),document.getElementById("have-int-num").innerHTML=(1*document.getElementById("have-int-num").innerHTML-t).toFixed(2),plus.webview.currentWebview().opener().reload()):mui.alert(e.detail)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...",{background:"rgba(0,0,0,0.5)"})},complete:function(){plus.nativeUI.closeWaiting()},error:function(t,e){"abort"==e?mui.alert("连接不到网络，请检查您当前的网络设置"):mui.alert("参数错误"+e)}})}},"div"),document.querySelector(".mui-popup-input input").setAttribute("type","password")});var e={token:plus.storage.getItem("token")};mui.ajax(apiUrl+"Usersint/check_pay_password",{data:e,type:"post",timeout:1e4,success:function(t){var t=JSON.parse(t);1==t.status&&0==t.data.if_set&&mui.alert("您还没有设置支付密码",function(){mui.openWindow({url:"setting-shezhi-zfmmxg.html",id:"setting-shezhi-zfmmxg",createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!0,title:"拼命加载中..."}})})}})})}});