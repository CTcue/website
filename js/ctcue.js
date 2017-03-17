$(document).ready(function() {
    // Mobile navigation
    var mobileNav = $("#mobile-nav");

    $(".lines-button").click(function(){
        if($(this).hasClass("close")) {
            mobileNav.slideUp( "fast", function() {
                // Animation complete.
                $(this).css("display","none");
            });

            $(this).removeClass("close");
        } 
        else {
            mobileNav.slideDown( "fast", function() {
                // Animation complete.
                $(this).css("display","block");
            });

            $(this).addClass("close");
        }
    });

    // Manipulate opacity and bottom position of header content on scroll
    // https://medium.com/@TonyJing/medium-style-header-aa738696c6ac#.35nf3k4jo
    var lastScrollTop = $(window).scrollTop();

    $(window).scroll(function(){
        var scrollAmount = $(this).scrollTop();
        var scrollSpeed = scrollAmount - lastScrollTop;

        $(".header-content").css({
            top: Math.min(567, scrollAmount * 0.5),
            opacity: "-=" + scrollSpeed/700
        }); 
        
        lastScrollTop = scrollAmount;
     }); 

    // Form validation
    $("#contact-form").validate({
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

            var url = "https://ctcue.com/api/contact";

            // Disable button and show spinner
            $("#contact-form .ctcue-btn").attr("disabled", true);
            $("#contact-form .ctcue-btn span").css("display","none");
            $("#contact-form .ctcue-btn i").css("display","inline-block");

            $.ajax({
                type: "POST",
                contentType: 'application/json',
                processData: false,
                url: url,
                data: JSON.stringify(formData),
                success: function(data) {
                    if (data === true || data === "true") {
                        // Reset form
                        $("#contact-form").find("input[type=text], textarea").val("");
                        
                        // Reset button styling
                        $("#contact-form .ctcue-btn").css("display","none");
                        $("#contact-form .ctcue-btn i").css("display","none");
                        $("#contact-form .ctcue-btn").attr("disabled", false);
                        $("#contact-form .ctcue-btn span").css("display","inline");
                        $("#contact-form .ctcue-btn").addClass("no-transition");

                        // Show success message and after timeout show button again
                        $(".contact-success").slideDown( 300, function() {
                           setTimeout(function(){
                             $(".contact-success").slideUp( 300, function() {
                                $("#contact-form .ctcue-btn").slideDown( 300, function() {
                                    $("#contact-form .ctcue-btn").removeClass("no-transition");
                                });
                             });
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

    //Mailchimp form
    $("#mc-embedded-subscribe-form").on("submit", function(){
        // Check for error class
        if(!$("#mc-embedded-subscribe-form input").hasClass("mce_inline_error")) {
           // Hide form until refresh and show success message
           $("#mc_embed_signup").css("display", "none");
           $("#newsletter-signup-success").css("display", "block");
        } 
    });
});