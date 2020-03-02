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
            $(".user-info").show();
            $("#comment-user").attr("style", "background-image: url(" + result.userInfo.headportrait + ");");
        }, error: function () {
            window.location = "http://www.balabala.com/login.html";
        }
    });

        /**
         * 获取商品详情页数据
         */
        $.get("http://api.balabala.com/item/ItemDetail", {id: GetQueryString('id')}, function (result) {
            $(".project-name").text(result.item.title);
            $(".product-info-name").text(result.item.title);
            $(".vuene-name").text(result.item.address);
            $(".product-info-time").text(result.item.time);
            $("#screens").text(result.item.time);
            $("#tickets").text("¥" + result.item.price);
            $("#wantGo").text(result.item.wantGo + "人想去");
            $(".detail-img-icon,.no_pic").css("background-image","url(images/item/" + result.item.id + ".jpeg)");
            //遍历详情图片
            $.each(result.files,function (index,element) {
                var strings = element.split("web\\");
                $("#pictureAddress").append("<img src=\""+ strings[1] +"\">")
            })
        });

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

    /**
     * 随机推荐
     */
    $.get("http://api.balabala.com/item/recommend",function (result) {
        $.each(result,function (index, element) {
            $(".rec-list").append("<div class=\"rec-item\">" +
                "<div class=\"rec-item-banner\" style=\"background-image: url(../../images/item/" + element.id + ".jpeg);\"></div>" +
                "<div class=\"rec-item-name\">"+ element.title +"</div>" +
                "<div class=\"rec-item-time\">"+ element.time +"</div>" +
                "<div class=\"rec-item-vuene\">"+ element.address +"</div>" +
                "</div>")
        })
    });

    }
);