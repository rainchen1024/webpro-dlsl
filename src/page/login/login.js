document.write("<script type='text/javascript' src='../static/xhttp.js'></script>");
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        console.log("页面加载完成");
        let user = localStorage.getItem("user");
        let pwd = localStorage.getItem("pwd");
        if (localStorage.getItem("user_info")) {
            console.log("用户数据缓存", localStorage.getItem("user_info"));
        }
        if (user) {
            console.log(user);
            document.getElementById("user").value = user;
        }
        if (pwd) {
            console.log(pwd);
            document.getElementById("pwd").value = pwd;
        }
    }
}

function login() {
    if (verify()) {
        //TODO 网络请求
        let user = document.getElementById("user").value;
        let pwd = document.getElementById("pwd").value;
        ajax({
            method: "POST",
            url: "http://192.168.1.2/webapi/api//Login/Login",
            async: true,
            data: {
                password: pwd,
                userAccount: user
            },
            success: function (obj) {
                console.log("---------", obj);
                localStorage.setItem("user_info", JSON.stringify(obj));
                if (document.getElementById("store-pwd").checked) {
                    console.log("记住密码");
                    localStorage.setItem("user", user);
                    localStorage.setItem("pwd", pwd);
                } else {
                    console.log("不记住密码");
                    localStorage.removeItem("user");
                    localStorage.removeItem("pwd");
                }
                window.location.href = "../main/main.html";
                alert("登录成功")
            },
            failed: function (str) {
                console.log(str);
            }
        })
    }
}


function clearValue(id) {
    if (id == null || id === undefined || id.length === 0) {
        return;
    }
    console.log("clearValue");
    document.getElementById(id).value = "";
}

function verify() {
    let user = document.getElementById("user").value;
    let pwd = document.getElementById("pwd").value;
    if (user == null || user == undefined || user.length == 0) {
        alert("请输入用户名");
        console.log("请输入用户名");
        return false;
    }
    if (pwd == null || pwd == undefined || pwd.length == 0) {
        alert("请输入密码");
        console.log("请输入密码");
        return false;
    }
    console.log("验证通过");
    return true;
}