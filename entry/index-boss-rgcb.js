mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {
			//链接
			mui('.mui-table-view').on('tap', 'a', function() {
				var href = this.getAttribute('href');
				var wageMouthId = this.getAttribute('wage-mouth-id');
				if(wageMouthId == 0) {
					mui.toast('本月暂无数据');
					return false;
				}
				mui.openWindow({
					url: href + '.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},
					extras: {
						"wageMouthId": wageMouthId  
					},
					waiting: {
						autoShow: false,
						title: '玩命加载中...'
					}

				})
				return false;
			})
			
			//图表一
			var getInfoData = {
				"token": plus.storage.getItem("token")
			}
			mui.ajax(apiUrl + 'cmpint/yong_gong_cheng_ben', {

				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					
					var data = JSON.parse(data);
					if(data.status != 1) {
						mui.alert('请求错误 ')
						return false;
					}
					//chart01
					var chart01 = echarts.init(document.getElementById('chart01'));
					var xMouth = data.data.month;
					var yWage = data.data.wage;
					option01 = {
						title: {
							text: '人工成本分析表',
							textStyle: {
								fontSize: 16,
								fontWeight: 'normal',
								color: '#666'
							},
							padding: 15,
							left: 'center'

						},
						color: ["#ffc038"],
						tooltip: {
							trigger: 'axis',
							formatter: '{b0}: {c0}元'
						},
						grid: {
							top: '18%',
							left: '3%',
							right: '5%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: [{
							type: 'category',
							boundaryGap: false,
							data: xMouth
						}],
						yAxis: [{
							type: 'value'
						}],
						series: [{
							name: '人工成本',
							type: 'line',
							areaStyle: {
								normal: {}
							},
							data: yWage
						}]
					};
					chart01.setOption(option01);
					
					//列表
					if(data.data.list!=''){
						var rengongListHtml = '';
						mui.each(data.data.list,function(index,item){
							rengongListHtml += '<li class="mui-table-view-cell"><a class="mui-navigate-right" wage-mouth-id="' + (item.dis_int_num!=0?index:0) + '" href="index-boss-rgcb-item" style="font-size: 16px;">人工成本：<span class="text-danger">' + item.dis_int_num +'</span><span class="mui-badge mui-badge-primary mui-badge-inverted">' + index + '</span></a></li>';
						})
						document.getElementById('ren-gong-cheng-ben-list').innerHTML = rengongListHtml;
					}
				},
				beforeSend: function() {
					plus.nativeUI.showWaiting("玩命加载中...", {
						background: "rgba(0,0,0,0.5)"
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