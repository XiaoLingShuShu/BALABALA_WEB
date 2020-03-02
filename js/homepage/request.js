function LoginOut() {
    /**
     * 注销登录
     */
    $.ajax({
        url: "http://api.balabala.com/auth/logout",
        type: "post",
        dataType: "json",
        xhrFields: {withCredentials: true},
        success: function (result) {
            alert("退出成功！")
            window.location = "http://www.balabala.com";
        }
    });
}