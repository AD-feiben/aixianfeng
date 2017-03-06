//处理路由
define(['jquery', 'underscore', 'backbone', 'fastclick', 'handleDB'], function ($, _, backbone, FastClick, DB) {
    FastClick.attach(document.body);
    let baseUrl = 'http://h5.yztctech.net/api/axf/';

    $('.footerBar a').on('click', function (e) {
        window.location.hash = e.currentTarget.className;
    });

    // 数据库查询
    let shopCount = 0;
    DB.queryData(function (result) {
        for (let i in result) {
            shopCount += result[i].value.count;
        }
        if (shopCount === 0) {
            $('.corner').css('display', 'none')
        } else {
            $('.corner').css('display', 'block').text(shopCount);
        }
    });

    let w = backbone.Router.extend({
        routes: {
            'home': 'home',
            'foudre': 'foudre',
            'order': 'order',
            'shop': 'shop',
            'my': 'my',
            '*defAction': 'defAction'
        },
        home: function () {
            require(["text!./home/css/home.css", 'text!./home/home.html', './home/js/home'], function (css, tpl, home) {
                $('#container').html(`<style>${css}</style>`);
                $('#container').append(tpl);
                home.getData(baseUrl + 'apihome.php');
                home.init();
            })
        },
        foudre: function () {
            require(['text!./foudre/foudre.html', 'text!./foudre/css/foudre.css', './foudre/js/foudre'], function (tpl, css, Obj) {
                $('#container').html(`<style>${css}</style>`);
                $('#container').append(tpl);
                Obj.init();
            })
        },
        order: function () {
            require(['text!./order/order.html', 'text!./order/css/order.css', './order/js/order'], function (tpl, css, obj) {
                $('#container').html(`<style>${css}</style>`);
                $('#container').append(tpl);
                obj.getData(`${baseUrl}apiyuding.php`);
            })
        },
        shop: function () {
            require(['text!./shop/shop.html', 'text!./shop/css/shop.css', './shop/js/shop.js'], function (tpl, css, obj) {
                $('#container').html(`<style>${css}</style>`);
                $('#container').append(tpl);
                obj.init();
            })
        },
        my: function () {
            require(['text!./my/my.html', 'text!./my/css/my.css'], function (tpl, css) {
                $('#container').html(`<style>${css}</style>`);
                $('#container').append(tpl);
                $('.load').css('display', 'none');
            })
        },
        defAction: function () {
            $('#container').html('<h1>页面未找到</h1>');
        },
        initialize: function () {
            if (window.location.hash === '') {
                window.location.hash = 'home';
            }
        }
    });

    let router = new w();

    router.on('route', function (a) {
        let path = './public/img/';
        $('.home').attr('src', path + 'home.png');
        $('.foudre').attr('src', path + 'foudre.png');
        $('.order').attr('src', path + 'order.png');
        $('.shop').attr('src', path + 'shop.png');
        $('.my').attr('src', path + 'my.png');

        $('.' + a).attr('src', path + a + '2.png');
    });

    backbone.history.start();
});