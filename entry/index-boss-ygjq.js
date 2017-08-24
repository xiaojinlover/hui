mui.init({
			swipeBack: true //启用右滑关闭功能      
		});

		mui.plusReady(function() {
			function fa(j) {
				if(j < 10) {
					return '0' + j.toString();
				} else {
					return j;
				}
			}
				
			
			var jiaqingData = {
				"token":plus.storage.getItem('token')
			}
//			console.log(plus.storage.getItem('token')) 
			mui.ajax(apiUrl +  'Boss/month_jia_qin', {
				data: jiaqingData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					
					var data = JSON.parse(data);
					
					if(data.status!=0){
						var dayYuanGongJiaQing = '';
						var dayYuanGongJiaQingNum = 0;
						var mouthYuanGongJiaQing = '';
						var mouthYuanGongJiaQingNum = 0;
						var nowDay = new Date(); 
						nowDay = fa(nowDay.getFullYear())+fa(nowDay.getMonth()+1)+fa(nowDay.getDate()); 
						
						mui.each(data.data,function(index,item){
							mouthYuanGongJiaQing += '<li class="mui-table-view-cell mui-media"><img class="mui-media-object mui-pull-left" src="' + (!!item.users_image?item.users_image:"images/logo-white.png") + '"><div class="mui-media-body">' + item.real_name + ' <small class="text-999">' + item.department_name + '</small><p>开始时间：<span class="text-333">' + item.kai_shi_shi_jian + '</span></p><p>结束时间：<span class="text-333">' + item.jie_shu_shi_jian + '</span></p><p>请假类型：<span class="text-333">' + item.wage_item_rule + '</span></p></div></li>'
							mouthYuanGongJiaQingNum++;
							var startTime = item.kai_shi_shi_jian.substr(0,10).replace(/\-/g,'');
							var endTime = item.jie_shu_shi_jian.substr(0,10).replace(/\-/g,'');
							if(startTime == nowDay||endTime==nowDay||(nowDay>startTime&nowDay<endTime)){
								dayYuanGongJiaQing += '<li class="mui-table-view-cell mui-media"><img class="mui-media-object mui-pull-left" src="' + (!!item.users_image?item.users_image:"images/logo-white.png") + '"><div class="mui-media-body">' + item.real_name + ' <small class="text-999">' + item.department_name + '</small><p>开始时间：<span class="text-333">' + item.kai_shi_shi_jian + '</span></p><p>结束时间：<span class="text-333">' + item.jie_shu_shi_jian + '</span></p><p>请假类型：<span class="text-333">' + item.wage_item_rule + '</span></p></div></li>'
								dayYuanGongJiaQingNum++;
							}
						})
						
						document.getElementById('day-yuan-dong-jia-qing-num').innerHTML = dayYuanGongJiaQingNum;
						document.getElementById('mouth-yuan-dong-jia-qing-num').innerHTML = mouthYuanGongJiaQingNum;
						if(dayYuanGongJiaQing!='')
							document.getElementById('day-yuan-gong-jia-qing').innerHTML = dayYuanGongJiaQing;
						if(mouthYuanGongJiaQing!='')
							document.getElementById('mouth-yuan-gong-jia-qing').innerHTML = mouthYuanGongJiaQing;
					}
				},
				beforeSend: function() {
					plus.nativeUI.showWaiting("玩命加载中...", {
						background: "rgba(0,0,0,0.4)"
					});
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				},
				error: function(xhr, typeinfo) {
					mui.alert("参数错误：" + typeinfo);
				}
			});
		})