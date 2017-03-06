define(['jquery', 'swiper', 'handleDB'], function ($, Swiper, DB) {
    let obj = {};
    /*
     * 使用GET方式发起HTTP请求
     * param String  URL地址
     */
    obj.getData = function (url) {
        let self = this;
        $.get(url, function (data, status) {
            if (status == 'success') {
                let objData = JSON.parse(data);
                self.handleData(objData);
                $('.load').css('display', 'none');
            } else {
                console.log('数据请求失败');
            }
        })
    };

    /*
     * 将数据生成DOM结构，插入DIV中
     * param Object
     */
    obj.handleData = function (objData) {
        // 生成banner的li
        let banners = objData.data.slide;
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


        let menus = objData.data.menu;
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
    };

    obj.init = function () {
        $('.list3 .add').on('click', function(e){
            let parent = e.target.parentNode,
                productID = parent.id,
                name = $(parent).find('.name').text(),
                price = $(parent).find('.price').text(),
                img = $(parent).find('img').attr('src');
            let data={
                productID,
                count: 1,
                name,
                price,
                img
            };
            console.log('add');
            DB.addData(data,function(){
                console.log('add success');
                let shopCount = parseInt($('.corner').text()) || 0;
                if(shopCount === 0){
                    $('.corner').css('display', 'block');
                }
                $('.corner').text(++shopCount);
            });
        })
    };

    return obj;
});