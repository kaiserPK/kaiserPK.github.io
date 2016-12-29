jQuery(document).ready(function() {

  $('.contact-form form').submit( function(e) {
    e.preventDefault();
    var postdata = $('.contact-form form').serialize();
    $.ajax({
      type: 'POST',
      url: 'php/index.php',
      data: postdata,
      dataType: 'json',
      success: function(json) {
        if ( json.nameMessage == '' && json.emailMessage == '' && json.messageMessage == '') {
          $('.contact-form').append('<p> Thanks for contacting me! I will get back to you soon. </p>');
        }
      }
    });
  });

});
