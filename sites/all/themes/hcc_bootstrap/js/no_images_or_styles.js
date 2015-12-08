(function($) {
  $(document).ready(function() {
    var message = {
      on: 'Turn off all styles and images',
      off: 'Turn on all styles and images'
    };
    var styles = $("link[type='text/css']");
    var images = $('img');
    var trigger = $('#disable-visuals');
    $(trigger).data('visuals', 1).text(message.on);;
    /*
    */
    var cookie = cookie_exists();

    if (cookie) {
      manipulate_visuals(cookie);
    }
    else {
      document.cookie = 'website_visuals=1';
      $(trigger).data('visuals', 1).text(message.on);
    }


    $(trigger).on('click', function (e) {
      e.preventDefault();
      if( $(trigger).data('visuals' === 1) ) {
        manipulate_visuals(1);
      }
      else {
        manipulate_visuals(0);
      }
    });

    function cookie_exists () {
      var re = RegExp(/website_visuals=[\d]/);
      var all_cookies = document.cookie;
      var result = re.exec(all_cookies);
      return result[0].split('=').pop();
    }

    function manipulate_visuals(option) {
      if (option === 1) {
        $(styles).remove();
        $(images).hide();
        $(trigger).data('visuals', 0).text(message.off);;
        document.cookie = 'website_visuals=0';
      }
      else {
        $('head').append(styles);
        $(images).show();
        $(trigger).data('visuals', 1).text(message.on);
        document.cookie = 'website_visuals=1';
      }
    }
  });
})(jQuery);
