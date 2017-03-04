define(['jquery', 'handleDB', 'fastclick'], function ($, DB, FastClick) {
    FastClick.attach(document.body);
    let obj = {
        init: function () {
            let money = 0;
            DB.queryData((result) => {
                if(result.length == 0){
                    // 购物车是空的
                    $('.empty').css('display', 'block');
                }else{
                    $('.empty').css('display', 'none');
                    let str = '';
                    for (let i in result) {
                        let obj = result[i].value;
                        // 去除￥符号
                        let price = Number(obj.price.substr(1));
                        // 计算总价
                        money += price * obj.count;
                        str += `<li id="${obj.productID}">
                            <div class="check"></div>
                            <div class="goods"><img src="${obj.img}"></div>
                            <div class="detail">
                                <div class="info">${obj.name}</div>
                                <div class="num">
                                    <span>${obj.price}</span>
                                    <div class="ctrl">
                                        <div class="sub">-</div>
                                        <div class="count">${obj.count}</div>
                                        <div class="add">+</div>
                                    </div>
                                </div>
                            </div>
                        </li>`;
                    }

                    $('.commodities ul').html(str);
                    $('.money').text(`￥${money.toFixed(2)}`);
                    $('.load').css('display', 'none');
                    this.addEvent();
                }
            });
            $('.goShop').on('click', function(){
                window.location.hash = 'home';
            });
        },
        addEvent: function () {
            $('.commodities li').on('click', function (e) {
                if (e) {
                    let li = e.currentTarget,
                        $count = $(e.currentTarget).find('.count'),
                        $shopCount = $('.corner'),
                        $price = $(e.currentTarget).find('.num span'),
                        $money = $('.money'),
                        productID = li.id,
                        count = parseInt($count.text()),
                        shopCount = parseInt($shopCount.text()),
                        price = Number($price.text().substr(1)),
                        money = Number($money.text().substr(1));
                    switch (e.target.className) {
                        case 'sub':
                            DB.subData({productID: productID}, function () {
                                count--;
                                shopCount--;
                                money -= price;
                                obj.changeUI({
                                    count,
                                    li,
                                    $count,
                                    shopCount,
                                    $shopCount,
                                    $money,
                                    money
                                });
                            });
                            break;
                        case 'add':
                            DB.addData({productID: productID}, function () {
                                count++;
                                shopCount++;
                                money += price;
                                obj.changeUI({
                                    count,
                                    li,
                                    $count,
                                    shopCount,
                                    $shopCount,
                                    $money,
                                    money
                                });
                            });
                            break;
                        case 'check':
                            break;
                    }
                }
            });
        },
        changeUI: function (obj) {
            if (obj.count === 0) {
                $(obj.li).remove();
                if($('.commodities li').length === 0){
                    $('.empty').css('display', 'block');
                }
            } else {
                obj.$count.text(obj.count);
            }
            if (obj.shopCount === 0) {
                obj.$shopCount.css('display', 'none');
            }
            obj.$money.text(`￥${obj.money.toFixed(2)}`);
            obj.$shopCount.text(obj.shopCount);
        }
    };
    return obj;
});