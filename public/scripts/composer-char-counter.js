$(document).ready(function() {
  // Handler for the input event on the new tweet text box
  $('#tweet-text').on('input', function() {
    // Select the counter element
    const counter = $(this).next().children().last();

    // Difference of the max limit (140) and the
    // length of the input text
    counter.val(140 - this.value.length);

    // Make the counter text red if its over the limit
    if (counter.val() < 0) {
      counter.addClass('red');
    } else if (counter.hasClass('red')) {
      counter.removeClass('red');
    }
  });
});

