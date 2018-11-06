document.write("<script type='text/javascript' src='../static/xhttp.js'></script>");

function onTitleBackClick() {
	window.history.go(-1);
}

function getList() {
	
	let jsonInfo = localStorage.getItem("user_info");
	let userInfo = JSON.parse(jsonInfo);
	console.log(userInfo);
	ajax({
		method: "POST",
		url: "http://192.168.1.2/bjddapi/api/CheckPlan/getModuleSettingForIndex",
		async: true,
		//{"data":{"ishandle":"1"},"tokenId":"","userId":"-2"}
		data: {
			dada: {
				ishandle: "1"
			},
			tokenId: userInfo.tokenId,
			userId: userInfo.userId,
		},
		success: function(obj) {
			console.log("---------", obj);
//			localStorage.setItem("user_info", JSON.stringify(obj));
//			if(document.getElementById("store-pwd").checked) {
//				console.log("记住密码");
//				localStorage.setItem("user", user);
//				localStorage.setItem("pwd", pwd);
//			} else {
//				console.log("不记住密码");
//				localStorage.removeItem("user");
//				localStorage.removeItem("pwd");
//			}
//			window.location.href = "../main/main.html";
			alert("获取成功")
		},
		failed: function(str) {
			console.log(str);
		}
	})
}
document.onreadystatechange = getList();