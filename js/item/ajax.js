$(document).ready(function () {
       /**
        * 页面加载隐藏用户信息
        * */
        $(".user-panel").hide();
        $(".user-info").hide();

    /**
     * 获取登录状态
     */
    $.ajax({
        url: "http://api.balabala.com/auth/verify",
        type: "get",
        dataType: "json",
        xhrFields: {withCredentials: true},
        success: function (result) {
            if (!$.isEmptyObject(result.jwt)) {
                //拼接cookie
                document.cookie=result.jwt.cookieName + "=" + result.jwt.token + '; domain=.' + result.jwt.cookieDomain;
            }
            $(".nav-header-regis-login").hide();
            $(".profile-img").attr("style", "background-image: url(" + result.userInfo.headportrait + ");");
            $(".user-uname").text(result.userInfo.username);
            $(".user-info").show()
        }
    });

        /**
         * 首次加载获取会员购商品列表
         */
        $.get("http://api.balabala.com/item/ItemList", function (result) {
            itemList(result);
            //渲染分页条
            pagingBar(result);
        });

    }
);