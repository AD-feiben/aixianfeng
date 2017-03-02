define(['jquery', 'fastclick'], function($, FastClick){
    FastClick.attach(document.body);

    $('.return').on('click', function(){
        window.history.go(-1);
    })
});