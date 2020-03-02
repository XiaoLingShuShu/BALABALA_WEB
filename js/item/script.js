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
 * 渲染会员购商品
 * @param result
 */
function itemList(result) {
    //会员购城市集合
    var array = [];
    //遍历返回结果
    $.each(result.items, function (index, element) {
        //获取会员购城市名添加进会员购城市集合
        var str = element.cityName;
        array.push(str.substr(0, str.lastIndexOf("市")));
        //动态渲染会员购商品到页面
        $(".project-list").append("<div class=\"project-list-item\" id=\"" + element.id + "\" onclick=\"detail(this)\">" +
            "<div class=\"project-list-item-img\" style=\"background-image: url(images/item/" + element.id + ".jpeg);\"></div>" +
            "<div class=\"project-list-item-detail\">" +
            "<div class=\"project-list-item-title\" style=\"-webkit-box-orient: vertical;\">" + element.title + "</div>" +
            "<div class=\"project-list-item-time\"><span class=\"icon time-icon\"></span>" + element.time + "</div>" +
            "<div class=\"project-list-item-address\"><span class=\"icon address-icon\"></span>" +
            "<span class=\"city-name\">" + element.cityName + "</span>" +
            "<span class=\"venue-name-and-address\">" + element.address + "</span></div>" +
            "<div class=\"project-list-item-price\">" +
            "<div class=\"not-free\" id=\"list-" + index + "\">" +
            "<span class=\"price-symbol\">¥</span><span class=\"price\">" + element.price + "</span>" +
            "</div></div></div></div>"
        );
        //判断是否独家
        if (element.promo) {
            $("#" + "list-" + index).append("<span class=\"promo-item\">独家</span>")
        }
    });
    //渲染会员购城市
    promo(array);
    //渲染总页数和总条数
    showPageNumEnd(result);
}

/**
 * 渲染分页条
 * @param result
 */
function pagingBar(result) {
    for (var i = 1; i <= result.totalPage; i++) {
        if (i != 1) {
            $(".pagination").append("<span class=\"pageNum\" id=\"page-" + i + "\" onclick='pageNumRendering(this)'>" + i + "</span>")
            continue;
        }
        $(".pagination").append("<span class=\"pageNum active\" id=\"page-1\" onclick='pageNumRendering(this)'>1</span>");
    }
    $(".pagination").append("<span class=\"pageNum\" id=\"pageNum\">" + "..." + "</span>")
    $(".pagination").append("<span class=\"pageNum\" id=\"pageNumEnd\" onclick='pageNumRendering(this)'>" + result.totalPage + "</span>")
}

/**
 * 渲染会员购城市
 * @param result
 * @param array
 */
function promo(array) {
    //对会员购城市集合去重
    $.unique(array.sort());
    //动态渲染会员购城市
    $(".city-list").append("<li class=\"first city-item active\">全国</li>");
    $.each(array, function (index, element) {
        $(".city-list").append("<li class=\"city-item\">" + element + "</li>")
    });
}

/**
 * 渲染总页数和总条数
 * @param result
 */
function showPageNumEnd(result) {
    //总条数
    $("#totalNum").text("（" + result.total + "）");
    $("#totalNumCount").text("总条数（" + result.total + "）");
    //总页数
    $("#pageCount").text("总页数（" + result.totalPage + "）");
    //本页数据条数
    $("#thisPage").text("本页（" + Object.keys(result.items).length + "）");
}

//记载页数
var pageCount = 1;

/**
 * 上一页
 */
function prePage() {
    if (pageCount > 1) {
        $('body,html').animate({scrollTop:0},500);
        pageCount--;
        paginationRendering();
        replacePageNum();
    }
    checkPagination();
}

/**
 * 下一页
 */
function nextPage() {
    if (pageCount < $("#pageNumEnd").text()) {
        $('body,html').animate({scrollTop:0},500);
        pageCount++;
        paginationRendering();
        replacePageNum();
    }
    checkPagination();
}

/**
 * 通过分页按钮的渲染数据
 */
function paginationRendering() {
    $.get("http://api.balabala.com/item/ItemList",{page:pageCount}, function (result) {
        $(".project-list").empty();
        $(".city-list").empty();
        itemList(result);
    });
}

/**
 * 通过页码渲染商品数据
 */
function pageNumRendering(obj) {
    pageCount = $(obj).text();
    $('body,html').animate({scrollTop:0},500);
    replacePageNum();
    checkPagination();
}

/**
 * 点击更换选中页码
 */
function replacePageNum() {
    paginationRendering();
    $("#" + "page-" + pageCount).addClass("pageNum active").siblings().removeClass().addClass("pageNum");
}

/**
 * 检查分页按钮是否可点击
 */
function checkPagination() {
    $("#left").attr("class", "arrow pagination-left-arrow");
    $("#right").attr("class", "arrow pagination-right-arrow");
    if(pageCount == $("#pageNumEnd").text()){
        $("#right").attr("class", "arrow pagination-right-arrow disabled");
        $("#left").attr("class", "arrow pagination-left-arrow");
    }
    if(pageCount == 1){
        $("#left").attr("class", "arrow pagination-left-arrow disabled");
        $("#right").attr("class", "arrow pagination-right-arrow");
    }
}

/**
 * 渲染商品详情
 * @param obj
 */
function detail(obj) {
    window.location="http://www.balabala.com/detail.html?id=" + $(obj).attr("id");
}