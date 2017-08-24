mui.init({
			swipeBack: true //启用右滑关闭功能		
		});
		
		mui.plusReady(function() {
			document.getElementById('have-int-num').innerHTML = plus.webview.currentWebview().haveIntNum;
			//获取银行
			var getInfoData = {
				"token":plus.storage.getItem('token')
			}
			
			mui.ajax(apiUrl + 'Usersint/bank_card_list', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					
					var data = JSON.parse(data);
					
					if(data.status==1&&data.data!=''){
						var bankHtml = '';
						mui.each(data.data,function(index,item){
							if(index==0)
								document.forms[0].users_bank_card_id.value = item.users_bank_card_id;
								bankHtml += '<a class="mui-navigate-right">提现到<span>' + item.bank_name + '(' + item.card_num.substring(item.card_num.length-4,item.card_num.length) + ')</span></a>';
						})
						document.getElementById('bank').innerHTML = bankHtml;
					}else{
						mui.alert('您还没有绑定银行卡！',function(){
							mui.openWindow({
								url: 'bank-card-list.html',
								id: 'bank-card-list',
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
			
			//选择银行卡
			function insertSelectBank(e){
				document.getElementById('bank').innerHTML = e.detail.cardHtml;
				document.forms[0].users_bank_card_id.value = e.detail.cardId;				
			}
			window.addEventListener('insertSelectBank',insertSelectBank);
			
			mui('.mui-table-view-cell').on('tap','a', function(e) {				
				mui.openWindow({
					url: 'select-bank-card.html',
					id: 'select-bank-card',
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-bottom"
					},					
					waiting: {
						autoShow: true,
						title: '拼命加载中...'
					}
				})				
			})			
			
			//检查是否设置提现密码
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
			
			//提现
			mui(document).on('tap','#btn-tixian',function(){
				
				var users_bank_card_id = document.forms[0].users_bank_card_id.value;
				var tran_total = document.forms[0].tran_total.value;
				
				if (tran_total == ''){
					mui.toast('请输入您要提现的金额');
					return false;
				}
				if (isNaN(tran_total)){
					mui.toast('提现金额必须是数字');
					return false;
				}
				if(users_bank_card_id==''){
					mui.toast('请选择提现银行卡');
					return false;
				}
				
				mui.prompt('','','请输入您的支付密码',['取消','确定'],function(e) {	
					var isJifen = plus.webview.currentWebview().isJifen!=1?0:1;					
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
							"users_bank_card_id":users_bank_card_id,
							"pay_password":hex_md5(pay_password+'mz'),
							"if_int":isJifen
						} 
						
						mui.ajax(apiUrl + 'Usersint/tran_to_card', {
							data: tixianData,
							type: 'post',
							timeout: 10000,
							success: function(data) {
								
								var data = JSON.parse(data);
								if(data.status == 1){
									document.forms[0].reset();
									mui.alert(data.detail);
									document.getElementById('have-int-num').innerHTML = ((document.getElementById('have-int-num').innerHTML)*1-tran_total).toFixed(2);
									plus.webview.currentWebview().opener().reload();
								} else{
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
								if(typeinfo=='abort'){
									mui.alert('连接不到网络，请检查您当前的网络设置');
								}else{
									mui.alert('参数错误' + typeinfo);
								}
							}
						});
						
					}
					
				},'div')
				document.querySelector('.mui-popup-input input').setAttribute('type','password')
			})
		})