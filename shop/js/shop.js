define(['jquery', 'handleDB'], function($, DB){
    let obj = {
        init: function(){
            let money = 0;
            DB.queryData(function(cursor){
                let obj = cursor.value;
                let price = Number(obj.price.substr(1));
                console.log(price);
                money += price * obj.count;
                let str = `<li>
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
                $('.commodities ul').append(str);
                $('.money').text(`￥${money}`);
            })
        }
    };
    return obj;
});