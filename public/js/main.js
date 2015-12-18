requirejs.config({
    baseUrl: '../',
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery.min'
    }
});

require(['jquery'], function ($) {

    console.log('nodejs - what is the version ?');

});