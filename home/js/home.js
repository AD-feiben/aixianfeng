define(['jquery', 'swiper'], function ($, Swiper) {
    let home = {};
    home.getBanner = function (url) {
        $.get(url, function (data, status) {
            if (status == 'success') {
                let dataObj = JSON.parse(data);

                // 生成banner的li
                let banners = dataObj.data.slide;
                let str = `<ul class="swiper-wrapper">`;
                for (let banner of banners) {
                    let title = banner.activity.name;
                    let src = banner.activity.img;
                    str += `<li class="swiper-slide">
                                <a href="javascript:;">
                                    <img src=${src} title=${title}>
                                </a>
                            </li>`;
                }
                str += `</ul>
                    <div class="swiper-pagination"></div>`;
                $('.banner').html(str);
                // 启动轮播
                new Swiper('.banner.swiper-container', {
                    autoplay: 5000,
                    loop: true,
                    pagination: '.swiper-pagination',
                    autoplayDisableOnInteraction: false,
                    observer: true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true//修改swiper的父元素时，自动初始化swiper
                });


                let menus = dataObj.data.menu;
                let str_menu = `<ul>`;
                for (let menu of menus) {
                    let name = menu.activity.name;
                    let img = menu.activity.img;
                    str_menu += `<li>
                                    <a href="javascript:;">
                                        <img src=${img}>
                                        <p>${name}</p>
                                    </a>
                                 </li>`;
                }
                str_menu += `</ul>`;
                $('.menu').html(str_menu);

            } else {
                console.log('数据请求失败');
            }
        })
    };

    return home;
});