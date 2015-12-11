(function($) {
  var message = {
    on: 'Turn off all styles and images',
    off: 'Turn on all styles and images'
  };
  var styles = $("link[type='text/css']");
  var images = $('img');
  var cookie = cookie_exists();
  $(window).on('load', function() {
    if(cookie) {
      //$("link[type='text/css']").remove();
      //$('img').hide();
      manipulate_visuals(cookie);
      //console.log('1: Cookie: ' + cookie);

    }
  });
  /*
  */
  $(document).ready(function() {
  var trigger = $('#disable-visuals');

    $(trigger).on('click', function (e) {
      e.preventDefault();
      var option = (cookie_exists() == 1 ? 0 : 1);
      console.log('Trigger: Click option: ' + option + ', Cookie: ' + cookie_exists());
      manipulate_visuals(option);
    });
  });

    function cookie_exists () {
      var re = RegExp(/website_visuals=[\d]/);
      var all_cookies = document.cookie;
      var result = re.exec(all_cookies);
      if(result) {
      //console.log(result[0].split('=').pop());
        return result[0].split('=').pop();
      }
      else {
        //console.log('Needed to create cookie');
        document.cookie = 'website_visuals=1';
        return 1;
      }
    }

    function manipulate_visuals(option) {
      //console.log(option);
      if (option == 0) {
        $(styles).remove();
        $(images).hide();
        //$(trigger).text(message.off);;
        document.cookie = 'website_visuals=0';
      }
      else {
        $('head').append(styles);
        $(images).show();
        //$(trigger).text(message.on);
        document.cookie = 'website_visuals=1';
      }
        console.log('Manipulate: Cookie: ' + cookie_exists());
    }
    /*
    */
})(jQuery);
