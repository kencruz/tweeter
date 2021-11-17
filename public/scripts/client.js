/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

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

  renderTweets(data);
});
