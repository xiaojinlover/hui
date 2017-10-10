mui.init({
			swipeBack: true //启用右滑关闭功能		
		});
		
		mui.plusReady(function() {
			if(plus.webview.currentWebview().isJifen=='1'){
				document.getElementById('title').innerHTML = '发福利券至' + plus.webview.currentWebview().name;
			}else{
				document.getElementById('title').innerHTML = '发薪至' + plus.webview.currentWebview().name;
			}
			
			document.getElementById('zhuanzhang-header').innerHTML = '<img src="' + plus.webview.currentWebview().touxiang + '" /><h2>' + plus.webview.currentWebview().name + '</h2><h3>' + plus.webview.currentWebview().zhiwei + '</h3>';
			document.getElementById('have-int-num').innerHTML = plus.webview.currentWebview().haveIntNum;
			
			//获取手机验证码
			document.getElementById("code").addEventListener('tap', function() {
				
				var codeData = {
						token:plus.storage.getItem('token')
					}
				
					//ajax提交获取验证码
				mui.ajax(apiUrl +  'cmpint/get_tran_verify', {
					data: codeData,
					type: 'post',
					timeout: 10000,
					success: function(data) {                        
						var data = JSON.parse(data);
						if(data.status == 0) {
							mui.alert(data.detail);
							return false;
						} else {
							//计时器函数
							var countdown = 60;
							var obj = document.getElementById("code");

							function settime(obj) {
								if(countdown == 0) {
									obj.removeAttribute("disabled");
									obj.innerHTML = "重新获取验证码";
									countdown = 60;
									return;
								} else {
									obj.setAttribute("disabled", true);
									obj.innerHTML = "重新发送(" + countdown + ")";
									countdown--;
								}
								setTimeout(function() {
									settime(obj)
								}, 1000)
							}
							//计时器函数结束
							settime(obj);
						}
					},
					beforeSend: function() {
						plus.nativeUI.showWaiting("数据提交中...");
					},
					complete: function() {
						plus.nativeUI.closeWaiting();
					},
					error: function(xhr, typeinfo) {
						mui.alert(typeinfo);
					}
				});
			})

				
			//发福利券
			mui(document).on('tap','#btn-tixian',function(){				
				var tran_int_num = document.forms[0].tran_int_num.value;
				if(tran_int_num==''){
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
						if(tran_int_num>(document.getElementById('have-int-num').innerHTML)*1){
							mui.alert('您提现金额超过可提现金额');
							return false;
						}
						
						var zhuanzhangData = {
							"token":plus.storage.getItem('token'),  
							"tran_int_num":tran_int_num,
							"to_users_id":plus.webview.currentWebview().usersid,
							"tran_pwd":hex_md5(pay_password+'mz'),
							"send_verify_code":document.forms[0].code01.value,
							"int_item":document.forms[0].int_item.value
						} 
						if(plus.webview.currentWebview().isJifen=='1'){
							fafangUrl = 'cmpint/int_tran_to_employee';
						}else{
							fafangUrl = 'cmpint/tran_to_employee';
						}
						mui.ajax(apiUrl + fafangUrl, {
							data: zhuanzhangData,
							type: 'post',
							timeout: 10000,
							success: function(data) {
								console.log(data)
								var data = JSON.parse(data);
								if(data.status == 1){									
									mui.alert(data.detail,function(){
										var toUrl = ''
										if(plus.webview.currentWebview().isJifen=='1'){
											toUrl = 'index-boss-kyjf'
										}else{
											toUrl = 'index-boss-kyye';
										}
										mui.openWindow({
											url: toUrl + '.html',
											id: toUrl,
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
//										if(plus.webview.getWebviewById('index-boss-kyjf')!=null){
//											plus.webview.getWebviewById('index-boss-kyjf').reload();
//										}else{
//											mui.openWindow({
//												url: 'index-boss-kyjf.html',
//												id: 'index-boss-kyjf',
//												createNew: true,
//												show: {
//													autoShow: true,
//													aniShow: "slide-in-right"
//												},					
//												waiting: {
//													autoShow: true,
//													title: '拼命加载中...'
//												},
//											})
//										}	
									});
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