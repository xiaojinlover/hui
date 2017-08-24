mui.init({
			swipeBack: true //启用右滑关闭功能  
		});

		mui.plusReady(function() {
			//假勤列表
			var getJiaqingData = {
				"token": plus.storage.getItem('token'),
				"type": "check"
			}

			mui.ajax(apiUrl +  'employee/jia_qin_list_test', {
				data: getJiaqingData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					var jiaqingListChekHtml = '';
					var jiaqingListChekedHtml = ''; 					
					if(data.status == 1 && data.data != '') {
						mui.each(data.data, function(index, item) {
							if(item.shen_he_zhuang_tai == "未审核") {
								jiaqingListChekHtml += '<li class="mui-table-view-cell mui-collapse"><a class="mui-navigate-right" href="#">' + item.real_name + '</a><div class="mui-collapse-content"><table width="100%"><tbody><tr><td width="30%" class="text-999 mui-text-center">申请时间</td><td width="70%">' + item.kai_shi_shi_jian + ' 至 ' + item.jie_shu_shi_jian + '</td></tr><tr><td width="30%" class="text-999 mui-text-center">所属部门</td><td width="70%">' + item.department_name + '</td></tr><tr><td width="30%" class="text-999 mui-text-center">审核状态</td><td width="70%" id="shen-he-zhuangtai-' + item.jia_qing_id + '">' + item.shen_he_zhuang_tai + '</td></tr><tr><td width="30%" class="text-999 mui-text-center">假勤类型</td><td width="70%">' + item.wage_item_rule + '</td></tr><tr><td width="30%" class="text-999 mui-text-center">假勤原因</td><td width="70%" class="text-danger">' + (item.jia_qing_shi_you != null ? item.jia_qing_shi_you : "暂无") + '</td></tr></tbody></table><div class="mui-row ' + (item.shen_he_zhuang_tai != "未审核" ? "mui-hidden" : "") + '"><div class="mui-col-xs-6 mui-text-center"><a class="mui-btn mui-btn-link text-aaa btn-jiaqin-sp" if-agree="0" jia-qing-id="' + item.jia_qing_id + '">拒绝</a></div><div class="mui-col-xs-6 mui-text-center"><a class="mui-btn mui-btn-link btn-jiaqin-sp" if-agree="1" jia-qing-id="' + item.jia_qing_id + '">同意</a></div></div></div></li>';
							}else{
								jiaqingListChekedHtml += '<li class="mui-table-view-cell mui-collapse"><a class="mui-navigate-right" href="#">' + item.real_name + '</a><div class="mui-collapse-content"><table width="100%"><tbody><tr><td width="30%" class="text-999 mui-text-center">申请时间</td><td width="70%">' + item.kai_shi_shi_jian + ' 至 ' + item.jie_shu_shi_jian + '</td></tr><tr><td width="30%" class="text-999 mui-text-center">所属部门</td><td width="70%">' + item.department_name + '</td></tr><tr><td width="30%" class="text-999 mui-text-center">审核状态</td><td width="70%" id="shen-he-zhuangtai-' + item.jia_qing_id + '">' + item.shen_he_zhuang_tai + '</td></tr><tr><td width="30%" class="text-999 mui-text-center">假勤类型</td><td width="70%">' + item.wage_item_rule + '</td></tr><tr><td width="30%" class="text-999 mui-text-center">假勤原因</td><td width="70%" class="text-danger">' + (item.jia_qing_shi_you != null ? item.jia_qing_shi_you : "暂无") + '</td></tr></tbody></table><div class="mui-row ' + (item.shen_he_zhuang_tai != "未审核" ? "mui-hidden" : "") + '"><div class="mui-col-xs-6 mui-text-center"><a class="mui-btn mui-btn-link text-aaa btn-jiaqin-sp" if-agree="0" jia-qing-id="' + item.jia_qing_id + '">拒绝</a></div><div class="mui-col-xs-6 mui-text-center"><a class="mui-btn mui-btn-link btn-jiaqin-sp" if-agree="1" jia-qing-id="' + item.jia_qing_id + '">同意</a></div></div></div></li>';
							}
						})
						 
						if(jiaqingListChekHtml!='')
							document.getElementById('jiaqin-sp-check-list').innerHTML = jiaqingListChekHtml;
						if(jiaqingListChekedHtml!='')
							document.getElementById('jiaqin-sp-checked-list').innerHTML = jiaqingListChekedHtml;
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
			
			//抄送我的
			var getChaosongData = {
				"token": plus.storage.getItem('token'),
				"type": "chaosong"
			}
			
			mui.ajax(apiUrl +  'employee/jia_qin_list_test', {
				data: getChaosongData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					
					var jiaqingListChaosongHtml = ''; 	
					if(data.status == 1 && data.data != '') {
						
						mui.each(data.data, function(index, item) {		
							
							jiaqingListChaosongHtml += '<li class="mui-table-view-cell mui-collapse"><a class="mui-navigate-right" href="#">' + item.real_name + '</a><div class="mui-collapse-content"><table style="border-bottom: none" width="100%"><tbody><tr><td width="30%" class="text-999 mui-text-center">申请时间</td><td width="70%">' + item.kai_shi_shi_jian + ' 至 ' + item.jie_shu_shi_jian + '</td></tr><tr><td width="30%" class="text-999 mui-text-center">所属部门</td><td width="70%">' + item.department_name + '</td></tr><tr><td width="30%" class="text-999 mui-text-center">审核状态</td><td width="70%" id="shen-he-zhuangtai-' + item.jia_qing_id + '">' + item.shen_he_zhuang_tai + '</td></tr><tr><td width="30%" class="text-999 mui-text-center">假勤类型</td><td width="70%">' + item.wage_item_rule + '</td></tr><tr><td width="30%" class="text-999 mui-text-center">假勤原因</td><td width="70%" class="text-danger">' + (item.jia_qing_shi_you != null ? item.jia_qing_shi_you : "暂无") + '</td></tr></tbody></table></div></li>';
							
						}) 			 			 
						
						if(jiaqingListChaosongHtml!='')
							document.getElementById('jiaqin-sp-chaosong-list').innerHTML = jiaqingListChaosongHtml;
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
			
			//假勤审批（动作）
			mui(document).on('tap', '.btn-jiaqin-sp', function() {
				
				var _this = this;
				var isAgree = this.getAttribute('if-agree');
				var jiaQingId = this.getAttribute('jia-qing-id');
				
				if(isAgree == 1) {
					var jiaqingCheckData = {
						"token": plus.storage.getItem('token'),
						"jia_qing_id": jiaQingId,
						"check_type": 1
					}
				} else {
					var jiaqingCheckData = {
						"token": plus.storage.getItem('token'),
						"jia_qing_id": jiaQingId,
						"check_type": 2
					}
				}

				mui.ajax(apiUrl +  'employee/jia_qin_check', {
					data: jiaqingCheckData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						if(data.status == 1) {
							var shenHeZhuangTaiId = 'shen-he-zhuangtai-' + jiaQingId;
							document.getElementById(shenHeZhuangTaiId).innerHTML = data.detail;
							mui.alert('提交成功');
							_this.parentNode.parentNode.parentNode.parentNode.style.display = "none";
						} else {
							mui.alert(data.detail);
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
		})