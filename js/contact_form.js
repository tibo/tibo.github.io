$(function() {
    $("#contact_form").submit(function(e) {
      e.preventDefault();

      if (! $("[name='_replyto']").val())
      {
        alert("Your email is mandatory if you want me to get in touch!");
        $("#your_email").css("border", "1px solid #ff0000");
        return;
      }

      if (! $("[name='message']").val())
      {
        alert("Tell me about the purpose of your message and how I can help you!");
        $("#your_message").css("border", "1px solid #ff0000");
        return;
      }

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