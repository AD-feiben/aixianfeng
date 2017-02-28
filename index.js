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
            require(['text!./home/home.html', './home/js/home'], function (tpl, home) {
                // $('#container').html(tpl);
                // home.getBanner(baseUrl+'apihome.php');
            })
        },
        foudre: function () {
            require(['text!./foudre/foudre.html'], function (tpl) {
                $('#container').html(tpl);
            })
        },
        order: function () {
            require(['text!./order/order.html'], function (tpl) {
                $('#container').html(tpl);
            })
        },
        shop: function () {
            require(['text!./shop/shop.html'], function (tpl) {
                $('#container').html(tpl);
            })
        },
        my: function () {
            require(['text!./my/my.html'], function (tpl) {
                $('#container').html(tpl);
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
        init(a)
    });

    function init(clsName) {
        var path = './public/img/';
        $('.home').attr('src', path + 'home.png');
        $('.foudre').attr('src', path + 'foudre.png');
        $('.order').attr('src', path + 'order.png');
        $('.shop').attr('src', path + 'shop.png');
        $('.my').attr('src', path + 'my.png');
        console.log(clsName);

        $('.' + clsName).attr('src', path + clsName + '2.png');
    }

    backbone.history.start();
});