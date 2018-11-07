document.write("<script type='text/javascript' src='../static/xhttp.js'></script>");
document.write("<script src='../static/jquery-3.0.0.min.js' type='text/javascript'></script>");

function onTitleBackClick() {
	window.history.go(-1);
}

var list_view = document.getElementById("msg_list");

document.onreadystatechange = function() {
	let jsonInfo = localStorage.getItem("user_info");
	let userInfo = JSON.parse(jsonInfo);
	console.log(userInfo);
	ajax({
		method: "POST",
		url: "http://192.168.1.2/bjddapi/api/CheckPlan/getAttentionModuleIndex",
		async: true,
		//		{"data":{"ishandle":"1"},"tokenId":"","userId":"-2"}
		data: {
			tokenId: userInfo.TokenId,
			userId: userInfo.UserId,
		},
		loading: function() {
			$("#msg_list").html("<div class='layout_center'>加载中...</div>");
		},
		success: function(obj) {
			$("#msg_list").html("<div class='layout_center'>成功...</div>");
		},
		failed: function(str) {
			$("#msg_list").html("<div class='layout_center'><失败...<div>");
		}
	})
}