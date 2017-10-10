mui.plusReady(function() {		
			var getInfoData = {
				token:plus.storage.getItem('token')
			}
			mui.ajax(apiUrl + 'Usersint/stay_back_list', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					
					var data = JSON.parse(data);
					if(data.status == 1) {						
					
						var daizengListHtml = '';
						if(data.data.total_already_int!=''){
							daizengListHtml = '<li class="mui-table-view-cell">累计转出福利券<p>' + data.data.last_back_time + '</p><span class="mui-badge mui-badge-inverted">' + data.data.total_already_int + '</span></li>'
						}
						if(data.data.stay_back_list!=''){
							mui.each(data.data.stay_back_list,function(index,item){
								daizengListHtml += '<li class="mui-table-view-cell">' + item.remark + '<p>' + item.add_time + '</p><span class="mui-badge mui-badge-inverted">' + item.int_num + '</span></li>'
							})
						}						
						document.getElementById('dai-zeng-list').innerHTML = daizengListHtml; 
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