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
      $("body").get(0).style.setProperty("--primary-color", "black");
      $("body").get(0).style.setProperty("--secondary-color", "white");
    }
    else {
      $("body").get(0).style.setProperty("--primary-color", "white");
      $("body").get(0).style.setProperty("--secondary-color", "black");
    }
  }
  else {
    if ( $(this).scrollTop() > 575 ) {
      $("body").get(0).style.setProperty("--primary-color", "black");
      $("body").get(0).style.setProperty("--secondary-color", "white");
    }
    else {
      $("body").get(0).style.setProperty("--primary-color", "white");
      $("body").get(0).style.setProperty("--secondary-color", "rgba(0, 0, 0, 0.8)");
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
$('.scroller').click(function(event) {
  var link = $(this).attr('href');
  if ( $(window).scrollTop() > 755 ) {
    var pos = $(link).offset().top - 70;
  }
  else {
    var pos = $(link).offset().top - 83;
  }
  $('body, html').stop().animate({scrollTop: pos}, 1500, 'easeInOutExpo');
  $('.navbar-collapse').collapse('hide');
  event.preventDefault();
});

$('.navbar-custom .navbar-nav li > a').hover(function(event) {
  if (window.innerWidth > 768) {
    event
      .target
      .classList
      .toggle('underline');
  }
})

$(document).ready(function() {
  if ( window.innerWidth <= 768 ) {
    $('.navbar-custom').removeAttr('data-spy');
    $('.navbar-custom').removeAttr('data-offset-top');
    $('.navbar-custom').removeClass('navbar-static-top');
    $('.navbar-custom').addClass('navbar-fixed-top');
  }
});
