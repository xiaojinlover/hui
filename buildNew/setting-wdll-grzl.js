!function(e){function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}var t={};n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=56)}({56:function(e,n){mui.init({swipeBack:!0}),mui.plusReady(function(){if(function(){var e={token:plus.storage.getItem("token")};mui.ajax(apiUrl+"app/get_users_info",{data:e,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);1==e.status&&""!=e.data?(document.getElementById("real_name").innerHTML=e.data.real_name,document.getElementById("sex").innerHTML=e.data.sex,document.getElementById("xue-li").innerHTML=e.data.xue_li,document.getElementById("hu-ji-xing-zhi").innerHTML=e.data.hu_ji_xing_zhi,document.getElementById("hun-yin-zhuang-kuang").innerHTML=e.data.hun_yin_zhuang_kuang,document.getElementById("min_zu").innerHTML=e.data.min_zu,document.getElementById("birthday").innerHTML=e.data.birthday,document.getElementById("shen_fen_zheng").innerHTML=e.data.shen_fen_zheng,document.getElementById("shen_fen_zheng_di_zhhi").innerHTML=e.data.shen_fen_zheng_di_zhhi,document.getElementById("xian_zhu_di_zhi").innerHTML=e.data.xian_zhu_di_zhi,document.getElementById("lian-xi-dian-hua").innerHTML=e.data.telephone,document.getElementById("email").innerHTML=e.data.email,document.getElementById("jin_ji_lian_xi_ren").innerHTML=e.data.jin_ji_lian_xi_ren,document.getElementById("jin_ji_lian_xi_ren_dian_hua").innerHTML=e.data.jin_ji_lian_xi_ren_dian_hua):mui.alert(e.detail)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,n){mui.alert("参数错误："+n)}})}(),null==plus.storage.getItem("edu")){var e={token:plus.storage.getItem("token")};mui.ajax(apiUrl+"app/get_edu_basic",{data:e,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);if(1==e.status){var n=e.data;plus.storage.setItem("edu",JSON.stringify(n));var t="<option>请选择</option>";mui.each(JSON.parse(plus.storage.getItem("edu")),function(e,n){t+='<option value="'+n.name+'">'+n.name+"</option>"}),document.getElementById("xue-li").innerHTML=t}},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,n){mui.alert("参数错误："+n)}})}else{var n="<option>请选择</option>";mui.each(JSON.parse(plus.storage.getItem("edu")),function(e,t){n+='<option value="'+t.name+'">'+t.name+"</option>"}),document.getElementById("xue-li").innerHTML=n}})}});