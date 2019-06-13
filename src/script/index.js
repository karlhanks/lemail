!function ($) {
    //搜索框
    let arr = ["飞科", "电视", "充电电动", "漫威", "人工智能", "眼镜", "底座", "耳机", "y43", "X50"];
    $('#autocomplete').autocomplete({
            source: arr
    });
    $
    class lunbo {//首页轮播图
        constructor() {
            this.aId283 = $('#aId283');
            this.pic_ul = $('.pic_list');
            this.pic_li = $('.pic_list li');
            this.btns = $('#aId283 ol li');
            this.btn_left = $('#btn_left');
            this.btn_right = $('#btn_right');
            this.num = 0;
            this.timer = null;
        }
        init() {
            let that = this;
            this.timer = setInterval(function () {//定时器自动轮播
                that.rightclick();
            }, 3000);
            this.aId283.hover(function () {//鼠标经过显示隐藏按钮
                that.block();
                clearInterval(that.timer);
                // alert(1)
            }, function () {
                that.none();
                that.timer = setInterval(function () {
                    that.rightclick();
                }, 3000);
                // alert(1)
            });
            this.btn_right.on('click', function () {//右按钮点击
                that.rightclick();
            });
            this.btn_left.on('click', function () {//左按钮点击
                that.leftclick();
            });
            this.btns.on('click', function () {//圆按钮点击
                that.num = $(this).index();
                that.tabswitch();
            })
        }
        block() {
            $('#btn_left,#btn_right').show();
        }
        none() {
            $('#btn_left,#btn_right').hide();
        }
        rightclick() {
            this.num++;

            if (this.num > this.btns.length - 1) {
                this.num = 0;
            }
            this.tabswitch();
        }
        leftclick() {
            this.num--;
            if (this.num < 0) {
                this.num = this.btns.length - 1
            }
            this.tabswitch();
        }
        tabswitch() {
            this.btns.eq(this.num).addClass('active').siblings().removeClass('active');
            this.pic_li.eq(this.num).stop().animate({
                opacity: 1
            }).siblings().stop().animate(
                { opacity: 0 }
            )
        }
    }
    new lunbo().init();

    var $picsrc = $('.product-pic-href img');
    var $title = $('.product-type strong');
    var $present = $('.present span');
    var $original = $('.original span');
    var $product_pic_href = $('.product-pic-href');
    var $product_btn = $('.product-btn a');
    $.ajax({//获取商品信息渲染
        url: 'http://10.31.164.22/lemail/php/postdata.php',
        dataType: 'json'
    }).done(function (d) {
        for (var i = 0; i < d.length; i++) {
            $picsrc.addClass('lazy');
            $picsrc.eq(i).attr({ "data-original": d[i].url ,
            width:160+'px',
            height:160+'px'
        });
        $(function() {//和拼接的元素放在一起。
            $("img.lazy").lazyload({
                effect: "fadeIn"//图片显示方式
            });
        });
            $title.eq(i).html(d[i].title);
            $present.eq(i).html(d[i].nowprice);
            $original.eq(i).html(d[i].price);
            $product_pic_href.eq(i).attr({ href: "details.html?sid=" + d[i].sid });
            $product_btn.eq(i).attr({ href: "details.html?sid=" + d[i].sid })
        }
    });
    //懒加载
    
    var $backTop = $('#backTop');
    $(window).on('scroll', function () {//回到顶部
        if ($(window).scrollTop() > 100) {
            $('.tubiao').show
            $backTop.show()
        } else {
            $backTop.hide()
        }
    });
    //楼梯
    class louti {
        constructor() {
            this.louti = $('#loutinav');
            this.loutinav = $('#loutinav li');
            this.loucent = $('.title');
        }
        init() {
            let that = this;
            $(window).on('scroll', function () {
                that.windowscroll();
            });
            this.loutinav.on('click', function (
            ) {
                that.navclick(this)
            });
        }
        windowscroll() {//滑动滚动条跳到对应楼层和导航
            let $top = $(window).scrollTop();
            let that = this;
            if ($top >= 450) {
                this.louti.show();
            } else {
                this.louti.hide();
            };
            this.loucent.each(function (index, element) {
                let $loucengtop = $(element).offset().top + $(element).outerHeight() / 2;
                if ($loucengtop > $top) {
                    that.loutinav.removeClass('active');
                    that.loutinav.eq(index).addClass('active');
                    return false;
                }
            });
        }
        navclick(nav) {//点击左侧楼梯导航，切换对应的楼层。
            $(nav).addClass('active').siblings('li').removeClass('active');
            let $top = this.loucent.eq($(nav).index()).offset().top;
            $('html,body').animate({
                scrollTop: $top
            })
        }
    }
    new louti().init();



}(jQuery)