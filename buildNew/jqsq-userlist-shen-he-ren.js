!function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var i={};t.m=e,t.c=i,t.d=function(e,i,a){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=13)}({13:function(e,t){mui.init({swipeBack:!0}),mui.plusReady(function(){var e=plus.webview.currentWebview().shenHeType,t=plus.webview.currentWebview().forms;mui(document).on("change",'input[type="checkbox"]',function(){var i="",a=[],n=0;mui.each(mui('input[type="checkbox"]'),function(r,s){s.checked&&(a[n]=this.parentNode.getAttribute("data-usersid"),i+='<div class="image-item" ><div data-form = "'+t+'" class="image-close" data-type="'+e+'" data-usersid="'+this.parentNode.getAttribute("data-usersid")+'">X</div><img class="file" src="'+this.parentNode.getAttribute("data-usersimage")+'"><p class="name">'+this.parentNode.getAttribute("data-realname")+"</p></div>",n++)});var r=plus.webview.currentWebview().opener();mui.fire(r,"insertHtml",{usersHtml:i,forms:t,id:e+"-item",shenHeType:e,usersIdArray:a.toString()}),mui.back()}),"shen-he-ren"==e?document.getElementById("title").innerHTML="选择审批人":"chao-song-ren"==e&&(document.getElementById("title").innerHTML="选择抄送人");var i={token:plus.storage.getItem("token")};mui.ajax(apiUrl+"employee/get_leader",{data:i,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);if(1==e.status){var t="";mui.each(e.data,function(e,i){t+='<li class="mui-table-view-cell mui-checkbox mui-right"><a href="javascript:void(0)" data-realname="'+i.real_name+'" data-usersimage="'+(null!=i.users_image?i.users_image:"images/logo-white.png")+'" data-usersid="'+i.emp_id+'" data-zhiwei="'+i.zhi_wei+'"><img class="mui-media-object mui-pull-left" src="'+(null!=i.users_image?i.users_image:"images/logo-white.png")+'"><div class="mui-media-body">'+i.real_name+'<p class="mui-ellipsis">'+i.zhi_wei+'</p></div><input name="userid" type="checkbox"></a></li>'}),document.getElementById("user-list").innerHTML=t}else mui.alert(e.detail)},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){mui.alert("参数错误："+t)}})})}});