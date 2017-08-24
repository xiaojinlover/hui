mui.init({
			swipeBack: true //启用右滑关闭功能 
		});
		
		mui.plusReady(function() {
			
			function closeWebvie(){
				var ruzhiwdllgrzl = plus.webview.getWebviewById('ruzhi-wdll-grzl');
				var ruzhiwdlljyjl = plus.webview.getWebviewById('ruzhi-wdll-jyjl');
				var ruzhiwdllgzjl = plus.webview.getWebviewById('ruzhi-wdll-gzjl');
				var ruzhiwdlljtbj = plus.webview.getWebviewById('ruzhi-wdll-jtbj');
				var ruzhiwdlljyjl = plus.webview.getWebviewById('ruzhi-wdll-jyjl');
				var lijiruzhi = plus.webview.getWebviewById('li-ji-ru-zhi');
				if(ruzhiwdllgrzl!=null)
					ruzhiwdllgrzl.close();
				if(ruzhiwdlljyjl!=null)
					ruzhiwdlljyjl.close();
				if(ruzhiwdllgzjl!=null)
					ruzhiwdllgzjl.close();
				if(ruzhiwdlljtbj!=null)
					ruzhiwdlljtbj.close();
				if(ruzhiwdlljyjl!=null)
					ruzhiwdlljyjl.close();
				if(lijiruzhi!=null)
					lijiruzhi.close();					
			}
			
			//获取公司部门
			var getInfo = {
				"token": plus.storage.getItem('token')
			}
			mui.ajax(apiUrl +  'Employee/get_department_list', {
				data: getInfo,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					
					var data = JSON.parse(data);
					if(data.data != '') {
						var company = data.data;
						
						$("#nope").trigger("onkeyup");
						$('#nope').autocompleter({
							highlightMatches: true,
							source: company,
							template: '{{ label }} ',             
							hint: true,
							matchContains: true,
							empty: true,
							limit: 5,
							callback: function(value, index, selected) {
								if(selected) {
									$('.icon').css('background-color', selected.hex);
									$("#department_id").val(selected.department_id);

								}
							}
						});

						$('input').bind('input propertychange', function() {
							$('input').trigger('keyup');
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
			
			var zwpjGetData = {
				"token":plus.storage.getItem('token'),
//				"self_judge":document.forms[0].self_judge.value,
//				"job_plan":document.forms[0].job_plan.value,
				"type":"get"
			}
			//获取自我评价
			mui.ajax(apiUrl + 'Employee/self_judge', {
						data: zwpjGetData,
						type: 'post',
						timeout: 10000,
						success: function(data) {	
							
							var data = JSON.parse(data);	
							if(data.status==1 && data.data!=null){ 
								document.forms[0].self_judge.value = data.data.self_judge;
								document.forms[0].job_plan.value = data.data.job_plan;
								$('#department_id').val(data.data.department_id);
								$('#nope').val(data.data.department_name);
								if(data.data.yi_cun_zhao!=''){									
									$('#image-view').attr('src',data.data.yi_cun_zhao);
									$('#image-view').removeClass('mui-hidden')
								}
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
					
					
			//完成入职取消入职
			
			mui('.mui-content-padded').on('tap','a',function(){				
				
				var id = this.getAttribute('id');
				if(id=='wan-cheng-ru-zhi'){
					var zwpjData = {
						"token":plus.storage.getItem('token'),
						"self_judge":document.forms[0].self_judge.value,
						"job_plan":document.forms[0].job_plan.value,
						"department_id":$('#department_id').val(),
						"type":"update"
					}
					
					mui.ajax(apiUrl + 'Employee/self_judge', {
						data: zwpjData,
						type: 'post',
						timeout: 10000,
						success: function(data) {
							var data = JSON.parse(data);
							closeWebvie()
							document.activeElement.blur();
							mui.openWindow({
								url: 'index.html',
								id: 'index',
								createNew: true,
								show: {
									autoShow: true,
									aniShow: "slide-in-right"
								},
								waiting: {
									autoShow: false,
									title: '拼命加载中...'
								}
							});
							
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
					
					
				}else{
					mui.confirm('是否确定取消入职',function(e){
						if(e.index==1){
							var cancelLizhiData = {
								"token":plus.storage.getItem('token')
							}
							mui.ajax(apiUrl + 'Employee/cancel_entry', {
								data: cancelLizhiData,
								type: 'post',
								timeout: 10000,
								success: function(data) {
									
									var data = JSON.parse(data);
									if(data.status==1){
										mui.alert(data.detail,function(){
											closeWebvie();
											document.activeElement.blur();
											mui.openWindow({
												url: 'index.html',
												id: 'index',
												createNew: true,
												show: {
													autoShow: true,
													aniShow: "slide-in-right"
												},
												waiting: {
													autoShow: false,
													title: '拼命加载中...'
												}
											});
											
										});
									}else{
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
									mui.alert("参数错误：" + typeinfo);   
								}
							});
						}	
					})
				}
			})
			 
			//上传照片
			mui.previewImage(); 
			
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
			//点击头像触发
			mui(document).on("tap", "#btn-box", function(e) { 
				if(mui.os.plus) {
					var a = [{
						title: "拍照"
					}, {
						title: "从手机相册选择"
					}];
					plus.nativeUI.actionSheet({
						title: "上传加盟凭证",
						cancel: "取消",
						buttons: a
					}, function(b) {
						switch(b.index) {
							case 0:
								break;
							case 1:
								getImage(); /*拍照*/
								break;
							case 2:
								galleryImg(); /*打开相册*/
								break;
							default:
								break
						}
					})
				}
			});
			//拍照
			function getImage() {
				var c = plus.camera.getCamera();
				c.captureImage(function(e) {
					plus.io.resolveLocalFileSystemURL(e, function(entry) {
						var s = entry.toLocalURL() + "?version=" + new Date().getTime();						
						
						if(isAndroidIos()=='isIos'){
							//旋转图片
							plus.zip.compressImage({
									src:s,
									dst:s,
									overwrite:true,
									rotate:-90,										
								},
								function() {
									var image = new Image();
									image.src = s;
									image.onload = function() {
										var imgData = getBase64Image(image);												
										document.getElementById('image-view').setAttribute('src','data:image/png;base64,' + imgData);	
										document.getElementById('image-view').setAttribute('class','');    
										uploadPhoto(imgData);
									}
									
								},function(error) {
									console.log("旋转失败!");
							});
						}else{
							var image = new Image();
							image.src = s;
							image.onload = function() {
								var imgData = getBase64Image(image);												
								document.getElementById('image-view').setAttribute('src','data:image/png;base64,' + imgData);	
								document.getElementById('image-view').setAttribute('class','');   
								uploadPhoto(imgData);
								
							}
						}
						

					}, function(e) {
						console.log("读取拍照文件错误：" + e.message);
					});
				}, function(s) {
					console.log("error" + s);
				}, {
					filename: "_doc/zhengjian.png"
				})
			}
			//本地相册选择
			function galleryImg() {
				plus.gallery.pick(function(a) {
					plus.io.resolveLocalFileSystemURL(a, function(entry) {
						plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
							
							root.getFile("zhengjian.png", {}, function(file) {								
								//文件已存在
								file.remove(function() {									
									entry.copyTo(root, 'zhengjian.png', function(e) {
											var path = e.fullPath + "?version=" + new Date().getTime();
											var image = new Image();
											image.src = path;
											image.onload = function() {
												var imgData = getBase64Image(image);												
												document.getElementById('image-view').setAttribute('src','data:image/png;base64,' + imgData);	
												document.getElementById('image-view').setAttribute('class','');
//												$('input[name="file"]').val(imgData);
												uploadPhoto(imgData);
											}
										},
										function(e) {
											console.log('copy image fail:' + e.message);
										});
								}, function() {
									console.log("delete image fail:" + e.message);
								});
							}, function() { 
								//文件不存在
								entry.copyTo(root, 'zhengjian.png', function(e) {
										var path = e.fullPath + "?version=" + new Date().getTime();
										var image = new Image();
										image.src = path;
										image.onload = function() {
											var imgData = getBase64Image(image);												
											document.getElementById('image-view').setAttribute('src','data:image/png;base64,' + imgData);	
											document.getElementById('image-view').setAttribute('class','');  
											uploadPhoto(imgData);
//											$('input[name="file"]').val(imgData);

										}

									},
									function(e) {
										console.log('copy image fail:' + e.message);
									});
							});
						}, function(e) {
							console.log("get _www folder fail");
						})
					}, function(e) {
						console.log("读取拍照文件错误：" + e.message);
					});
				}, function(a) {}, {   
					filter: "image"
				})
			};
			//将图片压缩转成base64 
			function getBase64Image(img) {
				var canvas = document.createElement("canvas"); 
				var imgwidth = img.width;
				
				if(imgwidth<=960){
					var imgwidth = img.width/2;
					var imgheight = img.height/2;
				}else if(imgwidth>960&&imgwidth<2448){
					var imgwidth = img.width/3;
					var imgheight = img.height/3;
				}else{
					var imgwidth = img.width/6;
					var imgheight = img.height/6;
				}
				
				//裁剪图片
				var top = 0;
				var left = 0;
				canvas.width = imgwidth; /*设置新的图片的宽度*/
				canvas.height = imgheight; /*设置新的图片的长度*/
				var ctx = canvas.getContext("2d");
				
				ctx.drawImage(img, -left, -top, imgwidth, imgheight); /*绘图*/
				var dataURL = canvas.toDataURL("image/png", 0.1);
//				return dataURL;
				return dataURL.replace("data:image/png;base64,", "");
			} 
			
		}) 