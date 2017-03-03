define([], function () {

    let obj = {
        dbInfo: {
            dbName: "ShoppingCartDB", // 数据库名称
            dbVersion: 1, // 数据库版本
            db: null
        },
        // 获取indexedDB, 因为内核不同，需要加上前缀
        indexedDB: window.indexedDB || window.webkitIndexedDB
        || window.mozIndexedDB || window.msIndexedDB,
        // 添加数据库
        createOrOpenDB: function (isReadOnly,fun) {
            let request = indexedDB.open(this.dbInfo.dbName, this.dbInfo.dbVersion);

            request.onsuccess = (event) => {
                this.dbInfo.db = event.target.result;
                let type = isReadOnly ? 'readonly' : 'readwrite';
                // 获取事务
                let trans = this.dbInfo.db.transaction(['ShoppingCart'], type);
                fun(trans.objectStore("ShoppingCart"));
            };

            request.onupgradeneeded = function (event) {
                // 创建Object Store
                this.createObjectStore(event);
            }
        },
        // 创建Object Store
        createObjectStore: function (e) {
            // 先获取数据库对象
            let db = e.currentTarget.result;
            // 判断是否存在名称为ShoppingCart的ObjectStore
            if (!db.objectStoreNames.contains("ShoppingCart")) {
                // 创建ShoppingCart这个ObjectStore,并且指定键值
                let shoppingCartStore = db.createObjectStore("ShoppingCart", {keyPath: "productID"});
            }
        },
        // 添加商品
        addData: function (data, success, error) {
            this.createOrOpenDB(false, (store) => {
                if (store) {
                    // 添加数据之前需要先查询数据是否存在
                    let request = store.get(data.productID);
                    //数据查询成功
                    request.onsuccess = (event) => {
                        let obj = event.target.result;
                        let req = '';
                        if (obj) {
                            // 如果数据库中已经存在这条数据
                            obj.count++;
                            req = store.put(obj);
                        } else {
                            // 数据库中不存在这条数据，则添加一条新数据
                            req = store.put(data);
                        }
                        this.callback(req, success, error);
                    };
                    // 数据查询失败
                    request.onerror = (event) => {
                        console.log('数据读取失败!!!');
                        console.info(event);
                    }
                } else {
                    console.log('objectStore获取失败');
                }
            });
        },
        // 减少商品
        subData: function (data, success, error) {
            this.createOrOpenDB(false, (store) => {
                if (store) {
                    let request = store.get(data.productID);
                    request.onsuccess = (event) => {
                        let obj = event.target.result;
                        let req = '';
                        if (obj.count === 1) {
                            // 数量为1的时候再减少数量即可删除这条数据
                            req = store.delete(obj.productID);
                        } else {
                            obj.count--;
                            req = store.put(obj);
                        }
                        this.callback(req, success, error);

                    };
                    request.onerror = (event) => {
                        console.log('数据读取失败!!!');
                        console.info(event);
                    };
                } else {
                    console.log('objectStore获取失败');
                }
            });
        },
        // 查询数据
        queryData: function (success, error) {
            // 用于页面初始化的时候需要查询数据库中的所有数据
            this.createOrOpenDB(true, (store) => {
                if(store){
                    let request = store.openCursor();
                    request.onsuccess = (event) => {
                        let cursor = event.target.result;
                        if(cursor){
                            success(cursor);
                            cursor.continue();
                        }
                    };
                    request.onerror = (event) => {
                      console.log("数据查询错误");
                      console.log(event);
                    };
                }else{
                    console.log('objectStore获取失败');
                }
            })
        },
        // 回调函数的处理
        callback: function (req, success, error) {
            req.onsuccess = (event) => {
                if (typeof success === 'function') {
                    success(event);
                } else {
                    console.log('数据添加成功!');
                }
                // 数据处理完毕，关闭数据库
                this.dbInfo.db.close();
            };
            req.onerror = (event) => {
                if (typeof error === 'function') {
                    error(event);
                } else {
                    console.log('数据添加失败！');
                    console.info(event);
                }
                // 数据处理完毕，关闭数据库
                this.dbInfo.db.close();
            }
        }
    };

    return obj;

});