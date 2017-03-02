require.config({
    paths:{
        'jquery': '../lib/jquery-3.1.1',
        'flexible': '../lib/flexible',
        'fastclick': '../lib/fastclick',
        'index': './index'
    }
});
require(['jquery', 'flexible', 'index'],function(){

});