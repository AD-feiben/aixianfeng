define(['jquery', 'handleDB'], function ($, DB) {
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
                    priceStr = `<span class="newPrice">￥${objData.product[i].price}</span>`;
                } else {
                    priceStr = `<span class="newPrice">￥${objData.product[i].price}</span>
                    <span class="oldPrice">￥${objData.product[i].market_price}</span>`;
                }

                str += `<li id="orderList${i}">
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
            this.handleEvent();
        },
        handleEvent: function(){
            $('.cart').on('click', function(e){
                let add = e.target,
                    productID = add.parentNode.id,
                    name = $(add.parentNode).find('.des').text(),
                    price = $(add.parentNode).find('.newPrice').text(),
                    img = $(add.parentNode).find('img').attr('src');
                let data={
                    productID,
                    count: 1,
                    name,
                    price,
                    img
                };
                DB.addData(data,function(){
                    let shopCount = parseInt($('.corner').text()) || 0;
                    if(shopCount === 0){
                        $('.corner').css('display', 'block');
                    }
                    $('.corner').text(++shopCount);
                });
            })
        }
    }
});