mui.init({
			swipeBack: true //启用右滑关闭功能

		});
		mui.plusReady(function() {
			var getInfoData = {
				"token":plus.storage.getItem('token')
			}
			//获取工作经历
			mui.ajax(apiUrl +  'App/users_family', {
				data: getInfoData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					if(data.data != '') {
						var jiatingBeijingLiHtml = '';
						mui.each(data.data,function(index,item){
							jiatingBeijingLiHtml += '<li class="mui-table-view-cell mui-media"><a users_family_id="' + item.users_family_id + '" telephone="' + item.telephone + '" work_organize="' + item.work_organize + '" birthmonth="' + item.birthmonth + '" relation="' + item.relation + '" name="' + item.name + '" href="ruzhi-wdll-jtbj-add" class="mui-navigate-right"><div class="mui-media-body">' + item.name + '<p class="mui-ellipsis">' + item.relation + "</p></div></a></li>";
						})  
						document.getElementById('jia-ting-bei-jing-list').innerHTML = jiatingBeijingLiHtml;
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
			//链接
			mui('.mui-table-view').on('tap', 'a', function(e) {
				
				var href = this.getAttribute('href');
				var usersFamilyId = this.getAttribute('users_family_id')!=null?this.getAttribute('users_family_id'):"";
				var name = this.getAttribute('name');
				var relation = this.getAttribute('relation');
				var birthmonth = this.getAttribute('birthmonth');
				var work_organize = this.getAttribute('work_organize');
				var telephone = this.getAttribute('telephone');
				
				mui.openWindow({
					url: href +'.html',
					id: href,
					createNew: true,
					show: {
						autoShow: true,
						aniShow: "slide-in-bottom"
					},
					extras:{
						usersFamilyId: usersFamilyId,
						name: name,
						relation: relation,
						birthmonth: birthmonth,
						work_organize: work_organize,
						telephone: telephone
					},
					waiting: {
						autoShow: false,
						title: '拼命加载中...'
					}
				})
			})
			if(plus.storage.getItem('ruzhi-status')=='待入职'){
				document.getElementById('next-step').innerHTML = "下一步：完善自我评价";
				document.getElementById('next-step').setAttribute("href","ruzhi-wdll-zwpj");
			}else{
				document.getElementById('next-step').innerHTML = "下一步：选择公司";
				document.getElementById('next-step').setAttribute("href","li-ji-ru-zhi");
			}
			//下一步（完善教育经历）
			mui('.mui-content-padded').on('tap','a',function(){
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
		})