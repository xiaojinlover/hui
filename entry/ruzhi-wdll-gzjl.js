mui.init({
			swipeBack: true //启用右滑关闭功能

		});
		mui.plusReady(function() {
			var getInfoData = {
				"token":plus.storage.getItem('token')
			}
			//获取工作经历
			mui.ajax(apiUrl +  'app/get_job_exp', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					if(data.data != '') {
						var gongZuoJingLiHtml = '';
						mui.each(data.data,function(index,item){
							gongZuoJingLiHtml += '<li class="mui-table-view-cell mui-media"><a href="ruzhi-wdll-gzjl-add" class="mui-navigate-right" job_reterence_telephone="' + item.job_reterence_telephone + '" job_reterence_name="' + item.job_reterence_name + '"  miao_shu="' + item.miao_shu + '" end_time="' + item.end_time + '" start_time="' + item.start_time + '" zhi_wei="' + item.zhi_wei + '" jing_li_name="' + item.jing_li_name + '"  jing_li_id="' + item.jing_li_id + '"><div class="mui-media-body">' + item.jing_li_name + '<p class="mui-ellipsis">' + item.start_time + ' 至 ' + item.end_time + '</p></div></a></li>';
						})  
						document.getElementById('gong-zuo-jing-li-list').innerHTML = gongZuoJingLiHtml;
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
				
				var href = this.getAttribute('href');
				var jing_li_id = this.getAttribute('jing_li_id');
				var jing_li_name = this.getAttribute('jing_li_name');
				var zhi_wei = this.getAttribute('zhi_wei');
				var start_time = this.getAttribute('start_time');
				var end_time = this.getAttribute('end_time');
				var miao_shu = this.getAttribute('miao_shu');
				
				var job_reterence_name = this.getAttribute('job_reterence_name');
				var job_reterence_telephone = this.getAttribute('job_reterence_telephone');
				
				
				mui.openWindow({
					url: href +'.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-bottom"
					},
					extras:{
						jing_li_id:jing_li_id,
						jing_li_name:jing_li_name,
						zhi_wei:zhi_wei,
						start_time:start_time,
						end_time:end_time,
						miao_shu:miao_shu,
						job_reterence_name:job_reterence_name,
						job_reterence_telephone:job_reterence_telephone
					},
					waiting: {
						autoShow: false,
						title: '拼命加载中...'
					}
				})
			})
			//下一步（完善教育经历）
			mui('.mui-content-padded').on('tap','a',function(){
				var href = this.getAttribute('href')
				mui.openWindow({
					url: href + '.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: 'slide-in-right',
					},
					waiting: {
						autoShow: true,
						title: '玩命加载中...'
					},
				})
				return false;
			})
		})