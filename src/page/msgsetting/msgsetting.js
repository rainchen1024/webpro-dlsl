$(document).ready(function() {

	//	var list_view = document.getElementById("msg_list");
	//	showLoading();
	//	queryList();
});

function onTitleBackClick() {
	window.history.go(-1);
}

function queryList() {
	var jsonInfo = localStorage.getItem("user_info");
	var userInfo = JSON.parse(jsonInfo);
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

		},
		success: function(obj) {
			showViewData(obj);
		},
		failed: function(str) {
			showEmptyData(str);
		}
	})
}

function showViewData(obj) {
	//	$("#msg_list").html("<div class='layout_center'>成功...</div>");
	$("#msg_list").html("");
	console.log("========", obj.length);
	if(obj.length > 0) {
		for(i = 0; i < obj.length; i++) {
			console.log("========", obj.length);
			$("#msg_list").append('<li class="msg_list_item">' +
				'<img class="msg_list_item_icon" src="' + obj[i].imgurl + '" />' +
				'<div class="msg_list_item_text">' + obj[i].modulename + '</div>' +
				'<div class="btn_layout">' +
				'<p class="text_gray_tips ' + (obj[i].iscancle ? 'displaynone' : '') + '">' +
				(obj[i].ischoose ? '已关注' : '未关注') + '</p>' +
				'<button  class="btn_change ' + (obj[i].iscancle ? '' : 'displaynone') +
				' type="button">' +
				(obj[i].ischoose ? '取消关注' : '关注') + '</button>' +
				'</div>' +
				'</li>');

		}
		bindDomClick();
	} else {
		showEmptyData("");
	}
}

function bindDomClick() {
	$("#msg_list").on("click", "li", function() {
		
		var index = $(this).index() + 1;
		console.log(index);

		alert("lenght = " + $(this).length + "点击了按钮，index = " + index);
	});
}

function showLoading() {
	$("#msg_list").html("<div class='layout_center'>加载中...</div>");
}

function showEmptyData(str) {
	$("#msg_list").html('<div class="layout_center" onclick="queryList()">暂无数据，点击刷新<div>');
}

function onChange(name, code, ischoose) {
	console.log("===onChange====", name);
	var jsonInfo = localStorage.getItem("user_info");
	var userInfo = JSON.parse(jsonInfo);
	var url;
	if(ischoose) {
		url = "http://192.168.1.2/webapi/api/CheckPlan/cancleAttentionModule";
	} else {
		url = "http://192.168.1.2/webapi/api/CheckPlan/addAttentionModule";
	}
	ajax({
		method: "POST",
		url: "http://192.168.1.2/bjddapi/api/CheckPlan/getAttentionModuleIndex",
		async: true,
		//		{"data":{"ishandle":"1"},"tokenId":"","userId":"-2"}
		data: {
			tokenId: userInfo.TokenId,
			userId: userInfo.UserId,
			data: {
				modulecode: code,
				modulename: name
			}
		},
		loading: function() {

		},
		success: function(obj) {
			queryList();
		},
		failed: function(str) {
			showEmptyData(str);
		}
	})
}