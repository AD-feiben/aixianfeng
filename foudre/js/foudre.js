define(['jquery'], function ($) {
    let obj = {};
    /*
    * 使用GET方式发起HTTP请求
    * param String  URL地址
    */
    obj.getdata = function (url) {
        let self = this;
        $.get(url, function (data, status) {
            if (status == 'success') {
                // 将ajax响应的数据，转化为js对象
                let objData = JSON.parse(data);
                // 对数据进行处理
                self.handleData(objData);
            }
        })
    };

    /*
    * 将数据生成DOM结构，插入DIV中
    * param Object
    */
    obj.handleData = function (objData) {
        // 通过字符串拼接的方式处理数据
        let html = `<ul>
                    <li class="goods-holder"></li>`;

        // 遍历数据
        for (let i in objData.data) {
            // 判断 objData.data[i].pm_desc 是否为空
            // 如果为空就不生成span标签
            let desc = objData.data[i].pm_desc === '' ? '' : `<span class="pm_desc">${objData.data[i].pm_desc}</span>`;
            html += `<li class="goods-list" id="list${objData.data[i].id}">
                    <div class="img">
                        <img src="${objData.data[i].img}">
                    </div>
                    <div class="info">
                        <p class="name">${objData.data[i].name}</p>
                        <p class="tag">
                            ${desc}
                        </p>
                        <p class="specifics ">${objData.data[i].specifics}</p>
                        <p class="prices">
                            <span class="price">￥${objData.data[i].price}</span>
                            <span class="oldPrice">￥${objData.data[i].market_price}</span>
                        </p>

                        <div class="ctrl">
                            <div class="sub">-</div>
                            <div class="count">1</div>
                            <div class="add">+</div>
                        </div>
                    </div>
                </li>`
        }

        html += `<li class="holder"></li></ul>`;
        $('.list').html(html);
    };

    return obj;
});