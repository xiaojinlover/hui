mui.init({
			swipeBack: true //启用右滑关闭功能  
		});
		
		//插入操作
		function insertUsersHtml(e){
			var forms = e.detail.forms;
			
			if(forms=='forms0'){
				var usersId = document.forms[0].shen_pi_ren.value;				
				if(usersId.indexOf(e.detail.usersIdArray)>=0 && e.detail.shenHeType == 'shen-he-ren'){
					mui.toast('请不要重复选择审批人！');
					return false;  
				}
				
				
				if(e.detail.shenHeType == 'shen-he-ren'){
					$('#forms0').find('#'+e.detail.id).append(e.detail.usersHtml);
					if(usersId!=''){
						document.forms[0].shen_pi_ren.value = usersId + ',' + e.detail.usersIdArray
					}else{
						document.forms[0].shen_pi_ren.value = e.detail.usersIdArray
					}
					
				}else if(e.detail.shenHeType == 'chao-song-ren'){
					$('#forms0').find('#'+e.detail.id).html(e.detail.usersHtml);
					document.forms[0].chao_song_ren.value = e.detail.usersIdArray
					
				}
			}else if(forms=='forms1'){			
				var usersId = document.forms[1].shen_pi_ren.value;				
				if(usersId.indexOf(e.detail.usersIdArray)>=0 && e.detail.shenHeType == 'shen-he-ren'){
					mui.toast('请不要重复选择审批人！');
					return false;
				}
				
				$('#forms1').find('#'+e.detail.id).append(e.detail.usersHtml);
				if(e.detail.shenHeType == 'shen-he-ren'){
					if(usersId!=''){
						document.forms[1].shen_pi_ren.value = usersId + ',' + e.detail.usersIdArray
					}else{
						document.forms[1].shen_pi_ren.value = e.detail.usersIdArray
					}
					
				}else if(e.detail.shenHeType == 'chao-song-ren'){
					document.forms[1].chao_song_ren.value = e.detail.usersIdArray
					
				}
			}else if(forms=='forms2'){	

				var usersId = document.forms[2].shen_pi_ren.value;	

				if(usersId.indexOf(e.detail.usersIdArray)>=0 && e.detail.shenHeType == 'shen-he-ren'){
					mui.toast('请不要重复选择审批人！');
					return false;
				}
				
				$('#forms2').find('#'+e.detail.id).append(e.detail.usersHtml);
				if(e.detail.shenHeType == 'shen-he-ren'){
					if(usersId!=''){
						document.forms[2].shen_pi_ren.value = usersId + ',' + e.detail.usersIdArray
					}else{
						document.forms[2].shen_pi_ren.value = e.detail.usersIdArray
					}
					
				}else if(e.detail.shenHeType == 'chao-song-ren'){
					document.forms[2].chao_song_ren.value = e.detail.usersIdArray
					
				}
			}else if(forms=='forms3'){			
				var usersId = document.forms[3].shen_pi_ren.value;				
				if(usersId.indexOf(e.detail.usersIdArray)>=0 && e.detail.shenHeType == 'shen-he-ren'){
					mui.toast('请不要重复选择审批人！');
					return false;
				}
				
				$('#forms3').find('#'+e.detail.id).append(e.detail.usersHtml);
				if(e.detail.shenHeType == 'shen-he-ren'){
					if(usersId!=''){
						document.forms[3].shen_pi_ren.value = usersId + ',' + e.detail.usersIdArray
					}else{
						document.forms[3].shen_pi_ren.value = e.detail.usersIdArray
					}
					
				}else if(e.detail.shenHeType == 'chao-song-ren'){
					document.forms[3].chao_song_ren.value = e.detail.usersIdArray
					
				}
			}
			
		}
		window.addEventListener('insertHtml',insertUsersHtml);
		//点击删除动作
		mui('.mui-input-row').on('tap','.image-close',function(){
			var forms = this.getAttribute('data-form');
			var formsIndex = null;
			if(forms == 'forms0'){
				formsIndex = 0;
			}else if(forms == 'forms1'){
				formsIndex = 1;
			}else if(forms == 'forms2'){
				formsIndex = 2;
			}else if(forms == 'forms3'){
				formsIndex = 3;
			}
//			alert(formsIndex)
			var id = this.getAttribute('data-usersid');
			var shenHeType = this.getAttribute('data-type')
			if(shenHeType == 'shen-he-ren'){
				var usersIdArray = document.forms[formsIndex].shen_pi_ren.value;						
				usersIdArray = usersIdArray.split(',');
				removeByValue(usersIdArray, id);
				document.forms[formsIndex].shen_pi_ren.value = usersIdArray;
				this.parentNode.style.display = 'none';
				
			}else if(shenHeType == 'chao-song-ren'){
//				alert(formsIndex)
				var usersIdArray = document.forms[formsIndex].chao_song_ren.value;
				usersIdArray = usersIdArray.split(',');
				removeByValue(usersIdArray, id);
				document.forms[formsIndex].chao_song_ren.value = usersIdArray;
				this.parentNode.style.display = 'none';
			}
			
		})
		//日历
		mui('form').on('tap', '#datetime', function() {
			var options = {
				'type': 'datetime',
				'beginDate': new Date(1900, 01, 01)
			}
			var picker = new mui.DtPicker(options);
			var _this = this;
			picker.show(function(e) {
				_this.value = e.text;
				this.value = e.text;
				picker.dispose();
			})
		});
		//跳转选择审批人与审核人
		mui(document).on('tap','.image-up',function(){
			var shenHeType = this.getAttribute('id'); 
			var forms = this.getAttribute('forms');
			var url ='';
			if(shenHeType == 'shen-he-ren'){
				url = 'jqsq-userlist-shen-he-ren';
			}else{
				url = 'jqsq-userlist';
			}
			
			mui.openWindow({
				url: url + '.html',
				id: url,
				createNew: true,
				extras:{
					shenHeType:shenHeType,
					forms:forms
				},
				show: {
					autoShow: true,
					aniShow: 'slide-in-bottom',
					duration: 200
				},
				waiting: {
					autoShow: false
				}
			});
		})
		
		
		mui('form').on('tap', '#date', function() {
			var options = {
				'type': 'date',
				'beginDate': new Date(1900, 01, 01)
			}
			var picker = new mui.DtPicker(options);
			var _this = this;
			picker.show(function(e) {
				_this.value = e.text;
				this.value = e.text;
				picker.dispose();
			})
		});
		mui.plusReady(function() {
			//获取假勤类型
			var getJiaqinTypeData = {
				"token": plus.storage.getItem('token')
			}

			if(plus.storage.getItem('leave') == null || plus.storage.getItem('leave') == null || plus.storage.getItem('business') == null || plus.storage.getItem('overtime') == null) {
				mui.ajax(apiUrl +  'employee/jia_qin_type', {					
					data: getJiaqinTypeData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						if(data.status == 1) {
							//请假
							var leave = data.data.leave;
							//补卡
							var reclock = data.data.reclock;
							//出差
							var business = data.data.business;
							//加班
							var overtime = data.data.overtime;
							//缓存假勤类型
							plus.storage.setItem('leave', JSON.stringify(leave));
							plus.storage.setItem('reclock', JSON.stringify(reclock));
							plus.storage.setItem('business', JSON.stringify(business));
							plus.storage.setItem('overtime', JSON.stringify(overtime));

							//假勤类型html
							var qingjiaHtml = '<option value="">请选择请假类型</option>'
							mui.each(JSON.parse(plus.storage.getItem('leave')), function(index, item) {
								qingjiaHtml += '<option value="' + item.id + '">' + item.name + '</option>'
							})
							document.getElementById('qingjia-type').innerHTML = qingjiaHtml;

							var bukaHtml = '<option value="">请选择补卡类型</option>'
							mui.each(JSON.parse(plus.storage.getItem('reclock')), function(index, item) {
								bukaHtml += '<option value="' + item.id + '">' + item.name + '</option>'
							})
							document.getElementById('buka-type').innerHTML = bukaHtml;

							var chuchaiHtml = '<option value="">请选择出差类型</option>'
							mui.each(JSON.parse(plus.storage.getItem('business')), function(index, item) {
								chuchaiHtml += '<option value="' + item.id + '">' + item.name + '</option>'
							})
							document.getElementById('gongchu-type').innerHTML = chuchaiHtml;

							var jiabanHtml = '<option value="">请选择加班类型</option>'
							mui.each(JSON.parse(plus.storage.getItem('overtime')), function(index, item) {
								jiabanHtml += '<option value="' + item.id + '">' + item.name + '</option>'
							})
							document.getElementById('jiaban-type').innerHTML = jiabanHtml;

						} else {
							mui.alert('获取请假类型失败！')
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

			} else {
				//假勤类型html
				var qingjiaHtml = '';
				mui.each(JSON.parse(plus.storage.getItem('leave')), function(index, item) {
					qingjiaHtml += '<option value="' + item.id + '">' + item.name + '</option>'
				})
				document.getElementById('qingjia-type').innerHTML = qingjiaHtml;

				var bukaHtml = '';
				mui.each(JSON.parse(plus.storage.getItem('reclock')), function(index, item) {
					bukaHtml += '<option value="' + item.id + '">' + item.name + '</option>'
				})
				document.getElementById('buka-type').innerHTML = bukaHtml;

				var chuchaiHtml = '';
				mui.each(JSON.parse(plus.storage.getItem('business')), function(index, item) {
					chuchaiHtml += '<option value="' + item.id + '">' + item.name + '</option>'
				})
				document.getElementById('gongchu-type').innerHTML = chuchaiHtml;

				var jiabanHtml = '';
				mui.each(JSON.parse(plus.storage.getItem('overtime')), function(index, item) {
					jiabanHtml += '<option value="' + item.id + '">' + item.name + '</option>'
				})
				document.getElementById('jiaban-type').innerHTML = jiabanHtml;
			}
			//请假form提交
			document.getElementsByTagName('form')[0].onsubmit = function() {
				
				if(!this.wage_item_rule_id.value || !this.kai_shi_shi_jian.value || !this.jie_shu_shi_jian.value) {
					mui.alert("请完善您填写的信息");
					return false;
				}
				var qingjiaData = {
					"token": plus.storage.getItem('token'),
					"wage_item_rule_id": this.wage_item_rule_id.value,
					"kai_shi_shi_jian": this.kai_shi_shi_jian.value,
					"jie_shu_shi_jian": this.jie_shu_shi_jian.value,
					"jia_qing_shi_you": this.jia_qing_shi_you.value,
					"shen_pi_ren": this.shen_pi_ren.value,
					"chao_song_ren": this.chao_song_ren.value
				}
//				alert(this.shen_pi_ren.value)
//				alert(this.chao_song_ren.value)
//				return false;
				if(this.shen_pi_ren.value==''){
					mui.alert('请选择审批人');
					return false;
				}
				mui.ajax(apiUrl +  'employee/jia_qin_apply_test', {
					data: qingjiaData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						if(data.status == 1) {
							mui.alert(data.detail);
//							input name="shen_pi_ren" type="hidden" value="" />
//						<input name="chao_song_ren" type="hidden" value="" />
							document.forms[0].shen_pi_ren.value='';
							document.forms[0].chao_song_ren.value='';
							$('#forms0').find('#chao-song-ren-item').html('');
							$('#forms0').find('#shen-he-ren-item').html('');
							
							document.getElementsByTagName('form')[0].reset();
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

				return false;
			}
			//补卡form提交
			document.getElementsByTagName('form')[1].onsubmit = function() {
				
				if(!this.wage_item_rule_id.value || !this.bu_ka_ri_qi.value) {
					mui.alert("请完善您填写的信息");
					return false;
				}
				var qingjiaData = {
					"token": plus.storage.getItem('token'),
					"wage_item_rule_id": this.wage_item_rule_id.value,
					"bu_ka_ri_qi": this.bu_ka_ri_qi.value,
					"jia_qing_shi_you": this.jia_qing_shi_you.value,
					"shen_pi_ren": this.shen_pi_ren.value,
					"chao_song_ren": this.chao_song_ren.value,
					"buka": 1
				}
				if(this.shen_pi_ren.value==''){
					mui.alert('请选择审批人');
					return false;
				}
				mui.ajax(apiUrl +  'employee/jia_qin_apply_test', {
					data: qingjiaData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
//						console.log(data)
						var data = JSON.parse(data);
						if(data.status == 1) {
							mui.alert(data.detail);
							document.getElementsByTagName('form')[1].reset();
							document.forms[1].shen_pi_ren.value='';
							document.forms[1].chao_song_ren.value='';
							$('#forms1').find('#chao-song-ren-item').html('')
							$('#forms1').find('#shen-he-ren-item').html('')
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
				return false;
			}
			//出差form提交
			document.getElementsByTagName('form')[2].onsubmit = function() {
				
				
				if(!this.wage_item_rule_id.value || !this.kai_shi_shi_jian.value || !this.jie_shu_shi_jian.value) {
					mui.alert("请完善您填写的信息");
					return false;
				}
				var qingjiaData = {
					"token": plus.storage.getItem('token'),
					"wage_item_rule_id": this.wage_item_rule_id.value,
					"kai_shi_shi_jian": this.kai_shi_shi_jian.value,
					"jie_shu_shi_jian": this.jie_shu_shi_jian.value,
					"shen_pi_ren": this.shen_pi_ren.value,
					"chao_song_ren": this.chao_song_ren.value,
					"jia_qing_shi_you": this.jia_qing_shi_you.value
				}
				if(this.shen_pi_ren.value==''){
					mui.alert('请选择审批人');
					return false;
				}
				mui.ajax(apiUrl +  'employee/jia_qin_apply_test', {
					data: qingjiaData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						if(data.status == 1) {
							mui.alert(data.detail);
							document.getElementsByTagName('form')[2].reset();
							document.forms[2].shen_pi_ren.value='';
							document.forms[2].chao_song_ren.value='';
							$('#forms2').find('#chao-song-ren-item').html('')
							$('#forms2').find('#shen-he-ren-item').html('')
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
				return false;
			}
			//加班form提交
			document.getElementsByTagName('form')[3].onsubmit = function() {
				
				if(!this.wage_item_rule_id.value || !this.kai_shi_shi_jian.value || !this.jie_shu_shi_jian.value) {
					mui.alert("请完善您填写的信息");
					return false;
				}
				var qingjiaData = {
					"token": plus.storage.getItem('token'),
					"wage_item_rule_id": this.wage_item_rule_id.value,
					"kai_shi_shi_jian": this.kai_shi_shi_jian.value,
					"jie_shu_shi_jian": this.jie_shu_shi_jian.value,
					"jia_qing_shi_you": this.jia_qing_shi_you.value,
					"shen_pi_ren": this.shen_pi_ren.value,
					"chao_song_ren": this.chao_song_ren.value
				}
				if(this.shen_pi_ren.value==''){
					mui.alert('请选择审批人');
					return false;
				}
				mui.ajax(apiUrl +  'employee/jia_qin_apply_test', {
					data: qingjiaData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var data = JSON.parse(data);
						if(data.status == 1) {
							mui.alert(data.detail);
							document.forms[3].shen_pi_ren.value='';
							document.forms[3].chao_song_ren.value='';
							$('#forms3').find('#chao-song-ren-item').html('')
							$('#forms3').find('#shen-he-ren-item').html('')
							document.getElementsByTagName('form')[3].reset();
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
				return false;
			}

		})