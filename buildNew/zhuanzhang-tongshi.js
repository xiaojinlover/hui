!function(t){function a(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}var e={};a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},a.p="",a(a.s=10)}({10:function(t,a){mui.init({swipeBack:!0}),mui.plusReady(function(){mui(".mui-table-view").on("tap","a",function(t){var a=this.getAttribute("data-card-id"),e=this.getAttribute("data-bank-name"),n=this.getAttribute("data-card-num"),i=this.getAttribute("href");mui.openWindow({url:i+".html",id:i,createNew:!0,extras:{bankCardId:a,bankName:e,cardNum:n},show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!0,title:"拼命加载中..."}})});var t={token:plus.storage.getItem("token")};mui.ajax(apiUrl+"Usersint/bank_card_list",{data:t,type:"post",timeout:1e4,success:function(t){var t=JSON.parse(t);if(1==t.status&&""!=t.data){var a="";mui.each(t.data,function(t,e){a+='<li class="mui-table-view-cell"><a class="mui-navigate-right" href="bank-card-delet" data-card-num="'+e.card_num.substring(e.card_num.length-4,e.card_num.length)+'" data-bank-name="'+e.bank_name+'" data-card-id="'+e.users_bank_card_id+'">'+(""!=e.bank_name?e.bank_name:"暂无")+"<p>"+(""!=e.card_type?e.card_type:"暂无")+'</p><span class="mui-badge mui-badge-primary mui-badge-inverted" style="font-size: 22px;">**** **** **** '+e.card_num.substring(e.card_num.length-4,e.card_num.length)+"</span></a></li>"}),document.getElementById("bank-card-list").innerHTML=a}},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...",{background:"rgba(0,0,0,0.5)"})},complete:function(){plus.nativeUI.closeWaiting()},error:function(t,a){"abort"==a?mui.alert("连接不到网络，请检查您当前的网络设置"):mui.alert("参数错误"+a)}})})}});