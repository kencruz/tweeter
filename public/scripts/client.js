/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const renderedTweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.container').append(renderedTweet);
    }
  };

  // This sanitizes the user inputs before building the tweet elements.
  // Prevents cross-site scripting.
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Gets the tweet data object to build the element to render
  const createTweetElement = ({ user, content, created_at }) => {
    return $(`<article class="tweet">
                <header>
                  <div class="profile">
                    <img src="${user.avatars}" /><span class="name"
                      >${user.name}</span
                    >
                  </div>
                  <span class="username">${user.handle}</span>
                </header>
                <p class="content">
                  ${escape(content.text)}
                </p>
                <footer>
                  <span class="date-ago">
                    ${timeago.format(created_at)}
                  </span>
                  <div class="actions">
                    <a href=""><i class="fas fa-flag"></i></a>
                    <a href=""><i class="fas fa-retweet"></i></a>
                    <a href=""><i class="fas fa-heart"></i></a>
                  </div>
                </footer>
              </article>
      `);
  };


  // Load the tweet data from api
  const loadTweets = () => {
    return $.ajax('/tweets', { method: 'GET' }).then(function(tweets) {
      // Reverse the order of the array because we want
      // to see the tweets sorted newest first.
      renderTweets(tweets.reverse());
    });
  };

  // Handler for the write new tweet click event
  $('#write-a-tweet').on('click', function() {

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

  // Handler for the form submission event
  $('form').submit(function() {
    // Stop default action including the page from refreshing
    event.preventDefault();

    // Transversing the dom, we can get the text area
    const tweetCharacterCount = $(this).children().next().val().length;

    // Show the error message if the tweet character limits are not satisfied
    if (tweetCharacterCount < 1 || tweetCharacterCount > 140) {
      $(this).prev().addClass(['visible', 'error']);
      $(this)
        .prev()
        .html(
          '<i class="fas fa-exclamation-triangle"></i>Tweet should be between 1 and 140 characters.<i class="fas fa-exclamation-triangle"></i>'
        );
      // Stop the rest of the execution because of the error.
      return;
    }

    // On valid tweet character limits, hide the dialog box if it was shown
    $(this).prev().removeClass(['visible', 'error']);
    // Save context of 'this' to use in the nested ajax request
    const that = this;
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(this).serialize(),
      success: function(done) {
        // We need to get the latest tweet data after successful post
        $.ajax('/tweets', { method: 'GET' }).then(function(tweets) {
          // So that we can get the newest post, and render to the top of the feed
          const tweetElement = createTweetElement(tweets[tweets.length - 1]);
          $(tweetElement).insertAfter($(that).parent());
        });
      },
    });

    // This will clear the form text box.
    this.reset();
  });

  // Render the tweet feed when ready!
  loadTweets();
});
