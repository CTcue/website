/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        // http://stackoverflow.com/a/1586379/951517
        $("#nav-bar a").click(function() {
            $($(this).attr('href')).scrollView();
        });

        $("#page-header a").click(function() {
            $($(this).attr('href')).scrollView();
        });

        $("#mobile-nav a").click(function() {
            $($(this).attr('href')).scrollView();
        });

        $(".hiring").click(function() {
            $($(this).attr('href')).scrollView();
        });

        var mobileNav = $("#mobile-nav");

        $(".lines-button").click(function(){
          if($(this).hasClass("close")) {
            mobileNav.slideUp( "fast", function() {
                // Animation complete.
                $(this).css("display","none");
              });
            $(this).removeClass("close");
          } else {
            mobileNav.slideDown( "fast", function() {
                // Animation complete.
                $(this).css("display","block");
              });
            $(this).addClass("close");
          }
        });

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });
    };

    $.fn.scrollView = function () {
        return this.each(function () {
            $('html, body').animate({
                scrollTop: $(this).offset().top
            }, 1000);
        });
    };
})(jQuery);
