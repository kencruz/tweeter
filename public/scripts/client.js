/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const renderTweets = function(tweets) {
    // loops through tweets in reverse chronological order
    for (const tweet of tweets.reverse()) {
      // calls createTweetElement for each tweet
      const renderedTweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.container').append(renderedTweet);
    }
  };

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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

  const loadTweets = () => {
    return $.ajax('/tweets', { method: 'GET' }).then(function(tweets) {
      renderTweets(tweets);
    });
  };

  $('.action').on('click', function() {
    if ($(document).width() > 1023) {
      $(window).scrollTop(0);
    } else {
      $(window).scrollTop(400);
    }
    console.log('new tweet');
    $('.new-tweet').slideDown();
    $('#tweet-text').focus();
  });

  $('form').submit(function() {
    event.preventDefault();

    const tweetContent = $(this).serialize();
    const tweetCharacterCount = tweetContent.split('text=')[1].length;

    if (tweetCharacterCount < 1 || tweetCharacterCount > 140) {
      $(this).prev().addClass(['visible', 'error']);
      $(this)
        .prev()
        .html(
          '<i class="fas fa-exclamation-triangle"></i>Tweet should be between 1 and 140 characters.<i class="fas fa-exclamation-triangle"></i>'
        );
      return;
    }

    // hide the dialog box if it was shown
    $(this).prev().removeClass(['visible', 'error']);
    // save context to use in the nested ajax request
    const that = this;
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: tweetContent,
      success: function(done) {
        console.log('tweet sent');
        $.ajax('/tweets', { method: 'GET' }).then(function(tweets) {
          const tweetElement = createTweetElement(tweets[tweets.length - 1]);
          $(tweetElement).insertAfter($(that).parent());
        });
      },
    });
    this.reset();
  });

  loadTweets();
});
