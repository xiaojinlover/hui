mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {
			document.getElementById('card-info').innerHTML = '<li class="mui-table-view-cell">' + plus.webview.currentWebview().bankName + '（尾号：' + plus.webview.currentWebview().cardNum + '）<span data-card-id="' + plus.webview.currentWebview().bankCardId + '" class="mui-badge mui-badge-danger mui-badge-inverted" id="delete-card" style="font-size: 16px;">解除绑定</span></li>';
		
			mui(document).on('tap','#delete-card',function(){
				var cardId = this.getAttribute('data-card-id');				
				//获取卡列表
				var getInfoData = {
					"token":plus.storage.getItem('token'),
					"users_bank_card_id":cardId
				}
				mui.confirm('确定解绑此银行卡？', function(e) {
					if (e.index == 0) {
						return false;
					} else {
						mui.ajax(apiUrl + 'Usersint/delete_bank_card', {
							data: getInfoData,
							type: 'post',
							timeout: 10000,
							success: function(data) {
								var data = JSON.parse(data);
								if(data.status==1){
									mui.alert('解绑成功',function(){
										var bankCardList = plus.webview.getWebviewById('bank-card-list');
										bankCardList.reload();
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
								mui.alert("参数错误：" + typeinfo);
							}
						});
					}
				})
				
			})
		})