define(['jquery'], function ($) {
    return obj = {
        getData: function (url) {
            let self = this;
            $.get(url, function (data, status) {
                if (status == 'success') {
                    self.handleData(JSON.parse(data));
                    $('.load').css('display', 'none');
                }
            });
        },
        handleData: function (objData) {
            let str = `<div class="title_wrap">
                           <h2 class="title">精选水果</h2>
                       </div>
                       <ul>`;
            for (let i in objData.product) {
                let priceStr = '';
                if (objData.product[i].market_price === objData.product[i].price) {
                    priceStr = `<span>￥${objData.product[i].price}</span>`;
                } else {
                    priceStr = `<span>￥${objData.product[i].price}</span>
                    <span class="oldPrice">￥${objData.product[i].market_price}</span>`;
                }

                str += `<li id="list${i}">
                            <div class="left">
                                <img src="${objData.product[i].img}">
                            </div>
                            <div class="right">
                                <div class="des">${objData.product[i].name}</div>
                                <div class="price">${priceStr}</div>
                            </div>
                            <a class="cart" href="javascript:;"></a>
                        </li>`;
            }

            str += `</ul>`;
            $('.category').html(str);
        }
    }
});