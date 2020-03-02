$(function () {

    $("#qiulingyang").click(function() {
        alert("你点我也没用啊! 神经病  瞄~");
    });
    $("#shuaxin").click(function() {
        alert("数据库视频不够... 神经病  瞄~");
    });
    $("#shuaxin1").click(function() {
        alert("数据库视频不够... 神经病  瞄~");
    });
    $("#shuaxin2").click(function() {
        alert("数据库视频不够... 神经病  瞄~");
    });


    // 静态轮播图
    var $aSlider = $('.slider');

    $aSlider.each(function () {
        $aSlider.slider($(this));
    });

    // 右侧导航条滚动自动选中
    var $sideBar = $('#sideBar');

    $(window).scroll(function () {
        sideBar();
    });

    function sideBar() {
        if ($('#banner').offset().top <= $(this).scrollTop()) {
            $sideBar.css({top: 0});
        } else {
            $sideBar.css({top: 232});
        }
    };
    sideBar();

    // 侧边导航跳转
    var $mainCont_item = $('[js-move]');
    var $sideBar_btn = $('.sideBar-list').find('a').not($('.sideBar-list').find('a').last());

    $(document.body).animate({scrollTop: 0});

    $sideBar_btn.click(function () {
        var index = $(this).index();

        $(this).addClass('cur').siblings().removeClass('cur');

        $(document.body).stop().animate({scrollTop: $mainCont_item.eq(index).offset().top});

        return false;
    });

    $(window).scroll(function () {
        $mainCont_item.each(function (i) {

            if ($(window).scrollTop() > $mainCont_item.eq(i).offset().top - 300) {
                $sideBar_btn.eq(i).addClass('cur').siblings().removeClass('cur');
            }

            if ($(window).scrollTop() < 500) {
                $sideBar_btn.removeClass('cur');
            }

        });
    });


    // 固定导航条
    var main_w = $mainCont_item.width();
    var $sideBar = $('#sideBar');
    var sideBar_w = $sideBar.width();

    $sideBar.css({left: widthChanged($(window).width())});

    $(window).resize(function () {
        if ($(window).width() <= main_w) {
            $sideBar.css({left: 'auto', right: 0});
        } else {
            $sideBar.css({left: widthChanged($(this).width()), right: 'auto'});
        }
    });

    function widthChanged(w) {
        return (w - main_w) / 2 + main_w + 10;
    };

});

;(function ($, window, document, undefined) {

    $.fn.slider = function (obj) {
        var $oSlider = obj;
        var $slider_item = $oSlider.find('.slider-img').find('a');
        var $slider_btn = $oSlider.find('.slider-btn').find('span');
        var $slider_title = $oSlider.find('.slider-title').find('p');

        var data_title = [];
        var slider_w = $slider_item.eq(0).width();
        var slider_iNum = 0;

        $slider_item.each(function () {
            data_title.push($(this).attr('slider-title'));
        });

        for (var i = 1; i < $slider_item.length; i++) {
            $($slider_item[i]).css({left: slider_w});
        }

        var num = 0;
        // 自动换图
        setInterval(function () {
          num++;
          if (num == 4) {
            num = 0;
          }
            slide(num);
        }, 5000);

        /*
        * 幻灯片方法
        * */
        function slide(num){
          $slider_btn.removeClass('cur');
          var span = document.getElementById("lunbo-" + num);
          span.classList.add('cur');
          sliderChange(num);
          $slider_title.text(data_title[num]);
          slider_iNum = num;
        };

        /*
        * 点击按钮跳到相应图片
        * */
        $slider_btn.click(function () {
            sliderBtn($(this).index());

            sliderChange($(this).index());

            slider_iNum = $(this).index();

            num = $(this).index();

            $slider_title.text(data_title[$(this).index()]);
        });

        function sliderBtn(index) {
            $slider_btn.removeClass('cur');
            $slider_btn.eq(index).addClass('cur');
        };

        function sliderChange(curIndex) {
            if (curIndex === slider_iNum) {
                return;
            } else if (curIndex > slider_iNum) {
                $slider_item.eq(slider_iNum).animate({left: -slider_w});
                $slider_item.eq(curIndex).css({left: slider_w});
            } else if (curIndex < slider_iNum) {
                $slider_item.eq(slider_iNum).animate({left: slider_w});
                $slider_item.eq(curIndex).css({left: -slider_w});
            }

            $slider_item.eq(curIndex).animate({left: 0});
        };
    };

    $.fn.tab = function () {
        var $tabBtn_wrapper = this.find('.tab-title');
        var $tab_btn = $tabBtn_wrapper.find('a');
        var $tab_cont = this.find('.tab-cont__item');
        var $tab_wrapper = $tab_cont.parent();

        var week_default = ['最新', '一', '二', '三', '四', '五', '六', '日'];
        var week_arr = ['最新', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];


        $tab_btn.click(function () {
            var index = $(this).index();

            $tab_btn.removeClass('cur');
            $(this).addClass('cur');

            if ($tab_wrapper.hasClass('tab-cont')) {
                $tab_wrapper.animate({marginLeft: -index * 260});
            } else {
                $tab_cont.removeClass('tab-cont__cur');
                $tab_cont.eq(index).addClass('tab-cont__cur');
            }

            if ($tabBtn_wrapper.hasClass('week-tab')) {
                $tab_btn.each(function (i) {
                    $(this).text(week_default[i]);
                });

                $(this).text(week_arr[index]);
            }

            return false;
        });
    };



})(window.jQuery, window, document);