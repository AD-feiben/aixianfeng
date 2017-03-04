define(['jquery', 'fastclick', 'handleDB'], function ($, FastClick, DB) {
    FastClick.attach(document.body);
    let shopCount = parseInt($('.corner').text()) || 0;
    let baseUrl = 'http://h5.yztctech.net/api/axf/';
    let obj = {};
    // 初始化函数
    obj.init = function () {
        // 页面刚加载的时候默认显示热销榜
        if ($('.list ul').length === 0) {
            let query = encodeURIComponent('热销榜');
            obj.getdata(`${baseUrl}apicategory.php?category=${query}`, query);
        }
        $('.category').on('click', function (e) {
            // 判断点击事件的触发源
            if (e.target.nodeName == 'LI' && e.target.textContent) {
                $('.category li').removeClass('active');
                $(e.target).addClass('active');
                //获取查询参数
                let categoryStr = e.target.textContent;
                let URLStr = encodeURIComponent(categoryStr);
                $('.list ul').css('display', 'none');
                let id = URLStr.replace(/%/g, '');
                // 判断ul是否加载过了
                if (($(`#${id}`).length)) {
                    $(`#${id}`).css('display', 'block');
                } else {
                    obj.getdata(`${baseUrl}apicategory.php?category=${URLStr}`, URLStr);
                }
            }
        });
    };
    /*
     * 使用GET方式发起HTTP请求
     * param String  URL地址
     */
    obj.getdata = function (url, query) {
        $.get(url, function (data, status) {
            if (status == 'success') {
                // 将ajax响应的数据，转化为js对象
                let objData = JSON.parse(data);
                // 对数据进行处理
                obj.handleData(objData, query);
            }
        })
    };

    /*
     * 将数据生成DOM结构，插入DIV中
     * param Object
     */
    obj.handleData = function (objData, query) {
        // 通过字符串拼接的方式处理数据
        let id = query.replace(/%/g, '');
        let html = `<ul id="${id}">
                    <li class="goods-holder"></li>`;

        // 遍历数据
        for (let i in objData.data) {
            // 判断 objData.data[i].pm_desc 是否为空
            // 如果为空就不生成span标签
            let desc = objData.data[i].pm_desc === '' ? '' : `<span class="pm_desc">${objData.data[i].pm_desc}</span>`;
            // 拼接字符串生成DOM结构
            html += `<li class="goods-list" id="${id}${objData.data[i].id}">
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
                            <div class="count">0</div>
                            <div class="add">+</div>
                        </div>
                    </div>
                </li>`
        }

        html += `<li class="holder"></li></ul>`;
        $('.list').append(html);
        obj.queryData();
        obj.addEvent();
    };

    obj.queryData = function () {
        DB.queryData(function (result) {
            for(let i in result){
                let cursor = result[i],
                    key = cursor.key,
                    obj = cursor.value,
                    $li = $(`#${key}`);
                $li.find('.ctrl').addClass('active');
                $li.find('.count').text(`${obj.count}`);
            }
        })
    };

    obj.addEvent = function () {
        $('.list .ctrl div').on('click', function (e) {
            let parent = e.target.parentNode,
                grandNode = parent.parentNode,
                count = parseInt($(parent).find('.count').text()),
                productID = grandNode.parentNode.id,
                name = $(grandNode).find('.name').text(),
                price = $(grandNode).find('.price').text(),
                img = $(grandNode.parentNode).find('img').attr('src'),
                data = {
                    productID: productID,
                    count: 1,
                    name: name,
                    price: price,
                    img: img
                };
            switch (e.target.className) {
                case 'add' :
                    alert('添加数据');
                    alert(JSON.stringify(data));
                    DB.addData(data, function () {
                        alert('数据添加成功');
                        if (count === 0) {
                            $(parent).addClass('active');
                        }
                        count++;
                        shopCount++;
                        if (shopCount === 0) {
                            $('.corner').css('display', 'none')
                        } else {
                            $('.corner').css('display', 'block').text(shopCount);
                        }
                        $(parent).find('.count').text(count);
                    }, function(){alert('数据添加失败')});
                    break;
                case 'sub' :
                    DB.subData(data, function () {
                        if (count === 1) {
                            $(parent).removeClass('active');
                        }
                        count--;
                        shopCount--;
                        if (shopCount === 0) {
                            $('.corner').css('display', 'none');
                        } else {
                            $('.corner').css('display', 'block').text(shopCount);
                        }
                        $(parent).find('.count').text(count);
                    });
                    break;
            }
        })
    };

    return obj;
});