(function($) {
  $(window).on('load unload', function() {
    var message = {
      on: 'Turn off all styles and images',
      off: 'Turn on all styles and images'
    };
    var styles = $("link[type='text/css']");
    var images = $('img');
    var trigger = $('#disable-visuals');
    var cookie = cookie_exists();
    $(trigger).text(message.on);;
    if(cookie) {
      //$("link[type='text/css']").remove();
      //$('img').hide();
      manipulate_visuals(cookie);
      console.log('1: Cookie: ' + cookie);

    }
    /*
    console.log(cookie);
    manipulate_visuals(cookie);



    if (cookie) {
      manipulate_visuals(cookie);
      //console.log('Cookie exists: ' + cookie);
    }
    else {
      document.cookie = 'website_visuals=1';
      cookie = 1;
      $(trigger).text(message.on);
      //console.log('Cookie DOES NOT exist: ' + cookie);
    }

    $(window).on('load', function () {
      console.log(cookie);
      //manipulate_visuals(cookie);
    });
    */

    $(trigger).on('click', function (e) {
      e.preventDefault();
      var option = (cookie == 1 ? 0 : 1);
      console.log('2: Click option: ' + option + ', Cookie: ' + cookie);
      manipulate_visuals(option);
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
      if (option == 1) {
        $(styles).remove();
        $(images).hide();
        $(trigger).text(message.off);;
        document.cookie = 'website_visuals=0';
        //console.log('Cookie changed: 0');
      }
      else {
        $('head').append(styles);
        $(images).show();
        $(trigger).text(message.on);
        document.cookie = 'website_visuals=1';
        //console.log('Cookie changed: 1');
      }
    }
    /*
    */
  });
})(jQuery);
