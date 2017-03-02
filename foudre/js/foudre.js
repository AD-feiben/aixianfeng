define(['jquery'], function ($) {
    let obj = {};
    obj.getdata = function (url) {
        $.get(url, function (data, status) {
            if (status == 'success') {
                let jsonData = JSON.parse(data);
                let html = `<ul>
                    <li class="goods-holder"></li>`;
                for (let list of jsonData.data){
                    let desc = list.pm_desc === '' ? '' : `<span class="pm_desc">${list.pm_desc}</span>`;
                    html += `<li class="goods-list" id="list${list.id}">
                    <div class="img">
                        <img src="${list.img}">
                    </div>
                    <div class="info">
                        <p class="name">${list.name}</p>
                        <p class="tag">
                            ${desc}
                        </p>
                        <p class="specifics ">${list.specifics}</p>
                        <p class="prices">
                            <span class="price">￥${list.price}</span>
                            <span class="oldPrice">￥${list.market_price}</span>
                        </p>

                        <div class="ctrl">
                            <div class="sub">-</div>
                            <div class="count">1</div>
                            <div class="add">+</div>
                        </div>
                    </div>
                </li>`
                }

                html += `<li class="holder"></li>
                    </ul>`;
                $('.list').html(html);
            }
        })
    };

    return obj;
});