mui.init({
			swipeBack: true, //启用右滑关闭功能  
		});
		mui.plusReady(function() {
			var fengXianData = {
				"token":plus.storage.getItem('token')
			}
			mui.ajax(apiUrl +  'Hr/feng_xian_yu_jing', {
				data: fengXianData,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					var data = JSON.parse(data);
					if(data.status!=0){						
						var fengXianListHtml = '<li class="mui-table-view-cell text-999">入职待处理 <span class="text-666"> <span class="text-danger">' + data.data.ru_zhi + '</span>件</span><i class="icon iconfont icon-zhuyi mui-pull-right"> </i></li>'+ 
		        '<li class="mui-table-view-cell text-999">离职待处理 <span class="text-666"> <span class="text-danger">' + data.data.li_zhi + '</span>件</span><i class="icon iconfont icon-zhuyi mui-pull-right"> </i></li>'+
		        '<li class="mui-table-view-cell text-999">假勤待处理 <span class="text-666"> <span class="text-danger">' + data.data.jia_qin + '</span>件</span><i class="icon iconfont icon-zhuyi mui-pull-right"> </i></li>'+
		        '<li class="mui-table-view-cell text-999">合同待处理 <span class="text-666"> <span class="text-danger">' + data.data.he_tong + '</span>件</span><i class="icon iconfont icon-zhuyi mui-pull-right"> </i></li>'+
		        '<li class="mui-table-view-cell text-999">转正待处理 <span class="text-666"> <span class="text-danger">' + data.data.be_regular + '</span>件</span><i class="icon iconfont icon-zhuyi mui-pull-right"> </i></li>'+
		        '<li class="mui-table-view-cell text-999">参保待处理 <span class="text-666"> <span class="text-danger">' + data.data.sb_start + '</span>件</span><i class="icon iconfont icon-zhuyi mui-pull-right"> </i></li>'+
				'<li class="mui-table-view-cell text-999">退保待处理 <span class="text-666"> <span class="text-danger">' + data.data.sb_stop + '</span>件</span><i class="icon iconfont icon-zhuyi mui-pull-right"> </i></li>'
				
					document.getElementById('feng-xian-list').innerHTML = fengXianListHtml;
					}else{
						mui.alert(data.detail);
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