!function(e){function t(n){if(i[n])return i[n].exports;var o=i[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var i={};t.m=e,t.c=i,t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=49)}({49:function(t,i){mui.init({swipeBack:!0}),mui.previewImage(),mui.plusReady(function(){function t(){plus.camera.getCamera().captureImage(function(e){plus.io.resolveLocalFileSystemURL(e,function(e){var t=e.toLocalURL()+"?version="+(new Date).getTime();"isIos"==isAndroidIos()?plus.zip.compressImage({src:t,dst:t,overwrite:!0,rotate:-90},function(){n(t),console.log("旋转成功!")},function(e){console.log("旋转失败!")}):n(t)},function(e){console.log("读取拍照文件错误："+e.message)})},function(e){console.log("error"+e)},{filename:"_doc/head.png"})}function i(){plus.gallery.pick(function(t){plus.io.resolveLocalFileSystemURL(t,function(t){plus.io.resolveLocalFileSystemURL("_doc/",function(i){i.getFile("head.png",{},function(o){o.remove(function(){t.copyTo(i,"head.png",function(e){var t=e.fullPath+"?version="+(new Date).getTime();console.log(e.fullPath),n(t)},function(e){console.log("copy image fail:"+e.message)})},function(){console.log("delete image fail:"+e.message)})},function(){t.copyTo(i,"head.png",function(e){n(e.fullPath+"?version="+(new Date).getTime())},function(e){console.log("copy image fail:"+e.message)})})},function(e){console.log("get _www folder fail")})},function(e){console.log("读取拍照文件错误："+e.message)})},function(e){},{filter:"image"})}function n(e){var t=new Image;t.src=e,t.onload=function(){var e=o(t);document.getElementById("head-img1").setAttribute("src","data:image/png;base64,"+e);var i={token:plus.storage.getItem("token"),head_image:e};mui.ajax("http://www.huirenshi.com/V2/app/upload_head_image",{data:i,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);1==e.status?(plus.storage.setItem("users_image",e.data.url),mui.alert(e.detail)):mui.alert(e.detail)},beforeSend:function(){plus.nativeUI.showWaiting("头像上传中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){"abort"==t?mui.alert("连接不到网络，请检查您当前的网络设置"):mui.alert("参数错误"+t)}})}}function o(e){var t=document.createElement("canvas"),i=e.width;if(i<=960)var i=e.width/2,n=e.height/2;else if(i>960&&i<2448)var i=e.width/3,n=e.height/3;else var i=e.width/6,n=e.height/6;var o=0,a=0;return i>n?(width=n,height=n,o=0,a=(i-n)/2):(width=i,height=i,a=0,o=(n-i)/2),t.width=width,t.height=height,t.getContext("2d").drawImage(e,-a,-o,i,n),t.toDataURL("image/png",.1).replace("data:image/png;base64,","")}document.getElementById("head-img1").setAttribute("src",plus.storage.getItem("users_image")),document.getElementById("xing-ming").innerHTML=plus.storage.getItem("real_name")+'<p class="mui-ellipsis" >'+(null!=plus.storage.getItem("zhi_wei")?plus.storage.getItem("zhi_wei"):"暂无")+"</p>",1==plus.storage.getItem("if_company")&&(document.getElementById("ji-ben-zi-liao").className="mui-hidden",document.getElementById("zhi-wei-xin-xi").className="mui-hidden",document.getElementById("ji-ben-zi-liao-divider").className="mui-hidden"),mui(".mui-bar-tab").on("tap","a",function(e){var t=this.getAttribute("href");"index"==t&&1==plus.storage.getItem("if_company")?t="index-boss":"index"==t&&1!=plus.storage.getItem("if_company")&&(t="index"),"address"==t&&(t="1"==plus.storage.getItem("if_reg")?"shop":"authorize-login"),mui.openWindow({url:t+".html",id:t,createNew:!1,show:{autoShow:!0,aniShow:!1},waiting:{autoShow:!0,title:"拼命加载中..."}})}),mui(".mui-table-view-cell-sub").on("tap","a",function(e){var t=this.getAttribute("href");mui.openWindow({url:t+".html",id:t,createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!0,title:"拼命加载中..."}})}),mui(".mui-table-view-cell").on("tap","#xing-ming",function(e){if(mui.os.plus){var n=[{title:"拍照"},{title:"从手机相册选择"}];plus.nativeUI.actionSheet({title:"修改头像",cancel:"取消",buttons:n},function(e){switch(e.index){case 0:break;case 1:t();break;case 2:i()}})}})})}});