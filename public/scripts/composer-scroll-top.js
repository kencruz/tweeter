$(document).ready(function() {
  // jQuery fadeIn by default will put display to block.
  // This should change the default to flex for this element.
  $('#scroll-up').css('display', 'flex').hide();

  // Handler for the window scroll event
  $(window).on('scroll', function() {
    const height = $(this).scrollTop();

    // This will stop the nav bar from a fixed position at 400px
    if (height > 399) {
      $('nav').addClass('nav-anchor');
    } else {
      $('nav').removeClass('nav-anchor');
    }

    // The scroll-up button will only appear after scrolling down 500px.
    if (height > 500) {
      $('#scroll-up').fadeIn();
    } else {
      $('#scroll-up').fadeOut();
    }
  });

  // Handler for clicking on the scroll-up button
  $('#scroll-up').on('click', function() {
    // At desktop layouts just go to the top of the page
    if ($(document).width() > 1023) {
      $(window).scrollTop(0);
    } else {
      // Smaller screen layouts go to the 400px position where the tweet post form is.
      $(window).scrollTop(400);
    }
    // Open up the new-tweet form and focus on the text area
    $('.new-tweet').slideDown();
    $('#tweet-text').focus();
  });
});

