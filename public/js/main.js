requirejs.config({
    baseUrl: '../',
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery.min'
    }
});

require(['jquery'], function ($) {
    $(function () {
        var ejs = $('#ejs-render').find('div.ejs-position');
        $.each(ejs, function () {
            var $contentPane = $(this).find('div.contentpane');
            $('#' + $contentPane.text()).append(this);
            $contentPane.remove();
        });
        $('#ejs-render').hide();
    });
});