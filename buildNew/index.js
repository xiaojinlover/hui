!function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var i={};t.m=e,t.c=i,t.d=function(e,i,a){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t){function i(e){return e<10?"0"+e.toString():e}function a(){clearTimeout(l),dt=new Date;var e=dt.getHours(),t=dt.getMinutes(),n=dt.getSeconds();document.getElementById("timeShow").innerHTML=i(e)+":"+i(t)+":"+i(n),l=setTimeout(a,1e3);var u=plus.storage.getItem("work_start_time"),m=plus.storage.getItem("work_end_time"),s=plus.storage.getItem("if_work_start"),o=1*(i(e).toString()+i(t).toString()+i(n).toString());null!=u&&(u=u.replace(/\:/g,"")),null!=m&&(m=m.replace(/\:/g,"")),null!=s&&0!=s?(document.getElementById("clock").style.background=o<m?"#fe9669":"#45b3ff",0==plus.storage.getItem("if_work_start")?document.getElementById("clock-text").innerHTML="上班打卡":1==plus.storage.getItem("if_work_start")&&0==plus.storage.getItem("if_work_end")?document.getElementById("clock-text").innerHTML="下班打卡":document.getElementById("clock-text").innerHTML="打卡"):u&&m&&(document.getElementById("clock").style.background=o<m&&o>u?"#fe9669":"#45b3ff",0==plus.storage.getItem("if_work_start")?document.getElementById("clock-text").innerHTML="上班打卡":1==plus.storage.getItem("if_work_start")&&0==plus.storage.getItem("if_work_end")?document.getElementById("clock-text").innerHTML="下班打卡":document.getElementById("clock-text").innerHTML="打卡")}function n(){setTimeout(function(){(new u).getData(),mui("#pullrefresh").pullRefresh().endPulldownToRefresh()},800)}var l=null;l=setTimeout(a,1e3),mui.init({pullRefresh:{container:"#pullrefresh",down:{callback:n,auto:!0}}});var u=function(){};mui.plusReady(function(){if(null!=plus.storage.getItem("token")){var e=plus.webview.getWebviewById("login");null!=e&&e.close()}"1"!=plus.storage.getItem("if_white")?(document.getElementById("bai-daka").setAttribute("class","mui-row"),document.getElementById("bai-01").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4"),document.getElementById("bai-02").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4"),document.getElementById("bai-03").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4")):(document.getElementById("bai-daka").setAttribute("class","mui-row mui-hidden"),document.getElementById("bai-01").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4 mui-hidden"),document.getElementById("bai-02").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4 mui-hidden"),document.getElementById("bai-03").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4 mui-hidden")),u.prototype.getData=function(){"0"==plus.storage.getItem("role")?(document.getElementById("index-header-info").removeAttribute("class"),document.getElementById("li-ji-ru-zhi").setAttribute("class","mui-btn mui-btn-outlined")):(document.getElementById("index-header-info").setAttribute("class","mui-navigate-right"),document.getElementById("li-ji-ru-zhi").setAttribute("class","mui-btn mui-btn-outlined mui-hidden")),"2"==plus.storage.getItem("role")||"3"==plus.storage.getItem("role")?(document.getElementById("feng-xian-yu-jing").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4"),document.getElementById("shen-pi-guan-li").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4"),document.getElementById("yuan-gong-jia-qin").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4"),document.getElementById("kao-qin-ji-lu").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4")):"4"==plus.storage.getItem("role")&&(document.getElementById("shen-pi-guan-li").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4"),document.getElementById("feng-xian-yu-jing").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4 mui-hidden"),document.getElementById("yuan-gong-jia-qin").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4 mui-hidden"),document.getElementById("kao-qin-ji-lu").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4 mui-hidden")),document.getElementById("gerenInfo").innerHTML=(null!=plus.storage.getItem("real_name")?plus.storage.getItem("real_name"):"暂无")+'<p class="mui-ellipsis" id="zhi-wei">'+(null!=plus.storage.getItem("zhi_wei")?plus.storage.getItem("zhi_wei"):"暂无")+"</p>",document.getElementById("title").innerHTML=""!=plus.storage.getItem("companyname")?plus.storage.getItem("companyname"):"未入职",document.getElementById("users-head").setAttribute("src",plus.storage.getItem("users_image"));var e={token:plus.storage.getItem("token")};mui.ajax(apiUrl+"employee/index",{data:e,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);return plus.storage.setItem("ruzhi-status",e.detail),1==e.data.if_daifa&&(document.getElementById("dai-fa").className="score-detail-wrap"),"离职"==e.detail?(plus.storage.setItem("role","0"),document.getElementById("index-header-info").removeAttribute("class"),document.getElementById("li-ji-ru-zhi").setAttribute("class","mui-btn mui-btn-outlined"),document.getElementById("li-ji-ru-zhi").innerHTML="立即入职"):"待入职"==e.detail?(document.getElementById("index-header-info").removeAttribute("class"),document.getElementById("li-ji-ru-zhi").setAttribute("class","mui-btn mui-btn-outlined"),document.getElementById("li-ji-ru-zhi").setAttribute("href","ruzhi-wdll-grzl"),document.getElementById("li-ji-ru-zhi").innerHTML="入职审核中"):plus.storage.setItem("ruzhi-status",""),"2"==e.data.role||"3"==e.data.role?(document.getElementById("feng-xian-yu-jing").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4"),document.getElementById("shen-pi-guan-li").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4"),document.getElementById("yuan-gong-jia-qin").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4"),document.getElementById("kao-qin-ji-lu").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4")):"4"==e.data.role&&(document.getElementById("shen-pi-guan-li").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4"),document.getElementById("feng-xian-yu-jing").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4 mui-hidden"),document.getElementById("yuan-gong-jia-qin").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4 mui-hidden"),document.getElementById("kao-qin-ji-lu").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4 mui-hidden")),"1"==e.data.if_fu_ze_ren&&(document.getElementById("shen-pi-guan-li").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4"),document.getElementById("bu-men-kao-qin").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4")),1==e.status&&""!=e.data&&(document.getElementById("cdzt").innerHTML="undefined"!=e.data.late_early_num?e.data.late_early_num:"0",document.getElementById("kgqq").innerHTML="undefined"!=e.data.kuanggong_num?e.data.kuanggong_num:"0",document.getElementById("jqts").innerHTML="undefined"!=e.data.jia_qing_num?e.data.jia_qing_num:"0",plus.storage.setItem("allow_error_range",e.data.allow_error_range),plus.storage.setItem("role",e.data.role),plus.storage.setItem("companyname",e.data.company_name),plus.storage.setItem("zhi_wei",e.data.zhi_wei),plus.storage.setItem("if_white",e.data.if_white),plus.storage.setItem("position_x",null!=e.data.position_x?e.data.position_x:"0"),plus.storage.setItem("position_y",null!=e.data.position_y?e.data.position_y:"0"),plus.storage.setItem("if_work_start",null!=e.data.if_work_start?e.data.if_work_start.toString():""),plus.storage.setItem("if_work_end",null!=e.data.if_work_end?e.data.if_work_end.toString():""),plus.storage.setItem("work_start_time",null!=e.data.work_start_time?e.data.work_start_time:"0"),plus.storage.setItem("work_end_time",null!=e.data.work_end_time?e.data.work_end_time:"0"),plus.storage.setItem("real_name",e.data.real_name),plus.storage.setItem("users_image",null!=e.data.users_image?e.data.users_image:"images/test-head.png"),document.getElementById("users-head").setAttribute("src",plus.storage.getItem("users_image")),plus.storage.setItem("telephone_key",e.data.telephone_key),e.data.platform&&(plus.storage.setItem("platform",JSON.stringify(e.data.platform)),plus.storage.setItem("if_reg",e.data.platform[0].if_reg.toString())),null!=e.data.wage_int&&(document.getElementById("xian-jin-gong-zi").innerHTML=null!=e.data.wage_int.have_int_num?e.data.wage_int.have_int_num:"0",document.getElementById("zeng-song-ji-fen").innerHTML=null!=e.data.wage_int.already_int?e.data.wage_int.already_int:"0",document.getElementById("dai-zeng-ji-fen").innerHTML=null!=e.data.wage_int.stay_back_int?e.data.wage_int.stay_back_int:"0")),"1"!=plus.storage.getItem("if_white")?(document.getElementById("bai-daka").setAttribute("class","mui-row"),document.getElementById("bai-01").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4"),document.getElementById("bai-02").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4"),document.getElementById("bai-03").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4")):(document.getElementById("bai-daka").setAttribute("class","mui-row mui-hidden"),document.getElementById("bai-01").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4 mui-hidden"),document.getElementById("bai-02").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4 mui-hidden"),document.getElementById("bai-03").setAttribute("class","mui-table-view-cell mui-media mui-col-xs-4 mui-hidden")),1==e.data.if_ret_int&&(document.getElementById("zong-song-ji-fen").className="mui-col-xs-4 mui-hidden",document.getElementById("dai-zong-ji-fen").className="mui-col-xs-4 mui-hidden"),!1},beforeSend:function(){plus.nativeUI.showWaiting("玩命加载中...",{background:"rgba(0,0,0,0.5)"})},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){"abort"==t?mui.alert("连接不到网络，请检查您当前的网络设置"):mui.alert("参数错误"+t)}})},document.getElementById("clock").addEventListener("tap",function(){if(0==plus.storage.getItem("position_x")||0==plus.storage.getItem("position_y"))return mui.alert("请联系管理员设置考勤组并刷新本页"),!1;mui.confirm("亲，确认打卡吗？","提示",function(e){if(0!=e.index){(new BMap.Geolocation).getCurrentPosition(function(e){if(null==e)return mui.alert('无法获取您的定位，请检查您的手机设置是否允许"慧人事"APP获取您的定位！'),!1;var t=e.point.lng,i=e.point.lat,a=new BMap.Circle(new BMap.Point(plus.storage.getItem("position_x"),plus.storage.getItem("position_y")),plus.storage.getItem("allow_error_range")),n=new BMap.Point(t,i);if(BMapLib.GeoUtils.isPointInCircle(n,a)){var l="";if(l=0==plus.storage.getItem("if_work_start")?"start":(0==plus.storage.getItem("if_work_end")&&plus.storage.getItem("if_work_start"),"end"),0==plus.storage.getItem("if_work_start")&&""==l)return mui.alert("您已经打过上下班卡"),!1;var u={daka:l,token:plus.storage.getItem("token")};mui.ajax(apiUrl+"employee/clock_star",{data:u,type:"post",timeout:1e4,success:function(e){var e=JSON.parse(e);return"上班打卡成功"==e.detail?(mui.alert(e.detail),plus.storage.setItem("if_work_start","1"),!1):"下班打卡成功"==e.detail?(mui.alert(e.detail),plus.storage.setItem("if_work_end","1"),!1):(mui.alert(e.detail),!1)},beforeSend:function(){plus.nativeUI.showWaiting("打卡中...")},complete:function(){plus.nativeUI.closeWaiting()},error:function(e,t){"abort"==t?mui.alert("连接不到网络，请检查您当前的网络设置"):mui.alert("参数错误"+t)}})}else mui.alert("不在打卡范围内")})}})}),mui(".mui-bar-tab").on("tap","a",function(){var e=this.getAttribute("href");"index"==e&&1==plus.storage.getItem("if_company")?e="index-boss":"index"==e&&1!=plus.storage.getItem("if_company")&&(e="index"),mui.openWindow({url:e+".html",id:e,createNew:!1,show:{autoShow:!0,aniShow:!1},waiting:{autoShow:!0,title:"玩命加载中..."}})}),mui(".mui-table-view").on("tap","a",function(){var e=this.getAttribute("href");return("setting-zwxx"!=e||"0"!=plus.storage.getItem("role"))&&("shop"==e?(e="1"==plus.storage.getItem("if_reg")?"shop":"authorize-login",mui.openWindow({url:e+".html",id:e,createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!1,title:"玩命加载中..."}}),!1):void mui.openWindow({url:e+".html",id:e,createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!1,title:"玩命加载中..."}}))}),mui(".mui-row").on("tap","a",function(){var e=this.getAttribute("href"),t=this.getAttribute("param");return mui.openWindow({url:e+".html",id:e,createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},extras:{param:t},waiting:{autoShow:!1,title:"玩命加载中..."}}),!1}),1==plus.storage.getItem("if_company")&&mui.openWindow({url:"index-boss.html",id:"index-boss",createNew:!0,show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!1,title:"玩命加载中..."}})})}]);