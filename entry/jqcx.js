mui.init({
			swipeBack: true //启用右滑关闭功能  
		});

		mui.plusReady(function() {
			
			var param = plus.webview.currentWebview().param;
			
			if(param == 'if_jiaqin'){
				document.getElementById('dai-shen-pi').setAttribute('class','mui-control-item ');
				document.getElementById('yi-shen-pi').setAttribute('class','mui-control-item mui-active');
				document.getElementById('item1').setAttribute('class','mui-control-content');
				document.getElementById('item2').setAttribute('class','mui-control-content mui-active');
			}
			
			//假勤列表
			var getJiaqingData = {
				"token": plus.storage.getItem('token')
			}
			//待审核
			mui.ajax(apiUrl + 'Employee/jia_qin_list', {
				data: getJiaqingData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);

					if(data.status == 1 && data.data != '') {

						var daiShenHeList = '';
						var yiShenHeList = '';
						mui.each(data.data, function(index, item) {
							
							if(item.shen_he_zhuang_tai == '未审核') {								 
								
								var shenHeLiuCheng01 = '';
								var shenHeLiuCheng02 = '';
								if(item.yi_shen_he != '') {

									mui.each(item.yi_shen_he, function(index1, item1) {

										if(index1 == 0) {
											shenHeLiuCheng01 += '<td class="done"><div class="circle"></div></td>'
											shenHeLiuCheng02 += '<td class="text-muted done" width="56">' + item1 + '</td>'
										} else {
											shenHeLiuCheng01 += '<td class="done"><div class="line"></div></td><td class="done"><div class="circle"></div></td>';
											shenHeLiuCheng02 += '<td></td><td class="text-muted done" width="56">' + item1 + '</td>';
										}

									})

								}
								if(item.dai_shen_he != '') {
									mui.each(item.dai_shen_he, function(index2, item2) {
										if(item.yi_shen_he == '' && index2 == 0) {
											shenHeLiuCheng01 += '<td><div class="circle"></div></td>'
											shenHeLiuCheng02 += '<td class="text-muted" width="56">' + item2 + '</td>'
										} else {
											shenHeLiuCheng01 += '<td><div class="line"></div></td><td><div class="circle"></div></td>';
											shenHeLiuCheng02 += '<td></td><td class="text-muted" width="56">' + item2 + '</td>';
										}

									})
								}

								daiShenHeList += '<li class="mui-table-view-cell mui-collapse">' +
									'<a class="mui-navigate-right" href="#">' +
									'<span class="mui-badge mui-badge-inverted size14">' + item.jia_qing_ti_jiao_shi_jian + '</span>' +
									item.wage_item_rule +
									'</a> ' +
									'<div class="mui-collapse-content">' +
									'<table width="100%">' +
									'<tbody>' +
									'<tr>' +
									'<td width="30%" class="text-999 mui-text-center">开始时间</td>' +
									'<td width="70%">' + item.kai_shi_shi_jian + '</td>' +
									'</tr>' +
									'<tr>' +
									'<td width="30%" class="text-999 mui-text-center">结束时间</td>' +
									'<td width="70%">' + item.jie_shu_shi_jian + '</td>' +
									'</tr>' +									
									'<tr>' +
									'<td width="30%" class="text-999 mui-text-center">假勤原因</td>' +
									'<td width="70%">' + item.jia_qing_shi_you + '</td>' +
									'</tr>' +
									'<tr>' +
									'<td width="30%" class="text-999 mui-text-center">审核流程</td>' +
									'<td width="70%">' +
									'<table class="table-step" width="50%">' +
									'<tbody>' +
									'<tr>' +
									shenHeLiuCheng01 +
									'</tr>' +
									'<tr>' +
									shenHeLiuCheng02 +
									'</tr>' +
									'</tbody>' +
									'</table>' +
									'</td>' +
									'</tr>' +
									'</tbody>' +
									'</table>' +
									'<div class="mui-row mui-text-center">' +
									'<a jia-qing-id="' + item.jia_qing_id + '" class="mui-btn mui-btn-link btn-jiaqin-che-xiao text-info">撤销申请</a>' +
									'</div>' +
									'</div>' +
									'</li>';
							} else{
								var time = new Date()
								var dateMonth = time.getMonth()+1
								var jiaqingStartMouth = item.kai_shi_shi_jian.substring(5,7)*1;
								var jiaqingEndMouth = item.jie_shu_shi_jian.substring(5,7)*1;
								
								if(((jiaqingStartMouth>=dateMonth&&jiaqingEndMouth<=dateMonth)||jiaqingStartMouth==dateMonth||jiaqingEndMouth==dateMonth) && item.shen_he_zhuang_tai!='审核驳回' &&param == 'if_jiaqin' && !(item.wage_item_rule=='上班补卡'||item.wage_item_rule=='下班补卡'||item.wage_item_rule=='公出'||item.wage_item_rule=='平日加班'||item.wage_item_rule=='周末加班'||item.wage_item_rule=='公休加班')){
										var shenHeLiuCheng01 = '';
										var shenHeLiuCheng02 = '';
										if(item.yi_shen_he != '') {
											
											mui.each(item.yi_shen_he, function(index1, item1) {
												
												if(index1 == 0) {
													shenHeLiuCheng01 += '<td class="done"><div class="circle"></div></td>'
													shenHeLiuCheng02 += '<td class="text-muted done" width="56">' + item1 + '</td>'
												} else {
													shenHeLiuCheng01 += '<td class="done"><div class="line"></div></td><td class="done"><div class="circle"></div></td>';
													shenHeLiuCheng02 += '<td></td><td class="text-muted done" width="56">' + item1 + '</td>';
												}
		
											})
		
										}
										if(item.dai_shen_he != '') {
											mui.each(item.dai_shen_he, function(index2, item2) {
												if(item.yi_shen_he == '' && index2 == 0) {
													shenHeLiuCheng01 += '<td><div class="circle"></div></td>'
													shenHeLiuCheng02 += '<td class="text-muted" width="56">' + item2 + '</td>'
												} else {
													shenHeLiuCheng01 += '<td><div class="line"></div></td><td><div class="circle"></div></td>';
													shenHeLiuCheng02 += '<td></td><td class="text-muted" width="56">' + item2 + '</td>';
												}
		
											})
										}
										
										yiShenHeList += '<li class="mui-table-view-cell mui-collapse">' +
											'<a class="mui-navigate-right" href="#">' +
											'<span class="mui-badge mui-badge-inverted size14">' + item.jia_qing_ti_jiao_shi_jian + '</span>' +
											item.wage_item_rule +
											'</a> ' +
											'<div class="mui-collapse-content">' +
											'<table width="100%">' +
											'<tbody>' +
											'<tr>' +
											'<td width="30%" class="text-999 mui-text-center">开始时间</td>' +
											'<td width="70%">' + item.kai_shi_shi_jian + '</td>' +
											'</tr>' +
											'<tr>' +
											'<td width="30%" class="text-999 mui-text-center">结束时间</td>' +
											'<td width="70%">' + item.jie_shu_shi_jian + '</td>' +
											'</tr>' +
											'<tr>' +
											'<td width="30%" class="text-999 mui-text-center">审核状态</td>' +
											'<td width="70%">' + item.shen_he_zhuang_tai + '</td>' +
											'</tr>' +
											'<tr>' +
											'<td width="30%" class="text-999 mui-text-center">假勤原因</td>' +
											'<td width="70%">' + item.jia_qing_shi_you + '</td>' +
											'</tr>' +
											'<tr>' +
											'<td width="30%" class="text-999 mui-text-center">审核流程</td>' +
											'<td width="70%">' +
											'<table class="table-step" width="50%">' +
											'<tbody>' +
											'<tr>' +
											shenHeLiuCheng01 +
											'</tr>' +
											'<tr>' +
											shenHeLiuCheng02 +
											'</tr>' +
											'</tbody>' +
											'</table>' +
											'</td>' +
											'</tr>' +
											'</tbody>' +
											'</table>' +
											'</div>' +
											'</li>';
									}
									if(param != 'if_jiaqin'){
										var shenHeLiuCheng01 = '';
										var shenHeLiuCheng02 = '';
										if(item.yi_shen_he != '') {
											
											mui.each(item.yi_shen_he, function(index1, item1) {
												
												if(index1 == 0) {
													shenHeLiuCheng01 += '<td class="done"><div class="circle"></div></td>'
													shenHeLiuCheng02 += '<td class="text-muted done" width="56">' + item1 + '</td>'
												} else {
													shenHeLiuCheng01 += '<td class="done"><div class="line"></div></td><td class="done"><div class="circle"></div></td>';
													shenHeLiuCheng02 += '<td></td><td class="text-muted done" width="56">' + item1 + '</td>';
												}
		
											})
		
										}
										if(item.dai_shen_he != '') {
											mui.each(item.dai_shen_he, function(index2, item2) {
												if(item.yi_shen_he == '' && index2 == 0) {
													shenHeLiuCheng01 += '<td><div class="circle"></div></td>'
													shenHeLiuCheng02 += '<td class="text-muted" width="56">' + item2 + '</td>'
												} else {
													shenHeLiuCheng01 += '<td><div class="line"></div></td><td><div class="circle"></div></td>';
													shenHeLiuCheng02 += '<td></td><td class="text-muted" width="56">' + item2 + '</td>';
												}
		
											})
										}
										
										yiShenHeList += '<li class="mui-table-view-cell mui-collapse">' +
											'<a class="mui-navigate-right" href="#">' +
											'<span class="mui-badge mui-badge-inverted size14">' + item.jia_qing_ti_jiao_shi_jian + '</span>' +
											item.wage_item_rule +
											'</a> ' +
											'<div class="mui-collapse-content">' +
											'<table width="100%">' +
											'<tbody>' +
											'<tr>' +
											'<td width="30%" class="text-999 mui-text-center">开始时间</td>' +
											'<td width="70%">' + item.kai_shi_shi_jian + '</td>' +
											'</tr>' +
											'<tr>' +
											'<td width="30%" class="text-999 mui-text-center">结束时间</td>' +
											'<td width="70%">' + item.jie_shu_shi_jian + '</td>' +
											'</tr>' +
											'<tr>' +
											'<td width="30%" class="text-999 mui-text-center">审核状态</td>' +
											'<td width="70%">' + item.shen_he_zhuang_tai + '</td>' +
											'</tr>' +
											'<tr>' +
											'<td width="30%" class="text-999 mui-text-center">假勤原因</td>' +
											'<td width="70%">' + item.jia_qing_shi_you + '</td>' +
											'</tr>' +
											'<tr>' +
											'<td width="30%" class="text-999 mui-text-center">审核流程</td>' +
											'<td width="70%">' +
											'<table class="table-step" width="50%">' +
											'<tbody>' +
											'<tr>' +
											shenHeLiuCheng01 +
											'</tr>' +
											'<tr>' +
											shenHeLiuCheng02 +
											'</tr>' +
											'</tbody>' +
											'</table>' +
											'</td>' +
											'</tr>' +
											'</tbody>' +
											'</table>' +
											'</div>' +
											'</li>';
									}
								}
						})
						if(daiShenHeList != '')
							document.getElementById('jiaqin-sp-check-list').innerHTML = daiShenHeList;
						if(yiShenHeList != '')
							document.getElementById('jiaqin-sp-checked-list').innerHTML = yiShenHeList;

					}
				},
				beforeSend: function() {
					plus.nativeUI.showWaiting("玩命加载中...", {
						background: "rgba(0,0,0,0.4)"
					});
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				},
				error: function(xhr, typeinfo) {
					mui.alert("参数错误：" + typeinfo);
				}
			});
			//撤销假勤
			mui(document).on('tap', '.btn-jiaqin-che-xiao', function() {
				var _this = this;
				var cheXiaoData = {
					"token":plus.storage.getItem('token'),
					"jia_qing_id":this.getAttribute('jia-qing-id')
				}
				
				mui.ajax(apiUrl + 'employee/jia_qin_delete', {
					data: cheXiaoData,
					type: 'post',
					timeout: 10000,
					success: function(data) {

						var data = JSON.parse(data);

						if(data.status == 1) {
							mui.alert(data.detail);
							_this.parentNode.parentNode.parentNode.style.display='none';
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