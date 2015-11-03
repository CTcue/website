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

  //Form validation
  $("#contactForm").validate({
    rules: {
      name: "required",

      email: {
        required: true,
        email: true
      },

      message: "required"
    },
    messages: {
      name: "Please enter your name",
      email: {
        required: "Please enter a valid email address"
      },
      message: "Please enter a message"
    },

    submitHandler: function(form) {
      var formData = {
        "name": $("input[name='name']").val(),
        "email": $("input[name='email']").val(),
        "phone": $("input[name='phone']").val(),
        "message": $("textarea[name='message']").val()
      }

      var url = "http://app.ctcue.com/api/contact";

      $.ajax({
         type: "POST",
         contentType: 'application/json',
         processData: false,
         url: url,
         data: JSON.stringify(formData),
         success: function(data) {
             if (data === true || data === "true") {
                 $("#contactForm").find("input[type=text], textarea").val("");
                 $("#contactForm .button").slideUp( 300, function() {});
                 $(".success").slideDown( 300, function() {
                    setTimeout(function(){
                      $(".success").slideUp( 300, function() {});
                      $("#contactForm .button").slideDown( 300, function() {});
                    }, 5000);
                 });
             }
         }
       });

      return false; // avoid to execute the actual submit of the form.
    },

    invalidHandler: function(event, validator) {
      return;
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