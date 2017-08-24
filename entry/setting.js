mui.init({
			swipeBack: true //启用右滑关闭功能
		});
		//头像预览
		mui.previewImage(); 
		mui.plusReady(function() {
			//
			document.getElementById('head-img1').setAttribute('src',plus.storage.getItem('users_image'));
			document.getElementById('xing-ming').innerHTML = plus.storage.getItem('real_name') + '<p class="mui-ellipsis" >' + (plus.storage.getItem('zhi_wei') != null ? plus.storage.getItem('zhi_wei') : '暂无') + '</p>';
			
			if(plus.storage.getItem('if_company')==1){
				document.getElementById('ji-ben-zi-liao').className = 'mui-hidden';
				document.getElementById('zhi-wei-xin-xi').className = 'mui-hidden';
				document.getElementById('ji-ben-zi-liao-divider').className = 'mui-hidden';
				
			}
			
			//选项卡
			mui('.mui-bar-tab').on('tap', 'a', function(e) {

					var href = this.getAttribute('href');
					if(href == "index" && plus.storage.getItem('if_company') == 1) {
						href = "index-boss";
					} else if(href == "index" && plus.storage.getItem('if_company') != 1){
						href = "index";
					}
					mui.openWindow({
						url: href + '.html',
						id: href,
						createNew: false,
						show: {
							autoShow: true,
							aniShow: false
						},
						waiting: {
							autoShow: true,
							title: '拼命加载中...'
						},

					})
				})
				//链接
				
			mui('.mui-table-view-cell-sub').on('tap', 'a', function(e) {

				var href = this.getAttribute('href');
				
				mui.openWindow({
					url: href + '.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-right"
					},
					waiting: {
						autoShow: true,
						title: '拼命加载中...'
					},

				})
				
			})

			
			//点击头像触发
			mui(".mui-table-view-cell").on("tap", "#xing-ming", function(e) {
				if(mui.os.plus) {
					var a = [{
						title: "拍照"
					}, {
						title: "从手机相册选择"
					}];
					plus.nativeUI.actionSheet({
						title: "修改头像",
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

//				e.stopPropagation()
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
									uploadHead(s); /*上传图片*/
									console.log("旋转成功!");
								},function(error) {
									console.log("旋转失败!");
							});
						}else{
							uploadHead(s); /*上传图片*/
						}
						

					}, function(e) {
						console.log("读取拍照文件错误：" + e.message);
					});
				}, function(s) {
					console.log("error" + s);
				}, {
					filename: "_doc/head.png"
				})
			}

			//本地相册选择
			function galleryImg() {
				plus.gallery.pick(function(a) {
					plus.io.resolveLocalFileSystemURL(a, function(entry) {
						plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
							
							root.getFile("head.png", {}, function(file) {
								
								//文件已存在
								file.remove(function() {
									
									entry.copyTo(root, 'head.png', function(e) {
											var path = e.fullPath + "?version=" + new Date().getTime();
											console.log(e.fullPath)
											uploadHead(path); /*上传图片*/ 
											  
										},
										function(e) {
											console.log('copy image fail:' + e.message);
										});
								}, function() {
									console.log("delete image fail:" + e.message);
								});
							}, function() {
								//文件不存在
								entry.copyTo(root, 'head.png', function(e) {
										var path = e.fullPath + "?version=" + new Date().getTime();
										alert(path)
										uploadHead(path); /*上传图片*/
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

			//上传头像图片 
			function uploadHead(imgPath) {

				var image = new Image();
				image.src = imgPath;
				image.onload = function() {
					
					var imgData = getBase64Image(image);
					document.getElementById('head-img1').setAttribute('src', 'data:image/png;base64,' + imgData);
					//调用上传接口
					var uploadHeaderData = {
						"token": plus.storage.getItem('token'),
						"head_image":imgData
					}
					
					mui.ajax('http://www.huirenshi.com/Hrs/app/upload_head_image', {
						data: uploadHeaderData,
						type: 'post',
						timeout: 10000,
						success: function(data) {							
							var data = JSON.parse(data);
							if(data.status == 1) {
								plus.storage.setItem('users_image',data.data.url);								
								mui.alert(data.detail);
							} else {
								mui.alert(data.detail);
							}
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
			}
			
			
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
				
				if(imgwidth>imgheight){
					width = imgheight;
					height = imgheight; 
					top = 0;
					left = (imgwidth - imgheight)/2 ;
				}else{  
					width = imgwidth;
					height = imgwidth;
					left = 0;
					top = (imgheight-imgwidth)/2;
				}
				
				canvas.width = width; /*设置新的图片的宽度*/
				canvas.height = height; /*设置新的图片的长度*/
				var ctx = canvas.getContext("2d");
				
				ctx.drawImage(img, -left, -top, imgwidth, imgheight); /*绘图*/
				var dataURL = canvas.toDataURL("image/png", 0.1);
				return dataURL.replace("data:image/png;base64,", "");
			} 
		})