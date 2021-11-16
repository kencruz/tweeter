$(document).ready(function() {
  $("#tweet-text").on("input",function() {
    const counter = $(this).next().children().last();
    counter.val(140 - this.value.length);
    if (counter.val() < 0) {
      counter.addClass('red');
    } else if (counter.hasClass('red')) {
      counter.removeClass('red');
    }
  });
});

