var path = require('path');
var webpack = require('webpack');
module.exports = {
	entry: {
		index:'./entry/index',
		fortune:'./entry/fortune',
		address:'./entry/address',
		"authorize-login":'./entry/authorize-login',
		"bank-card-delet":'./entry/bank-card-delet',
		"bank-card-list":'./entry/bank-card-list',
		"bind-bank-card":'./entry/bind-bank-card',
		"findpsw":'./entry/findpsw',		
		
		
		"li-ji-ru-zhi":'./entry/li-ji-ru-zhi',
		"login":'./entry/login',		
		"register":'./entry/register',
		"resetpsw":'./entry/resetpsw',

		"ruzhi-wdll-grzl":'./entry/ruzhi-wdll-grzl',	
		"ruzhi-wdll-grzl-add":'./entry/ruzhi-wdll-grzl-add',
		"ruzhi-wdll-grzl-add-birthday":'./entry/ruzhi-wdll-grzl-add-birthday',
		"ruzhi-wdll-gzjl":'./entry/ruzhi-wdll-gzjl',
		"ruzhi-wdll-gzjl-add":'./entry/ruzhi-wdll-gzjl-add',
		"ruzhi-wdll-jtbj":'./entry/ruzhi-wdll-jtbj',
		"ruzhi-wdll-jtbj-add":'./entry/ruzhi-wdll-jtbj-add',
		
		"ruzhi-wdll-jyjl":'./entry/ruzhi-wdll-jyjl',
		"ruzhi-wdll-jyjl-add":'./entry/ruzhi-wdll-jyjl-add',
		"score-dzjf":'./entry/score-dzjf',		
		"score-tixian":'./entry/score-tixian',
		"score-xjgz":'./entry/score-xjgz',
		"score-zsjf":'./entry/score-zsjf',
		"select-bank-card":'./entry/select-bank-card',
		setting:'./entry/setting',
		"setting-gonggao":'./entry/setting-gonggao',
		"setting-gonggao-detail":'./entry/setting-gonggao-detail',
		"setting-gywm":'./entry/setting-gywm',
		"setting-gzzd":'./entry/setting-gzzd',
		"setting-gzzd-detail":'./entry/setting-gzzd-detail',
		"setting-lzxx":'./entry/setting-lzxx',
		"setting-shezhi":'./entry/setting-shezhi',
		"setting-shezhi-dlmmxg":'./entry/setting-shezhi-dlmmxg',
		"setting-shezhi-zfmmxg":'./entry/setting-shezhi-zfmmxg',
		"setting-wdll-grzl":'./entry/setting-wdll-grzl',

		"setting-yjfk":'./entry/setting-yjfk',
		"setting-zwxx":'./entry/setting-zwxx',

		"select-tongshi":'./entry/select-tongshi',
		"ruzhi-wdll-zwpj":'./entry/ruzhi-wdll-zwpj',		
		"score-xjgz-mingxi":'./entry/score-xjgz-mingxi',
		"score-jifen-mingxi":'./entry/score-jifen-mingxi',
		"zhuanzhang-tongshi-boss":'./entry/zhuanzhang-tongshi-boss',
		"zhuanzhang-tongshi":'./entry/zhuanzhang-tongshi',
		"score-maifen":'./entry/score-maifen',
		"setting-gzt-detail":'./entry/setting-gzt-detail',
		"setting-gzt-list":'./entry/setting-gzt-list',
		"setting-gzt":'./entry/setting-gzt',
		"bind-bank-list":'./entry/bind-bank-list',
		
		
	},	
	output:{
		path:path.resolve(__dirname, 'buildNew'),
		filename: "[name].js"
	},
	
	resolve: {	
        extensions: [ '.js'],       
    }
}
