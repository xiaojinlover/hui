!function(e){function t(i){if(n[i])return n[i].exports;var u=n[i]={i:i,l:!1,exports:{}};return e[i].call(u.exports,u,u.exports,t),u.l=!0,u.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=32)}({32:function(e,t){mui.init({swipeBack:!0}),mui.plusReady(function(){document.getElementById("gong-si-min-cheng").value=plus.storage.getItem("companyname"),mui("form").on("tap","#date",function(){var e={type:"date",beginDate:new Date(1900,1,1)},t=new mui.DtPicker(e),n=this;t.show(function(e){n.value=e.text,this.value=e.text,t.dispose()})}),mui(document).on("tap","#update-lizhi",function(){if(""==document.getElementsByTagName("form")[0].li_zhi_ri_qi.value)return mui.alert("请填写您的离职日期！"),!1;var e={token:plus.storage.getItem("token"),li_zhi_ri_qi:document.getElementsByTagName("form")[0].li_zhi_ri_qi.value,li_zhi_yuan_yin:document.getElementsByTagName("form")[0].li_zhi_yuan_yin.value};mui.ajax(apiUrl+"employee/quit_company",{data:e,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);1==e.status?mui.alert(e.detail,function(){plus.webview.currentWebview().opener().reload()}):mui.alert(e.detail)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){mui.alert("参数错误："+t)}})})})}});