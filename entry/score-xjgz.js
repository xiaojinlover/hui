mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {
			
			mui('.mui-media').on('tap','a', function(e) {
				
				var href = this.getAttribute('href');
				
				if(href=="score-tixian"||href == "zhongda-chongzhi"){
					var haveIntNum = this.getAttribute('have-int-num');
					if(href == "zhongda-chongzhi"){
						mui.alert('功能开发中,敬请期待！');
						return false;
					}
				}
				if(href == 'select-tongshi'){
					var haveIntNum = this.getAttribute('have-int-num');					
				}
				mui.openWindow({
					url: href+'.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},
					extras:{
						'haveIntNum':haveIntNum
					},
					waiting: {
						autoShow: true,
						title: '拼命加载中...'
					},
				})				
			})
			
			
			mui('.mui-bar-nav').on('tap','.mui-btn-link', function(e) {
				
				var href = this.getAttribute('href');				
				mui.openWindow({
					url: href+'.html',
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
			
			
			var getInfoData = {
				"token":plus.storage.getItem('token')
			}
			mui.ajax(apiUrl + 'Usersint/have_int_list', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					if(data.status == 1) {
						
						document.getElementById('gong-zi-info').innerHTML = '工资总额：' + (data.data.total_have_int?data.data.total_have_int:'0') + '<p class="mui-ellipsis">可用工资：' + (data.data.have_int_num?data.data.have_int_num:'0') + '</p>';
						document.getElementById('btn-tixian').setAttribute('have-int-num',(data.data.have_int_num?data.data.have_int_num:'0'));
						//document.getElementById('btn-zhongda').setAttribute('have-int-num',(data.data.have_int_num?data.data.have_int_num:'0'));
						document.getElementById('have-int-num-tongshi').setAttribute('have-int-num',(data.data.have_int_num?data.data.have_int_num:'0'));
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
					if(typeinfo=='abort'){
						mui.alert('连接不到网络，请检查您当前的网络设置');
					}else{
						mui.alert('参数错误' + typeinfo);
					}
				}
			});
			
		})