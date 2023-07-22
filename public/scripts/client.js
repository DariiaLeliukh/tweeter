/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


function createTweetElement(data) {
  var postDate = new Date(data.created_at);
  var currentDate = new Date();

  const $tweet = $(`<article class="tweet">
  <header>
    <div class="photo-name">
      <div class="profile-photo">
        <img src="${data.user.avatars}" alt="profile photo">
      </div>
      <div class="profile-name">
        ${data.user.name}
      </div>
    </div>
    <div class="profile-nickname">
    ${data.user.handle}
    </div>
  </header>
  <div class="body">
  ${data.content.text}
  </div>
  <footer>
    <div class="date"> ${postDate}</div>
    <div class="tweet-actions">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>

  </footer>
</article>
`);
  return $tweet;
}

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  tweets.forEach(element => {
    const $tweet = createTweetElement(element);
    $('.all-tweets').append($tweet);
  });
}

$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  renderTweets(data);
});

