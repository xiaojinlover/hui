mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {
			document.forms[0].username.value = plus.storage.getItem('real_name');
			function getCardInfo(cardNum) {
				if(cardNum=='')
					return false;
				var getInfoData = {
					"token":plus.storage.getItem('token'),
					"cardnum":cardNum
				}
				mui.ajax(apiUrl + 'Usersint/check_bank', {
					data: getInfoData,
					type: 'post',
					timeout: 10000,
					success: function(data) {						
						var data = JSON.parse(data);
						if(data.status==1){
							document.forms[0].cardtype.value = data.data.card_type;							
						}else{
							document.forms[0].cardtype.value = '';
							mui.toast('输入卡号不正确');
						}
					}
				});
				
			};
			document.forms[0].cardnum.onblur=function() {				
				getCardInfo(document.forms[0].cardnum.value);
			}
			//提交银行卡数据 
			mui('.mui-content-padded').on('tap','.mui-btn-block',function(){				
				getCardInfo(document.forms[0].cardnum.value);
				if(document.forms[0].cardnum.value==''){
					mui.alert('请输入您的卡号！');
					return false;
				}
				if(document.forms[0].username.value==''){
					mui.alert('请输入持卡人');
					return false;
				}
				if(document.forms[0].cardtype.value==''){
					mui.alert('请输入正确的银行卡号');
					return false;
				}
				if(document.forms[0].bankname1.value==''||document.forms[0].bankid.value==''){
					mui.alert('请完善您的银行卡名称信息')
					return false;
				}
				
				var sendInfoData = {
					"token":plus.storage.getItem('token'),
					"users_name":document.forms[0].username.value,
					"card_num":document.forms[0].cardnum.value,
					"bank_name":document.forms[0].bankname.value,
					"bank_num":document.forms[0].bankid.value,
					"card_type":document.forms[0].cardtype.value
				}
				
				mui.ajax(apiUrl + 'Usersint/save_bank_card', {
					data: sendInfoData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						if(data.status == 1){
							mui.alert('绑定成功！',function(){
								var bankCardList = plus.webview.currentWebview().opener();
								bankCardList.reload();
							})
						}else{
							mui.alert(data.detail)
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
			
			
			//银行卡名称和ID			
			var getInfo = {
				"token": plus.storage.getItem('token')
			}
			mui.ajax(apiUrl +  'Usersint/bank_list', {
				data: getInfo,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					
					var data = JSON.parse(data);
					if(data.data != '') {
						var bankList = data.data;
						
//						$("#nope").trigger("onkeyup");
						$('#nope').autocompleter({
							highlightMatches: true,
							source: bankList,
							template: '{{ label }}',             
							hint: true,
							matchContains: true,
							empty: false,
							limit: 5,
							callback: function(value, index, selected) {
								if(selected) {									
									$("#cmp_id").val(selected.bank_num);
									$("#cmp_name").val(selected.label);
								}
								
							}
						});

						$('input[name="bankname"]').bind('input propertychange', function() {
							$('input[name="bankname"]').trigger('keyup');
						});
					} else {
						mui.alert(data.detail)
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

		})