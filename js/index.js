$('body').css('opacity', 0);

$(window).load(function() {
  $('body').css('opacity', 1);
  $('#pixie').addClass("fade-in two");
  $('#overlay').addClass('fade-in one');
});

/*$(document).ready(function() {
  $(window).scroll(function() {
    if ($(document).scrollTop() > 200 ) {
      $("#intro").addClass('morning');
    }
    else {
      $("#intro").removeClass('morning');
    }
  });
});*/

// Change block on hover
/*$(document).ready(function() {
  $('.project_body').hover(function() {
    $('div').prev('.block').css({'background': 'transparent', 'border': 'none'});
  }, function() {
    $('div').prev('.block').css({'background': '#fff', 'border': '3px #000 solid', 'color': '#fff'});
  });
});*/

$(document).ready(function() {
  if ( window.innerWidth <= 768 ) {
    $('.project-top').attr('data-aos', 'fade-up');
    $('.project-bot').attr('data-aos', 'fade-up');
    $('#skills #languages h4').attr('data-aos', 'zoom-in');
  }
  else {
    $('#skills .click_me img').attr('data-aos', 'fade-left');
  }
});
