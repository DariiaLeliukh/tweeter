/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escapeF = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

function createTweetElement(data) {
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
  ${escapeF(data.content.text)}
  </div>
  <footer>
    <div class="date"> ${timeago.format(data.created_at)}</div>
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

  $('.all-tweets').empty();
  tweets.reverse().forEach(element => {
    const $tweet = createTweetElement(element);
    $('.all-tweets').append($tweet);
  });
};

const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    type: "GET",
    dataType: "json",
    success: (result) => {
      renderTweets(result);
    },
    error: (error) => {
      console.error("An error occured, ", error);
    },
  });
};

const clearNewTweetText = function() {
  let textArea = $("#createNewTweet textarea");
  const counter = textArea.closest('form').children().find('.counter');
  textArea[0].value = '';
  counter[0].classList.remove('negative');
  counter[0].value = 140;

}

const postTweet = function() {

  let input = $("#createNewTweet textarea")[0].value;

  if (input.length > 140) {
    //$("<p>Too long</p>").prependTo("#createNewTweet .form-footer");
    $('#createNewTweet .error')[0].innerText = "The tweet can not be more that 140 characters";
  } else if (input.length === 0) {
    //$("<p>Too short</p>").prependTo("createNewTweet .form-footer");
    $('#createNewTweet .error')[0].innerText = "The tweet can not be empty";
    //alert("Too short");
  } else {
    $('#createNewTweet .error')[0].innerText = '';
    const data = $("#createNewTweet").serialize();

    $.post("/tweets", data)
      .then(() => {
        clearNewTweetText();
        loadTweets();
      });
  }


}

$(document).ready(function() {
  loadTweets();

  $("#createNewTweet").on("submit", (event) => {
    event.preventDefault();
    postTweet();
  });
});

