$(document).ready(
    function () {
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
                $(".login-box").hide();
                $("#user-Name").text(result.userInfo.username);
                $("#userName").text(result.userInfo.username);
                $(".face").attr("src", result.userInfo.headportrait);
                $("#user-info").show();
            }
        });

        /**
         * 获取动画分区每日推荐
         */
        $.get("http://api.balabala.com/animation/DailyPush", function (result) {
            $.each(result, function (index, element) {
                $("#DailyPush").append("<li>" +
                    "<a href=\"" + element.videoAddress + "\" " + " target=\"_blank\"" + "\">" +
                    "<img src=\"./images/homepage/video/" + element.videoImage + "\" alt=\"#\">" +
                    "<div class=\"info\">" +
                    "<p class=\"title\">" + element.videoName + "</p>" +
                    "<p class=\"author\">up主："+ element.upName +"</p>" +
                    "<p class=\"play\">播放：" + element.videoLookCount + "万"+ "</p>" +
                    "</div></a></li>")
            });
        });

        /*
        * 获取动画分区动态
        * */
        $.get("http://api.balabala.com/homepage/AnimationDynamic", function (result) {
            //console.log(result)
            $.each(result, function (index, element) {
                $("#animation").append(
                    "<li class=\"item\">" +
                    "<a href=\"" + element.videoAddress  + "\" target='_blank'  class=\"img-link\">" +
                    "<img src=\"./images/homepage/video/" + element.videoImage + "\" alt=\"#\">" +
                    "<span class=\"mask\"></span>" +
                    "<span class=\"time\">" + element.videoTime + "</span>" +
                    "</a><div class=\"img-info\">" +
                    "<a href=\"" + element.videoAddress + "\">" + element.videoName + "</a>" +
                    "<div class=\"btm\"><div class=\"user\"><i></i>"+ element.upName +"</div>" +
                    "<div class=\"online\">" +
                    "<i>*</i>" + element.videoLookCount + "万"+
                    "</div></div></li>")
            });
        });

        /*
        * 获取游戏分区动态
        * */
        $.get("http://api.balabala.com/homepage/game", function (result) {
            $.each(result, function (index, element) {
                $("#Mad").append(
                    "<li class=\"item\">" +
                    "<a href=\"" + element.videoAddress + "\" target='_blank' class=\"img-link\">" +
                    "<img src=\"./images/homepage/video/" + element.videoImage + "\" alt=\"#\">" +
                    "<span class=\"mask\"></span>" +
                    "<span class=\"time\">" + element.videoTime + "</span>" +
                    "</a><div class=\"img-info\">" +
                    "<a href=\"" + element.videoAddress + "\">" + element.videoName + "</a>" +
                    "<div class=\"btm\"><div class=\"user\"><i></i>"+ element.upName +"</div>" +
                    "<div class=\"online\">" +
                    "<i>*</i>" + element.videoLookCount + "万" + "</div></div></li>")
            });
        });

        /*
        * 获取鬼畜分区动态
        * */
        $.get("http://api.balabala.com/homepage/kichiku", function (result) {
            $.each(result, function (index, element) {
                $("#Comic").append(
                    "<li class=\"item\">" +
                    "<a href=\"" + element.videoAddress + "\" target='_blank' class=\"img-link\">" +
                    "<img src=\"./images/homepage/video/" + element.videoImage + "\" alt=\"#\">" +
                    "<span class=\"mask\"></span>" +
                    "<span class=\"time\">" + element.videoTime + "</span>" +
                    "</a><div class=\"img-info\">" +
                    "<a href=\"" + element.videoAddress + "\">" + element.videoName + "</a>" +
                    "<div class=\"btm\"><div class=\"user\"><i></i>"+ element.upName +"</div>" +
                    "<div class=\"online\">" +
                    "<i>*</i>" + element.videoLookCount + "万"+
                    "</div></div></li>")
            });
        });

        /*
        * 获取动画分区排行榜
        * */
        $.get("http://api.balabala.com/homepage/Ranking", {categoryId: "1"}, function (result) {
            $.each(result, function (index, element) {
                $("#did2").append(
                    "<li class='item'>" +
                    "<a href=\"" + element.videoAddress + "\" target='_blank'>" +
                    "<i class='n2'>" + (index + 1) + "</i>" + element.videoName + "</a></li>");
            });
        });

        /*
        * 获取游戏分区排行榜
        * */
        $.get("http://api.balabala.com/homepage/Ranking", {categoryId: "2"}, function (result) {
            $.each(result, function (index, element) {
                $("#did3").append(
                    "<li class='item'>" +
                    "<a href=\"" + element.videoAddress + "\" target='_blank'>" +
                    "<i class='n2'>" + (index + 1) + "</i>" + element.videoName + "</a></li>");
            });
        });

        /*
        * 获取鬼畜分区排行榜
        * */
        $.get("http://api.balabala.com/homepage/Ranking", {categoryId: "3"}, function (result) {
            $.each(result, function (index, element) {
                $("#did4").append(
                    "<li class='item'>" +
                    "<a href=\"" + element.videoAddress + "\" target='_blank'>" +
                    "<i class='n2'>" + (index + 1) + "</i>" + element.videoName + "</a></li>");
            });
        });

    }
)
;
