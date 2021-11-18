$(document).ready(function() {
  $(window).on('scroll', function() {
    const height = $(this).scrollTop();

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

