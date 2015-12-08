(function($) {
  $(document).ready(function() {
    var message = {
      on: 'Turn off all styles and images',
      off: 'Turn on all styles and images'
    };
    var styles = $("link[type='text/css']");
    var images = $('img');
    var trigger = $('#disable-visuals');
    $(trigger).data('visuals', true).text(message.on);;
    $(trigger).on('click', function (e) {
      e.preventDefault();
      if( $(trigger).data('visuals') ) {
        $(styles).remove();
        $(images).hide();
        $(trigger).data('visuals', false).text(message.off);;
      }
      else {
        $('head').append(styles);
        $(images).show();
        $(trigger).data('visuals', true).text(message.on);
      }
    });
  });
})(jQuery);
