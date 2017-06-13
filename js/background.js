//监听内容脚本发送的消息
console.log('init bg')

function clearCacheHandle(){
	var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
	var oneYearAgo = (new Date()).getTime() - millisecondsPerWeek * 52;
	chrome.browsingData.remove({ "since": oneYearAgo }, {
		"appcache": true,
		"cache": true,
		"cookies": false,
		"downloads": true,
		"fileSystems": true,
		"formData": true,
		"history": false,
		"indexedDB": true,
		"localStorage": true,
		"serverBoundCertificates": true,
		"pluginData": true,
		"passwords": false,
		"webSQL": true
	}, function () {
		console.log('clear done')
		showNews('清除缓存成功~');
	});
}

chrome.contextMenus.create({"title":"清空缓存","onclick": clearCacheHandle});

var showNews = function(tx){
	var nof = new Notification(tx, {icon: "48.png"});
	setTimeout(function(){
		nof.close();
		chrome.tabs.reload();
	}, 450);
}

chrome.commands.onCommand.addListener(function(command)
{
  console.debug('command is : ' + command);
  if (command == 'clearcache_extension') {
    clearCacheHandle();
  }
});