$(document).ready(function(){
 	var list_view = document.getElementById("msg_list");
	queryList();
});

function onTitleBackClick() {
	window.history.go(-1);
}

function queryList() {
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