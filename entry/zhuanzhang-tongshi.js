mui.init({
			swipeBack: true //启用右滑关闭功能		
		});
		
		mui.plusReady(function() {
			
			document.getElementById('title').innerHTML = '转账到' + plus.webview.currentWebview().name;
			document.getElementById('zhuanzhang-header').innerHTML = '<img src="' + plus.webview.currentWebview().touxiang + '" /><h2>' + plus.webview.currentWebview().name + '</h2><h3>' + plus.webview.currentWebview().zhiwei + '</h3>';
			document.getElementById('have-int-num').innerHTML = plus.webview.currentWebview().haveIntNum;
			
				
			//转账
			mui(document).on('tap','#btn-tixian',function(){				
				var tran_total = document.forms[0].tran_total.value;
				if(tran_total==''){
					mui.alert('请输入需要充值的金额');
					return false;
				}
				mui.prompt('','','请输入您的支付密码',['取消','确定'],function(e) {	
					
					if (e.index == 1) {
						var pay_password = e.value;
						
						if(pay_password==''){
							mui.toast('请输入支付密码！');
							return false;
						}
						if(tran_total>(document.getElementById('have-int-num').innerHTML)*1){
							mui.alert('您提现金额超过可提现金额');
							return false;
						}
						
						var tixianData = {
							"token":plus.storage.getItem('token'),  
							"tran_total":tran_total,
							"payee_users_id":plus.webview.currentWebview().usersid,
							"pay_password":hex_md5(pay_password+'mz')
						} 
						
						mui.ajax(apiUrl + 'Usersint/tran_to_member', {
							data: tixianData,
							type: 'post',
							timeout: 10000,
							success: function(data) {
								console.log(data);
								var data = JSON.parse(data);
								if(data.status == 1){
									document.forms[0].reset();
									mui.alert(data.detail);
									document.getElementById('have-int-num').innerHTML = ((document.getElementById('have-int-num').innerHTML)*1-tran_total).toFixed(2);
									
									plus.webview.getWebviewById('score-xjgz').reload();
								}else{
									mui.alert(data.detail);
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
						
					}
					
				},'div')
				document.querySelector('.mui-popup-input input').setAttribute('type','password')
			})
			//检查是否设置提现密码
			var getInfoData = {
				"token":plus.storage.getItem('token')
			}
			mui.ajax(apiUrl + 'Usersint/check_pay_password', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					
					var data = JSON.parse(data);
					if(data.status==1){
						if(data.data.if_set==0){
							mui.alert('您还没有设置支付密码',function(){
								mui.openWindow({
									url: 'setting-shezhi-zfmmxg.html',
									id: 'setting-shezhi-zfmmxg',
									createNew: true,
									show: {
										autoShow: true,
										aniShow: "slide-in-right"
									},					
									waiting: {
										autoShow: true,
										title: '拼命加载中...'
									}
								})
							})
						}
					}
				}				
			});
		})