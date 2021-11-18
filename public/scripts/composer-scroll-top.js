$(document).ready(function() {
  $(window).on('scroll', function() {
    const height = $(this).scrollTop();

    if (height > 500) {
      $('#scroll-up').removeClass('hidden');
    } else {
      $('#scroll-up').addClass('hidden');
    }
  });

  $('#scroll-up').on('click', function() {
    $(window).scrollTop(400);
    $('.new-tweet').slideDown();
    $('#tweet-text').focus();
  });
});

