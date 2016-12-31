/*$('#nav').affix({
  offset: {
    top: $('header').height()-$('#nav').height
  }
});*/

/* highlight the top nav as scrolling occurs */
$('body').scrollspy({ target: '#nav', offset: -60 })

$(window).scroll(function() {
  if ( $(this).scrollTop() > 755 ) {
    if ( window.innerWidth > 755 ) {
      $('#content').css('padding-top', 75);
    }
    else {
      $('#content').css('padding-top', 0);
    }
    $('.navbar-custom').css('background-color', 'white');
    $('.navbar-custom .nav li > a').css('color', 'black');
    $('.icon-bar').css('background-color', 'black');
  }
  else {
    $('#content').css('padding-top', 0);
    $('.navbar-custom').css('background-color', 'black');
    $('.navbar-custom .nav li > a').css('color', 'white');
    $('.icon-bar').css('background-color', 'white');
  }
  /* Alternate way using jumbotron margins */
  /*
  if ( $(this).scrollTop() > 650 ) {
    $('.jumbotron').css('margin-top', 70);
  }
  else {
    $('.jumbotron').css('margin-top', 20);
  }
  */
});

/* smooth scrolling for scroll to top */
$('.scroll-top').click(function(event) {
  $('body, html').stop().animate({scrollTop: 0}, 1000, 'easeInOutExpo');
  event.preventDefault();
});

$('.scroll-down').click(function(event) {
  $('body, html').stop().animate({scrollTop: 870}, 1500, 'easeInOutExpo');
  event.preventDefault();
});

/* smooth scrolling for nav sections */
$('#nav .navbar-nav li>a').click(function(event) {
  var link = $(this).attr('href');
  var pos = $(link).offset().top + 60;
  $('body, html').stop().animate({scrollTop: pos}, 1500, 'easeInOutExpo');
  $('.navbar-collapse').collapse('hide');
  event.preventDefault();
});

$(document).ready(function() {
  if ( window.innerWidth <= 750 ) {
    $('.navbar-custom').removeAttr('data-spy');
    $('.navbar-custom').removeAttr('data-offset-top');
    $('.navbar-custom').removeClass('navbar-static-top');
    $('.navbar-custom').addClass('navbar-fixed-top');
    $('.navbar-custom').css('top', 0);
  }
});
