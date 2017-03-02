define(['jquery'], function ($) {
    let obj = {};
    obj.getdata = function (url) {
        $.get(url, function (data, status) {
            if (status == 'success') {
                let jsonData = JSON.parse(data);
                let html = `<ul>
                    <li class="goods-holder"></li>`;
                for (let i in jsonData.data){
                    let desc = jsonData.data[i].pm_desc === '' ? '' : `<span class="pm_desc">${jsonData.data[i].pm_desc}</span>`;
                    html += `<li class="goods-list" id="list${jsonData.data[i].id}">
                    <div class="img">
                        <img src="${jsonData.data[i].img}">
                    </div>
                    <div class="info">
                        <p class="name">${jsonData.data[i].name}</p>
                        <p class="tag">
                            ${desc}
                        </p>
                        <p class="specifics ">${jsonData.data[i].specifics}</p>
                        <p class="prices">
                            <span class="price">￥${jsonData.data[i].price}</span>
                            <span class="oldPrice">￥${jsonData.data[i].market_price}</span>
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