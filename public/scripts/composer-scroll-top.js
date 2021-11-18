$(document).ready(function() {
  $(window).on('scroll', function() {
    const height = $(this).scrollTop();

    if (height > 399) {
      $('nav').addClass('nav-anchor');
    } else {
      $('nav').removeClass('nav-anchor');
    }

    if (height > 500) {
      $('#scroll-up').fadeIn();
    } else {
      $('#scroll-up').fadeOut();
    }
  });

  $('#scroll-up').on('click', function() {
    $(window).scrollTop(400);
    $('.new-tweet').slideDown();
    $('#tweet-text').focus();
  });
});

