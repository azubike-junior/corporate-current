(function($) {
    "use strict";

    $(function() {
        var header = $(".start-style");
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            if (scroll >= 10) {
                header.removeClass('start-style').addClass("scroll-on");
            } else {
                header.removeClass("scroll-on").addClass('start-style');
            }
        });
    });

    //Animation

    $(document).ready(function() {
        $('body.hero-anime').removeClass('hero-anime');
    });


    //Nav Toggle
    function myFunction() {
      var x = document.getElementById("navbarSupportedContent");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }

    //Menu On Hover

    // $('navbar-toggler').on('mouseenter mouseleave', '.nav-item', function(e) {
    //     if ($(window).width() > 750) {
    //         var _d = $(e.target).closest('.nav-item');
    //         _d.addClass('show');
    //         setTimeout(function() {
    //             _d[_d.is(':hover') ? 'addClass' : 'removeClass']('show');
    //         }, 1);
    //     }
    // });

    function toggleDropdown (e) {
      const _d = $(e.target).closest('.dropdown'),
        _m = $('.dropdown-menu', _d);
      setTimeout(function(){
        const shouldOpen = e.type !== 'click' && _d.is(':hover');
        _m.toggleClass('show', shouldOpen);
        _d.toggleClass('show', shouldOpen);
        $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
      }, e.type === 'mouseleave' ? 300 : 0);
    }
    
    $('body')
      .on('mouseenter mouseleave','.dropdown',toggleDropdown)
      .on('click', '.dropdown-menu a', toggleDropdown);

    //Switch light/dark

    $("#switch").on('click', function() {
        if ($("body").hasClass("dark")) {
            $("body").removeClass("dark");
            $("#switch").removeClass("switched");
        } else {
            $("body").addClass("dark");
            $("#switch").addClass("switched");
        }
    });

});