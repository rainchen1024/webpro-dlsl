$(document).ready(function() {

	//	var list_view = document.getElementById("msg_list");
	//	showLoading();
	showViewData();
});

function showViewData() {
	var jsonInfo = localStorage.getItem("user_info");
	var userInfo = JSON.parse(jsonInfo);
	console.log(userInfo);
	$("#head_layout").html("");
	$("#head_layout").append('<img id="user_icon"  src="' + userInfo.Picture + '" />');
	//	$("#head_layout").append('<img id="user_icon"  src="../../res/img/new_problem_select.png" />');
	$("#head_layout").append('<div id="user_name" >' + (userInfo.UserName ? userInfo.UserName : "") + '</div>');
	$("#user_icon").one("error", function(e) { //加入相应的图片类名
		$(this).attr("src", "../../res/img/common_default_icon.png");
	});
}