/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const renderTweets = function (tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const renderedTweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $(".container").append(renderedTweet);
    }
  };

  const createTweetElement = (data) => {
    return $(`<article class="tweet">
                <header>
                  <div class="profile">
                    <img src="${data.user.avatars}" /><span class="name"
                      >${data.user.name}</span
                    >
                  </div>
                  <span class="username">${data.user.handle}</span>
                </header>
                <p class="content">
                  ${data.content.text}
                </p>
                <footer>
                  <span class="date-ago">
                    ${timeago.format(data.created_at)}
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
    return $.ajax("/tweets", { method: "GET" }).then(function (tweets) {
      renderTweets(tweets);
    });
  };

  $("form").submit(function () {
    event.preventDefault();

    const tweetContent = $(this).serialize();
    const tweetCharacterCount = tweetContent.split("text=")[1].length;

    if (tweetCharacterCount < 1 || tweetCharacterCount > 140) {
      alert("Tweet should be between 1 and 140 characters.");
      return;
    }

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: tweetContent,
      success: function (done) {
        console.log("tweet sent");
        loadTweets();
      },
    });
    this.reset();
  });

  loadTweets();
});
