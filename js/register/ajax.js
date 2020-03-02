/**
 * 异步提交注册表单
 */
function ajaxRegister() {
    $.post("http://api.balabala.com/user/Register",{userName:$("#RegisterUserName").val(),passWord:$("#RegisterPassWord").val(),phone:$("#RegisterPhone").val()}, function (result){
        if (result) {
            alert("注册成功，返回登陆即可！");
            location.reload();
        } else {
            alert("注册失败，请联系管理员！")
        }
    })
};
/**
 * 异步提交重置表单
 */
function ajaxReset() {
    $.post("http://api.balabala.com/user/Reset",{phone:$("#ResetPhone").val(),userName:$("#ResetUserName").val(),passWord:$("#ResetPassWord").val()}, function (result){
        if (result) {
            alert("重置成功，返回登陆即可！");
            location.reload();
        } else {
            alert("重置失败，请检查用户名和手机号！")
        }
    })
};

/**
 * 异步提交登录表单
 */
function ajaxLogin() {
    $.ajax({url: 'http://api.balabala.com/auth/login',
        type: 'POST',
        xhrFields: {withCredentials: true},
        data: {username:$("#LoginUserName").val(),password:$("#LoginPassWord").val()},
        dataType: 'json',
        success: function (result){
            alert("登录成功，即将跳转首页！");
            console.log(result)
            //拼接cookie
            document.cookie=result.cookieName + "=" + result.token + '; domain=.' + result.cookieDomain;
            window.location = "http://www.balabala.com";
         },error: function () {
            alert("登录失败，请检查账号和密码！")
        }})
};
