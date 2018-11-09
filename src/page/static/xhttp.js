var xhttp;

// function initXHttpInstance() {
//     if (xhttp == null || xhttp === undefined) {
//         if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
//             xhttp = new XMLHttpRequest();
//         } else {// code for IE6, IE5
//             xhttp = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//     }
// }

/** 封装ajax函数
 * @param {string}options.method http连接的方式，包括POST和GET两种方式
 * @param {string}options.url 发送请求的url
 * @param {boolean}options.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}options.data 发送的参数，格式为对象类型
 * @param {function}options.success ajax发送并接收成功调用的回调函数
 * @param {function}options.failed ajax请求失败回调函数
 */
function ajax(options) {
	if(xhttp == null || xhttp === undefined) {
		if(window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
			xhttp = new XMLHttpRequest();
		} else { // code for IE6, IE5
			xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	options = options || {};
	options.method = options.method.toUpperCase() || 'POST';
	options.url = options.url || '';
	options.async = options.async || true;
	options.data = options.data || null;
	options.success = options.success || function(obj) {};
	options.failed = options.failed || function(err) {};
	options.loading = options.loading || function() {};
	// let postData = {};
	// postData.data = options.data;

	if(options.method.toUpperCase() === 'POST') {
		xhttp.open(options.method, options.url, options.async);
		xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
		xhttp.send("json=" + JSON.stringify(options.data));
		options.loading();
	} else if(options.method.toUpperCase() === 'GET') {
		xhttp.open(options.method, options.url + '?json=' + JSON.stringify(options.data), options.async);
		xhttp.send(null);
		options.loading();
	}

	xhttp.onreadystatechange = function() {
		if(xhttp.readyState === 4 && xhttp.status === 200) {
			console.log("=======", xhttp.responseText);
			var data = JSON.parse(xhttp.responseText);
			if(data.code == 0 || data.Code == 0) {
				options.success(data.data);
			} else {
				options.failed(data.Info);
			}
		} else {
			// alert("网络错误");
			options.failed("网络错误");
		}
	}
}