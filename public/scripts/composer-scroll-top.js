$(document).ready(function() {
  $('#scroll-up').css('display', 'flex').hide();
  $(window).on('scroll', function() {
    const height = $(this).scrollTop();
    console.log(height);

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
    if ($(document).width() > 1023) {
      $(window).scrollTop(0);
    } else {
      $(window).scrollTop(400);
    }
    $('.new-tweet').slideDown();
    $('#tweet-text').focus();
  });
});

