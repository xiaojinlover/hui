mui.init({
			swipeBack: true //启用右滑关闭功能		
		});

		mui.plusReady(function() {
			var getInfoData = {
				"token": plus.storage.getItem('token')
				
			}
			
			mui.ajax(apiUrl + 'Usersint/have_int_list', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					var gongziListHtml = '';
					if(data.data.have_int_list != '') {
						mui.each(data.data.have_int_list, function(index, item) {
							gongziListHtml += '<li class="mui-table-view-cell"><div class="mui-media-body">' + item.in_out + item.remark + '<p class="mui-ellipsis">' + item.add_time + '</p></div><span class="mui-badge mui-badge-inverted ' + (item.int_num < 0 ? "text-danger" : "text-blue") + '">' + item.int_num + "</span></li>";
						})
					}
					if(gongziListHtml != '')						
						document.getElementById('yi-wan-cheng').innerHTML = gongziListHtml;

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
					if(typeinfo == 'abort') {
						mui.alert('连接不到网络，请检查您当前的网络设置');
					} else {
						mui.alert('参数错误' + typeinfo);
					}
				}
			});
			
			//进行中
			var jinxingzhongData = {
				"token":plus.storage.getItem('token'),
				"type":1				
			}
			mui.ajax(apiUrl + 'Usersint/tran_manage', {
				data: jinxingzhongData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					
					var data = JSON.parse(data);
					var jinxingzhongListHtml = '';
					if(data.data != '') {
						mui.each(data.data, function(index, item) {
							jinxingzhongListHtml += '<li class="mui-table-view-cell"><div class="mui-media-body">' + item.in_out + "(" + item.remark + ')<p class="mui-ellipsis">' + item.add_time + '</p></div><span class="mui-badge mui-badge-inverted ' + (item.int_num < 0 ? "text-danger" : "text-blue") + '">' + item.int_num + "</span></li>"
						})
					}
					if(jinxingzhongListHtml != '')						
						document.getElementById('jin-xing-zhong').innerHTML = jinxingzhongListHtml;

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
					if(typeinfo == 'abort') {
						mui.alert('连接不到网络，请检查您当前的网络设置');
					} else {
						mui.alert('参数错误' + typeinfo);
					}
				}
			});
			//已失败
			var yishibaiData = {
				"token":plus.storage.getItem('token'),
				"type":2
				
			}
			mui.ajax(apiUrl + 'Usersint/tran_manage', {
				data: yishibaiData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					
					var data = JSON.parse(data);
					var yishibaiListHtml = '';
					if(data.data != '') {
						mui.each(data.data, function(index, item) {
							yishibaiListHtml += '<li class="mui-table-view-cell"><div class="mui-media-body">' + item.in_out + "(" + item.remark + ')<p class="mui-ellipsis">' + item.add_time + '</p></div><span class="mui-badge mui-badge-inverted ' + (item.int_num < 0 ? "text-danger" : "text-blue") + '">' + item.int_num + "</span></li>"
						})
					}
					if(yishibaiListHtml != '')						
						document.getElementById('yi-shi-bai').innerHTML = yishibaiListHtml;

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
					if(typeinfo == 'abort') {
						mui.alert('连接不到网络，请检查您当前的网络设置');
					} else {
						mui.alert('参数错误' + typeinfo);
					}
				}
			});

		})