/*$('#nav').affix({
  offset: {
    top: $('header').height()-$('#nav').height
  }
});*/

/* highlight the top nav as scrolling occurs */
$('body').scrollspy({ target: '.navbar-custom', offset: -60 })

$(window).scroll(function() {
  if ( window.innerWidth > 768 ) {
    if ( $(this).scrollTop() > 755 ) {
      $('#content').css('padding-top', 80);
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
  }
  else {
    if ( $(this).scrollTop() > 575 ) {
      $('.navbar-custom').css('background-color', 'white');
      $('.navbar-custom .nav li > a').css('color', 'black');
      $('.icon-bar').css('background-color', 'black');
    }
    else {
      $('.navbar-custom').css('background-color', 'black');
      $('.navbar-custom .nav li > a').css('color', 'white');
      $('.icon-bar').css('background-color', 'white');
    }
  }
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
$('.navbar-custom .navbar-nav li > a').click(function(event) {
  var link = $(this).attr('href');
  if ( $(window).scrollTop() > 755 ) {
    var pos = $(link).offset().top - 70;
    console.log("HI");
  }
  else {
    var pos = $(link).offset().top - 83;
  }
  $('body, html').stop().animate({scrollTop: pos}, 1500, 'easeInOutExpo');
  $('.navbar-collapse').collapse('hide');
  event.preventDefault();
});

$(document).ready(function() {
  if ( window.innerWidth <= 768 ) {
    $('.navbar-custom').removeAttr('data-spy');
    $('.navbar-custom').removeAttr('data-offset-top');
    $('.navbar-custom').removeClass('navbar-static-top');
    $('.navbar-custom').addClass('navbar-fixed-top');
    $('.navbar-custom').css('top', 0);
  }
});
