$(document).ready(function() {
  $("#tweet-text").on("input",function() {
    $(this).next().children().last().val(140 - this.value.length);
  });
});

