$('body').css('opacity', 0);
$(window).load(function() {
  $('body').css('opacity', 1);
  $("#pixie").addClass("fade-in two");
  $("#overlay").addClass('fade-in one');
});
