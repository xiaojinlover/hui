mui.init({
			swipeBack: true //启用右滑关闭功能

		});
		mui.plusReady(function() {
			var getInfoData = {
				"token":plus.storage.getItem('token')
			}
			 
			//获取工作经历
			mui.ajax(apiUrl +  'app/get_edu_exp', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					
					var data = JSON.parse(data);
					if(data.data != '') {
						var jiaoYuJingLiHtml = '';
						mui.each(data.data,function(index,item){
							jiaoYuJingLiHtml += '<li class="mui-table-view-cell mui-media"><a href="javascript:void(0);" class="mui-navigate-right" end-time="' + item.end_time + '" start-time="' + item.start_time + '" degree="' + item.degree + '" major="' + item.major + '" jingli-name="' + item.jing_li_name + '" jingli-id="' + item.jing_li_id + '"><div class="mui-media-body">' + item.jing_li_name + '<p class="mui-ellipsis">'  + item.start_time + '至 ' + item.end_time + '</p></div></a></li>';
						})  
						document.getElementById('jiao-yu-jing-li-list').innerHTML = jiaoYuJingLiHtml;
					}
				},
				beforeSend: function() {
					plus.nativeUI.showWaiting("玩命加载中...");
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				},
				error: function(xhr, typeinfo) {
					mui.alert("参数错误：" + typeinfo);
				}
			});
			//链接
			mui('.mui-table-view').on('tap', 'a', function(e) {
				var jingLiId = this.getAttribute('jingli-id');
				var jingLiName = this.getAttribute('jingli-name');
				var major = this.getAttribute('major');
				var degree = this.getAttribute('degree');
				var startTime = this.getAttribute('start-time');
				var endTime = this.getAttribute('end-time');
				mui.openWindow({
					url: 'ruzhi-wdll-jyjl-add.html',
					id: 'ruzhi-wdll-jyjl-add',
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-bottom"
					},
					extras:{
						jingLiId: jingLiId,
						jingLiName:jingLiName,
						major:major,
						startTime:startTime,
						endTime:endTime,
						degree:degree
					},
					waiting: {
						autoShow: false,
						title: '拼命加载中...'
					}
				})
			})
			//完成入职
			mui('.mui-content-padded').on('tap','a',function(){
				
				mui.openWindow({
					url: 'ruzhi-wdll-gzjl.html',
					id: 'ruzhi-wdll-gzjl',
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},
					waiting: {
						autoShow: false,
						title: '拼命加载中...'
					}
				})
				
				return false;
			})
		})