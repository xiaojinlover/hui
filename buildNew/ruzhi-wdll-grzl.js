!function(e){function t(i){if(n[i])return n[i].exports;var a=n[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=35)}({35:function(e,t){mui.init({swipeBack:!0}),mui.plusReady(function(){if(function(){var e={token:plus.storage.getItem("token")};mui.ajax(apiUrl+"app/get_users_info",{data:e,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);1!=e.status||null==e.data&&""==e.data?mui.alert(e.detail):(document.getElementById("real_name").innerHTML=e.data.real_name,document.getElementById("sex").value=e.data.sex,document.getElementById("xue-li").value=e.data.xue_li,document.getElementById("hu-ji-xing-zhi").value=e.data.hu_ji_xing_zhi,document.getElementById("hun-yin-zhuang-kuang").value=e.data.hun_yin_zhuang_kuang,document.getElementById("min_zu").innerHTML=e.data.min_zu,document.getElementById("birthday").innerHTML=e.data.birthday,document.getElementById("shen_fen_zheng").innerHTML=e.data.shen_fen_zheng,document.getElementById("shen_fen_zheng_di_zhhi").innerHTML=e.data.shen_fen_zheng_di_zhhi,document.getElementById("xian_zhu_di_zhi").innerHTML=e.data.xian_zhu_di_zhi,document.getElementById("lian-xi-dian-hua").innerHTML=e.data.telephone,document.getElementById("email").innerHTML=e.data.email,document.getElementById("qq").innerHTML=e.data.qq,document.getElementById("jin_ji_lian_xi_ren").innerHTML=e.data.jin_ji_lian_xi_ren,document.getElementById("jin_ji_lian_xi_ren_dian_hua").innerHTML=e.data.jin_ji_lian_xi_ren_dian_hua)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){mui.alert("参数错误："+t)}})}(),document.getElementById("sex").onchange=function(){var e=this.value,t={token:plus.storage.getItem("token"),sex:e};mui.ajax(apiUrl+"app/update_user_info",{data:t,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);return mui.toast(e.detail),!1},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){mui.alert("参数错误："+t)}})},document.getElementById("xue-li").onchange=function(){var e=this.value,t={token:plus.storage.getItem("token"),xue_li:e};mui.ajax(apiUrl+"app/update_user_info",{data:t,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);return mui.toast(e.detail),!1},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){mui.alert("参数错误："+t)}})},document.getElementById("hu-ji-xing-zhi").onchange=function(){var e=this.value,t={token:plus.storage.getItem("token"),hu_ji_xing_zhi:e};mui.ajax(apiUrl+"app/update_user_info",{data:t,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);return mui.toast(e.detail),!1},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){mui.alert("参数错误："+t)}})},document.getElementById("hun-yin-zhuang-kuang").onchange=function(){var e=this.value,t={token:plus.storage.getItem("token"),hun_yin_zhuang_kuang:e};mui.ajax(apiUrl+"app/update_user_info",{data:t,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);return mui.toast(e.detail),!1},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){mui.alert("参数错误："+t)}})},mui(".mui-content-padded").on("tap","a",function(){var e=this.getAttribute("href");return""==document.getElementById("shen_fen_zheng").innerHTML?(mui.alert("请完善您的身份证号码"),!1):(mui.openWindow({url:e+".html",id:e,createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!0,title:"玩命加载中..."}}),!1)}),null==plus.storage.getItem("edu")){var e={token:plus.storage.getItem("token")};mui.ajax(apiUrl+"app/get_edu_basic",{data:e,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);if(1==e.status){var t=e.data;plus.storage.setItem("edu",JSON.stringify(t));var n="<option>请选择</option>";mui.each(JSON.parse(plus.storage.getItem("edu")),function(e,t){n+='<option value="'+t.name+'">'+t.name+"</option>"}),document.getElementById("xue-li").innerHTML=n}},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){mui.alert("参数错误："+t)}})}else{var t="<option>请选择</option>";mui.each(JSON.parse(plus.storage.getItem("edu")),function(e,n){t+='<option value="'+n.name+'">'+n.name+"</option>"}),document.getElementById("xue-li").innerHTML=t}mui(".mui-table-view-cell").on("tap","a",function(e){var t=this.childNodes.item(1).getAttribute("id"),n=this.childNodes.item(1).innerHTML,i=this.childNodes.item(1).getAttribute("title");if("lian-xi-dian-hua"==t)return!1;var a="ruzhi-wdll-grzl-add";"birthday"==t&&(a="ruzhi-wdll-grzl-add-birthday"),mui.openWindow({url:a+".html",id:a,createNew:!0,show:{autoShow:!0,aniShow:"slide-in-bottom"},extras:{dataValue:n,dataTitle:i,dataId:t},waiting:{autoShow:!1,title:"拼命加载中..."}})})})}});