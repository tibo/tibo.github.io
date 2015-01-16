$(function() {
    $("#contact_form").submit(function(e) {
      e.preventDefault();
      $.ajax({
        url: "//formspree.io/thibaut@lelevier.com", 
        method: "POST",
        data: $(this).serialize(),
        dataType: "json",
        success: function(data){
          $('#contact_container').empty();
          $('#contact_container').html("<h3>Thank You</h3><p>Your request has been sent and I will get in touch with you soon.");
        }
      });
    });
});