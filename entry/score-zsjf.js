mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {
			
			mui('.mui-bar-nav').on('tap','.mui-btn-link', function(e) {
				var href = this.getAttribute('href');
				mui.openWindow({
					url: href + '.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},
					waiting: {
						autoShow: true,
						title: '拼命加载中...'
					},

				})				
			})
			mui('.mui-media').on('tap','a', function(e) {
				var href = this.getAttribute('href');
				
				if(href == 'score-tixian'){
					var haveIntNum = this.getAttribute('have-score-num');
				}
				if(href=="zhongda-chongzhi"){
					mui.alert("功能开发中，敬请期待！");
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
						haveIntNum: haveIntNum,
						isJifen: 1
					},
					waiting: {
						autoShow: true,
						title: '拼命加载中...'
					},

				})				
			})
			var getInfoData = {
				"token":plus.storage.getItem('token')
			}
			mui.ajax(apiUrl + 'Usersint/int_bank_permit', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					document.getElementById('gong-zi-info').innerHTML ="福利券总额：" + (data.data.total_already_int ? data.data.total_already_int : "0") + '<p class="mui-ellipsis">可用福利券：' + (data.data.already_int ? data.data.already_int : "0") + "</p>"
					document.getElementById("btn-tixian").setAttribute("have-score-num", data.data.already_int ? data.data.already_int : "0"); 
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