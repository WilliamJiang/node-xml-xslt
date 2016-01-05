requirejs.config({
  baseUrl: '../',
  paths: {
    'jquery': 'components/jquery/dist/jquery.min'
  }
});

require(['jquery'], function ($) {
  $(function () {
    //var ejs = $('#ejs-render').find('div.ejs-position');
    //$.each(ejs, function () {
    //    var $contentPane = $(this).find('div.contentpane');
    //    $('#' + $contentPane.text()).append(this);
    //    $contentPane.remove();
    //});
    //$('#ejs-render').hide(); //remove
  });
  //jQuery(document).ready(function ($) {
  //  $('#tabs').tab();
  //});
});
