/*
* 鼠标移入头像，显示用户信息
* */
function show() {
    $(".profile-img").attr("class", "profile-img active");
    $(".user-panel").show();
}

/**
 * 鼠标移出头像，隐藏用户信息
 */
function hide() {
    $(".profile-img").attr("class", "profile-img");
    $(".user-panel").hide();
}

/**
 * 注销登录
 */
function LoginOut() {
    $.ajax({
        url: "http://api.balabala.com/auth/logout",
        type: "post",
        dataType: "json",
        xhrFields: {withCredentials: true},
        success: function (result) {
            alert("退出登录成功！")
            window.location = "http://www.balabala.com/%E4%BC%9A%E5%91%98%E8%B4%AD.html";
        }
    });
}

/**
 * 添加想去次数
 */
function wantGo() {
    $.ajax({
        type: 'PUT',
        url: 'http://api.balabala.com/item/WantGo',
        data: {id:GetQueryString('id')},
        success: function(){
            var count = $("#wantGo").text();
            count = count.substr(0, count.lastIndexOf("人想去"));
            count = parseInt(count) + 1;
            $("#wantGo").text(count+ "人想去");
        }
    });
}

/**
 * 获取地址栏参数
 * @param name
 * @returns {string|null}
 * @constructor
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}