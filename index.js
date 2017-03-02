//处理路由
define(['jquery', 'underscore', 'backbone', 'fastclick'], function ($, _, backbone, FastClick) {
    FastClick.attach(document.body);
    var baseUrl = 'http://h5.yztctech.net/api/axf/';

    $('.footerBar a').on('click', function (e) {
        window.location.hash = e.currentTarget.className;
    });


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
                home.getData(baseUrl + 'apihome.php');
            })
        },
        foudre: function () {
            require(['text!./foudre/foudre.html', 'text!./foudre/css/foudre.css', './foudre/js/foudre'], function (tpl, css, Obj) {
                $('#container').html(`<style>${css}</style>`);
                $('#container').append(tpl);
                if ($('.goods ul').length === 0) {
                    Obj.getdata(`${baseUrl}apicategory.php?category=${encodeURIComponent('热销榜')}`);
                }
                $('.category').on('click', function (e) {
                    if (e.target.nodeName == 'LI' && e.target.textContent) {
                        $('.category li').removeClass('active');
                        $(e.target).addClass('active');
                        let categoryStr = e.target.textContent;
                        let URLStr = encodeURIComponent(categoryStr);
                        Obj.getdata(`${baseUrl}apicategory.php?category=${URLStr}`);
                    }
                })
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
            if (window.location.hash === '') {
                window.location.hash = 'home';
            }
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