mui.init({
			swipeBack: true //启用右滑关闭功能  
		});

		mui.plusReady(function() {
			//假勤列表
			var getJiaqingData = {
				"token": plus.storage.getItem('token')				
			}
			//待审核
			mui.ajax(apiUrl +  'Employee/jia_qin_wait_shen', {
				data: getJiaqingData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					
					if(data.status == 1&&data.data!=''){
						
						var daiShenHeList = ''; 
						mui.each(data.data,function(index,item){ 
							var shenHeLiuCheng01 = '';
							var shenHeLiuCheng02 = '';							
							if(item.yi_shen_he!=''){
								
								mui.each(item.yi_shen_he,function(index1,item1){
									 
									if(index1==0){
										shenHeLiuCheng01 += '<td class="done"><div class="circle"></div></td>'
										shenHeLiuCheng02 += '<td class="text-muted done" width="56">' + item1 + '</td>'
									}else{
										shenHeLiuCheng01 += '<td class="done"><div class="line"></div></td><td class="done"><div class="circle"></div></td>';
										shenHeLiuCheng02 += '<td></td><td class="text-muted done" width="56">' + item1 + '</td>';
									}
									
								})  
								
								
							}
							if(item.dai_shen_he!=''){
								mui.each(item.dai_shen_he,function(index2,item2){
									if(item.yi_shen_he=='' && index2==0){ 
										shenHeLiuCheng01 += '<td><div class="circle"></div></td>'
										shenHeLiuCheng02 += '<td class="text-muted" width="56">' + item2 + '</td>'
									}else{
										shenHeLiuCheng01 += '<td><div class="line"></div></td><td><div class="circle"></div></td>';
										shenHeLiuCheng02 += '<td></td><td class="text-muted" width="56">' + item2 + '</td>';
									}
									
								})
							}
							 
							daiShenHeList += '<li class="mui-table-view-cell mui-collapse">'+
						'<a class="mui-navigate-right" href="#">'+
							'<img class="mui-media-object mui-pull-left" src="' + (!!item.users_image?item.users_image:"images/logo-white.png") + '">'+
							'<div class="mui-media-body">'+
								item.real_name+' <small class="text-999">' + item.department_name + '</small>'+  
								'<p>请假类型：<span class="text-333">' + item.wage_item_rule + '</span></p>'+
								'<p>申请时间：<span class="text-333">' + item.jia_qing_ti_jiao_shi_jian + '</span></p>'+
							'</div>'+
						'</a>'+
						'<div class="mui-collapse-content">'+
							'<table width="100%">'+
								'<tbody>'+
									'<tr>'+
										'<td width="30%" class="text-999 mui-text-center">' + (item.wage_item_rule=="上班补卡"||item.wage_item_rule=="下班补卡"?"补卡时间":"开始时间")  + '</td>'+
										'<td width="70%">' + item.kai_shi_shi_jian+ '</td>'+
									'</tr>'+
									
									'<tr class="' + (item.wage_item_rule=="上班补卡"||item.wage_item_rule=="下班补卡"?"mui-hidden":"")  + '">'+
										'<td width="30%" class="text-999 mui-text-center">结束时间</td>'+
										'<td width="70%">' + item.jie_shu_shi_jian + '</td>'+
									'</tr>'+
									'<tr>'+
										'<td width="30%" class="text-999 mui-text-center">假勤原因</td>'+
										'<td width="70%">' + item.jia_qing_shi_you + '</td>'+
									'</tr>'+  
									'<tr>'+
										'<td width="30%" class="text-999 mui-text-center">审核流程</td>'+
										'<td width="70%">'+
											'<table class="table-step" width="50%">'+										
									        		'<tbody>'+
									        			'<tr>'+
										        			shenHeLiuCheng01+ 
										        		'</tr>'+
										        		'<tr>'+
															shenHeLiuCheng02+  
										            	'</tr>'+
										        	'</tbody>'+
											'</table>'+
										'</td>'+
									'</tr>'+
								'</tbody>'+
							'</table>'+
							'<div class="mui-row">'+
								'<div class="mui-col-xs-6 mui-text-center">'+ 
									'<a class="mui-btn mui-btn-link text-aaa btn-jiaqin-sp" if-agree="0" jia-qing-id="' + item.jia_qing_id + '">拒绝</a>'+
								'</div>'+
								'<div class="mui-col-xs-6 mui-text-center">'+
									'<a class="mui-btn mui-btn-link btn-jiaqin-sp" if-agree="1" jia-qing-id="' + item.jia_qing_id + '">同意</a>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</li>';
					
						})
						
						document.getElementById('dai-shen-he-list').innerHTML = daiShenHeList;
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
			 
			//假勤审批（动作）
			mui(document).on('tap', '.btn-jiaqin-sp', function() {
				var _this = this;
				var isAgree = this.getAttribute('if-agree');
				var jiaQingId = this.getAttribute('jia-qing-id');
				if(isAgree == 1){
					var jiaqingCheckData = {
						"token":plus.storage.getItem('token'),
						"jia_qing_id":jiaQingId,
						"check_type":1
					}
				}else{
					var jiaqingCheckData = {
						"token":plus.storage.getItem('token'),
						"jia_qing_id":jiaQingId,
						"check_type":2
					}
				}
				
				mui.ajax(apiUrl +  'Employee/jia_qin_check', {
					
					data: jiaqingCheckData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						if(data.status == 1) {

							mui.alert('提交成功');
							_this.parentNode.parentNode.parentNode.parentNode.style.display = "none";
						}else{
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
			
			
			//已审核
			mui.ajax(apiUrl +  'Employee/jia_qin_have_shen', {
				data: getJiaqingData,
				type: 'post', 
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					
					if(data.status == 1&&data.data!=''){
						
						var yiShenHeList = ''; 
						mui.each(data.data,function(index,item){ 
							var shenHeLiuCheng01 = '';
							var shenHeLiuCheng02 = '';							
							if(item.yi_shen_he!=''){
								
								mui.each(item.yi_shen_he,function(index1,item1){
									 
									if(index1==0){
										shenHeLiuCheng01 += '<td class="done"><div class="circle"></div></td>';
										shenHeLiuCheng02 += '<td class="text-muted done" width="56">' + item1 + '</td>'
									}else{
										shenHeLiuCheng01 += '<td class="done"><div class="line"></div></td><td class="done"><div class="circle"></div></td>';
										shenHeLiuCheng02 += '<td></td><td class="text-muted done" width="56">' + item1 + '</td>';
									}
									
								})  
								
								
							}
							if(item.dai_shen_he!=''){
								mui.each(item.dai_shen_he,function(index2,item2){
									if(item.yi_shen_he==''){
										shenHeLiuCheng01 += '<td><div class="circle"></div></td>'
										shenHeLiuCheng02 += '<td class="text-muted" width="56">' + item2 + '</td>'
									}else{
										shenHeLiuCheng01 += '<td><div class="line"></div></td><td><div class="circle"></div></td>';
										shenHeLiuCheng02 += '<td></td><td class="text-muted" width="56">' + item2 + '</td>';
									}
									
								})
							}
							 
							yiShenHeList += '<li class="mui-table-view-cell mui-collapse">'+
						'<a class="mui-navigate-right" href="#">'+
							'<img class="mui-media-object mui-pull-left" src="' + (!!item.users_image?item.users_image:"images/logo-white.png") + '">'+
							'<div class="mui-media-body">'+
								item.real_name+' <small class="text-999">' + item.department_name + '</small>'+  
								'<p>请假类型：<span class="text-333">' + item.wage_item_rule + '</span></p>'+
								'<p>申请时间：<span class="text-333">' + item.jia_qing_ti_jiao_shi_jian + '</span></p>'+
							'</div>'+
						'</a>'+
						'<div class="mui-collapse-content">'+
							'<table width="100%" style="border-bottom:none">'+
								'<tbody>'+
									'<tr>'+
										'<td width="30%" class="text-999 mui-text-center">' + (item.wage_item_rule=="上班补卡"||item.wage_item_rule=="下班补卡"?"补卡时间":"开始时间")  + '</td>'+
										'<td width="70%">' + item.kai_shi_shi_jian+ '</td>'+
									'</tr>'+
									'<tr class="' + (item.wage_item_rule=="上班补卡"||item.wage_item_rule=="下班补卡"?"mui-hidden":"")  + '">'+
										'<td width="30%" class="text-999 mui-text-center">结束时间</td>'+
										'<td width="70%">' + item.jie_shu_shi_jian + '</td>'+
									'</tr>'+
									'<td width="30%" class="text-999 mui-text-center">审核状态</td>' +
									'<td width="70%">' + item.shen_he_zhuang_tai + '</td>' +
									'</tr>' +
									'<tr>'+
										'<td width="30%" class="text-999 mui-text-center">假勤原因</td>'+
										'<td width="70%">' + item.jia_qing_shi_you + '</td>'+
									'</tr>'+  
									'<tr>'+
										'<td width="30%" class="text-999 mui-text-center">审核流程</td>'+
										'<td width="70%">'+
											'<table class="table-step" width="50%">'+										
									        		'<tbody>'+
									        			'<tr>'+
										        			shenHeLiuCheng01+ 
										        		'</tr>'+	
										        		'<tr>'+
										        			shenHeLiuCheng02+ 
										        		'</tr>'+
										        	'</tbody>'+
											'</table>'+
										'</td>'+
									'</tr>'+
								'</tbody>'+
							'</table>'+
							
						'</div>'+
					'</li>';
						})
//						alert (document.getElementById('yi-shen-he-list'))
						document.getElementById('yi-shen-he-list').innerHTML = yiShenHeList;
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
			
			//抄送我的
			mui.ajax(apiUrl +  'Employee/jia_qin_chao_song', {
				data: getJiaqingData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					
					var data = JSON.parse(data);
					
					if(data.status == 1&&data.data!=''){
						
						var chaoSongList = ''; 
						mui.each(data.data,function(index,item){ 
							var shenHeLiuCheng01 = '';
							var shenHeLiuCheng02 = '';							
							
							if(item.yi_shen_he!=''){
								
								mui.each(item.yi_shen_he,function(index1,item1){
									 
									if(index1==0){
										shenHeLiuCheng01 += '<td class="done"><div class="circle"></div></td>'
										shenHeLiuCheng02 += '<td class="text-muted done" width="56">' + item1 + '</td>'
									}else{
										shenHeLiuCheng01 += '<td class="done"><div class="line"></div></td><td class="done"><div class="circle"></div></td>';
										shenHeLiuCheng02 += '<td></td><td class="text-muted done" width="56">' + item1 + '</td>';
									}
									
								})  
								
								
							}
							if(item.dai_shen_he!=''){
								mui.each(item.dai_shen_he,function(index2,item2){
									if(item.yi_shen_he=='' && index2==0){ 
										shenHeLiuCheng01 += '<td><div class="circle"></div></td>'
										shenHeLiuCheng02 += '<td class="text-muted" width="56">' + item2 + '</td>'
									}else{
										shenHeLiuCheng01 += '<td><div class="line"></div></td><td><div class="circle"></div></td>';
										shenHeLiuCheng02 += '<td></td><td class="text-muted" width="56">' + item2 + '</td>';
									}
									
								})
							}
							 
							chaoSongList += '<li class="mui-table-view-cell mui-collapse">'+
						'<a class="mui-navigate-right" href="#">'+
							'<img class="mui-media-object mui-pull-left" src="' + (!!item.users_image?item.users_image:"images/logo-white.png") + '">'+
							'<div class="mui-media-body">'+
								item.real_name+' <small class="text-999">' + item.department_name + '</small>'+  
								'<p>请假类型：<span class="text-333">' + item.wage_item_rule + '</span></p>'+
								'<p>申请时间：<span class="text-333">' + item.jia_qing_ti_jiao_shi_jian + '</span></p>'+
							'</div>'+
						'</a>'+
						'<div class="mui-collapse-content">'+ 
							'<table width="100%" style="border-bottom:none">'+
								'<tbody>'+
									'<tr>'+
										'<td width="30%" class="text-999 mui-text-center">' + (item.wage_item_rule=="上班补卡"||item.wage_item_rule=="下班补卡"?"补卡时间":"开始时间")  + '</td>'+
										'<td width="70%">' + item.kai_shi_shi_jian+ '</td>'+
									'</tr>'+
									'<tr class="' + (item.wage_item_rule=="上班补卡"||item.wage_item_rule=="下班补卡"?"mui-hidden":"")  + '">'+
										'<td width="30%" class="text-999 mui-text-center">结束时间</td>'+
										'<td width="70%">' + item.jie_shu_shi_jian + '</td>'+
									'</tr>'+
									'<tr>' +
									'<td width="30%" class="text-999 mui-text-center">审核状态</td>' +
									'<td width="70%">' + item.shen_he_zhuang_tai + '</td>' +
									'</tr>' +
									'<tr>'+
										'<td width="30%" class="text-999 mui-text-center">假勤原因</td>'+
										'<td width="70%">' + item.jia_qing_shi_you + '</td>'+
									'</tr>'+  
									'<tr>'+
										'<td width="30%" class="text-999 mui-text-center">审核流程</td>'+
										'<td width="70%">'+
											'<table class="table-step" width="50%">'+										
									        		'<tbody>'+
									        			'<tr>'+
										        			shenHeLiuCheng01+ 
										        		'</tr>'+
										        		'<tr>'+
															shenHeLiuCheng02+  
										            	'</tr>'+
										        	'</tbody>'+
											'</table>'+
										'</td>'+
									'</tr>'+
								'</tbody>'+
							'</table>'+							
						'</div>'+
					'</li>';
						})
						
						document.getElementById('chao-song-list').innerHTML = chaoSongList;
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
		})