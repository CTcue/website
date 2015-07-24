$(document).ready(function() {
  // http://stackoverflow.com/a/1586379/951517
  $("#nav-bar a").click(function() {
      $($(this).attr('href')).scrollView();
  });

  $("#page-header .button").click(function() {
      $($(this).attr('href')).scrollView();
  });

  $("#mobile-nav a").click(function() {
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

$.fn.scrollView = function () {
    return this.each(function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 1000);
    });
};