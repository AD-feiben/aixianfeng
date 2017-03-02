//处理路由
define(['jquery', 'underscore', 'backbone'], function ($, _, backbone) {
    var baseUrl = 'http://h5.yztctech.net/api/axf/';
    var w = backbone.Router.extend({
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
                home.getBanner(baseUrl + 'apihome.php');
            })
        },
        foudre: function () {
            require(['text!./foudre/foudre.html','text!./foudre/css/foudre.css'], function (tpl, css) {
                $('#container').html(`<style>${css}</style>`);
                $('#container').append(tpl);
            })
        },
        order: function () {
            require(['text!./order/order.html', 'text!./order/css/order.css'], function (tpl, css) {
                $('#container').html(`<style>${css}</style>`);
                $('#container').append(tpl);
            })
        },
        shop: function () {
            require(['text!./shop/shop.html', 'text!./shop/css/shop.css'], function (tpl, css) {
                $('#container').html(`<style>${css}</style>`);
                $('#container').append(tpl);
            })
        },
        my: function () {
            require(['text!./my/my.html', 'text!./my/css/my.css'], function (tpl, css) {
                $('#container').html(`<style>${css}</style>`);
                $('#container').append(tpl);
            })
        },
        defAction: function () {
            $('#container').html('<h1>页面未找到</h1>');
        },
        initialize: function () {
            window.location.hash = 'home';
        }
    });

    var router = new w();

    router.on('route', function (a) {
        var path = './public/img/';
        $('.home').attr('src', path + 'home.png');
        $('.foudre').attr('src', path + 'foudre.png');
        $('.order').attr('src', path + 'order.png');
        $('.shop').attr('src', path + 'shop.png');
        $('.my').attr('src', path + 'my.png');

        $('.' + a).attr('src', path + a + '2.png');
    });

    backbone.history.start();
});