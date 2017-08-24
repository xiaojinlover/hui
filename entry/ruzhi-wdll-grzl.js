mui.init({
			swipeBack: true //启用右滑关闭功能

		});
		
		var uploadPhoto = function(imgData){
			var uploadHeaderData = {
				"token": plus.storage.getItem('token'),
				"if_upload":1,
				"yi_cun_zhao":imgData
			}
			
			mui.ajax('http://www.huirenshi.com/V2/App/upload_ycz_image', {
				data: uploadHeaderData,
				type: 'post',
				timeout: 10000,
				success: function(data) {							
					var data = JSON.parse(data);

					mui.toast(data.detail)

				},
				beforeSend: function() {
					plus.nativeUI.showWaiting("头像上传中...");
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
		mui.plusReady(function() {
			mui.previewImage(); 
			//获取基本信息
			function getUserInfo(){
			var getUserInfoData = {
				"token":plus.storage.getItem('token')
			}
			mui.ajax(apiUrl +  'app/get_users_info', {
					data: getUserInfoData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						
						var data = JSON.parse(data);
						if(data.status == 1 && (data.data!=null||data.data!='')) {
							document.getElementById('real_name').innerHTML = data.data.real_name;
							document.getElementById('sex').value = data.data.sex;
							document.getElementById('xue-li').value = data.data.xue_li;
							document.getElementById('hu-ji-xing-zhi').value = data.data.hu_ji_xing_zhi;
							document.getElementById('hun-yin-zhuang-kuang').value = data.data.hun_yin_zhuang_kuang;
							document.getElementById('min_zu').innerHTML = data.data.min_zu;
							document.getElementById('birthday').innerHTML = data.data.birthday;
							document.getElementById('shen_fen_zheng').innerHTML = data.data.shen_fen_zheng;
							document.getElementById('shen_fen_zheng_di_zhhi').innerHTML = data.data.shen_fen_zheng_di_zhhi;
							document.getElementById('xian_zhu_di_zhi').innerHTML = data.data.xian_zhu_di_zhi;
							document.getElementById('lian-xi-dian-hua').innerHTML = data.data.telephone; 
							document.getElementById('email').innerHTML = data.data.email;
							document.getElementById('qq').innerHTML = data.data.qq;
							document.getElementById('jin_ji_lian_xi_ren').innerHTML = data.data.jin_ji_lian_xi_ren;
							document.getElementById('jin_ji_lian_xi_ren_dian_hua').innerHTML = data.data.jin_ji_lian_xi_ren_dian_hua;
//							if(data.data.yi_cun_zhao!=''){
//								document.getElementById('image-view').setAttribute('src',data.data.yi_cun_zhao);	
//								document.getElementById('image-view').setAttribute('class','');
//							}
//							document.getElementById('kai_hu_hang').innerHTML = data.data.kai_hu_hang;
//							document.getElementById('gong_zi_ka_hao').innerHTML = data.data.gong_zi_ka_hao;
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
						if(typeinfo=='abort'){
							mui.alert('连接不到网络，请检查您当前的网络设置');
						}else{
							mui.alert('参数错误' + typeinfo);
						}
					}
				});
			}
			getUserInfo();
			
			//修改（性别）
			document.getElementById('sex').onchange = function(){
				var value = this.value;
				var sexData = {
					"token":plus.storage.getItem('token'),
					"sex":value
				}
				mui.ajax(apiUrl +  'app/update_user_info', {
					data: sexData,
					type: 'post',
					timeout: 10000,
					success: function(data) {						
						var data = JSON.parse(data);						
						mui.toast(data.detail);
						return false;
						
					},
					beforeSend: function() {
						plus.nativeUI.showWaiting("玩命加载中...");
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
			//修改（学历）
			document.getElementById('xue-li').onchange = function(){
				var value = this.value;
				var xueliData = {
					"token":plus.storage.getItem('token'),
					"xue_li":value
				}
				mui.ajax(apiUrl +  'app/update_user_info', {
					data: xueliData,
					type: 'post',
					timeout: 10000,
					success: function(data) {						
						var data = JSON.parse(data);						
						mui.toast(data.detail);
						return false;						
					},
					beforeSend: function() {
						plus.nativeUI.showWaiting("玩命加载中...");
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
			
			//修改（户籍性质）
			document.getElementById('hu-ji-xing-zhi').onchange = function(){
				var value = this.value;
				var xueliData = {
					"token":plus.storage.getItem('token'),
					"hu_ji_xing_zhi":value
				}
				mui.ajax(apiUrl +  'app/update_user_info', {
					data: xueliData,
					type: 'post',
					timeout: 10000,
					success: function(data) {						
						var data = JSON.parse(data);						
						mui.toast(data.detail);
						return false;
						
					},
					beforeSend: function() {
						plus.nativeUI.showWaiting("玩命加载中...");
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
			//修改（婚姻状况）
			document.getElementById('hun-yin-zhuang-kuang').onchange = function(){
				var value = this.value;
				var xueliData = {
					"token":plus.storage.getItem('token'),
					"hun_yin_zhuang_kuang":value
				}
				mui.ajax(apiUrl +  'app/update_user_info', {
					data: xueliData,
					type: 'post',
					timeout: 10000,
					success: function(data) {						
						var data = JSON.parse(data);						
						mui.toast(data.detail);
						return false;
						
					},
					beforeSend: function() {
						plus.nativeUI.showWaiting("玩命加载中...");
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
			//下一步（完善工作经历）
			mui('.mui-content-padded').on('tap','a',function(){
				if(document.getElementById('shen_fen_zheng').innerHTML == ''){
					mui.alert('请完善您的身份证号码');
					return false;
				}
				var href = this.getAttribute('href')
				mui.openWindow({
					url: href + '.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: 'slide-in-right',
					},
					waiting: {
						autoShow: true,
						title: '玩命加载中...'
					},
				})
				return false;
			})
			
			
			//获取教育经历
			if(plus.storage.getItem('edu') == null) { 
				var getEduData = {
					"token": plus.storage.getItem('token')
				}
				mui.ajax(apiUrl +  'app/get_edu_basic', {
					data: getEduData,
					type: 'post',
					timeout: 10000,
					success: function(data) {
						
						var data = JSON.parse(data);
						if(data.status == 1) {
							var edu = data.data;
							plus.storage.setItem('edu',JSON.stringify(edu)) ;
							var xueLiHtml = '<option>请选择</option>';
							mui.each(JSON.parse(plus.storage.getItem('edu')),function(index,item){
								xueLiHtml += '<option value="' + item.name + '">' + item.name + '</option>'
							})
							document.getElementById('xue-li').innerHTML = xueLiHtml;
						} 
					},
					beforeSend: function() {
						plus.nativeUI.showWaiting("玩命加载中...");
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
			} else {
				var xueLiHtml = '<option>请选择</option>';
				mui.each(JSON.parse(plus.storage.getItem('edu')),function(index,item){
					xueLiHtml += '<option value="' + item.name + '">' + item.name + '</option>'
				})
				document.getElementById('xue-li').innerHTML = xueLiHtml;
			}
			
			
			
			//链接
			mui('.mui-table-view-cell').on('tap', 'a', function(e) {
				var dataId = this.childNodes.item(1).getAttribute('id');
				var dataValue = this.childNodes.item(1).innerHTML;
				var dataTitle = this.childNodes.item(1).getAttribute('title');
				if(dataId == 'lian-xi-dian-hua'){
					return false;
				}
				var url = 'ruzhi-wdll-grzl-add'
				if(dataId=='birthday'){
					url = 'ruzhi-wdll-grzl-add-birthday';
				}
				mui.openWindow({
					url: url + '.html',
					id: url,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-bottom"
					},
					extras:{
				        
				        dataValue:dataValue,
				        dataTitle:dataTitle,
				        dataId:dataId
				   },
					waiting: {
						autoShow: false,
						title: '拼命加载中...'
					}
				})
			})
			
		
			
			
			 
		})