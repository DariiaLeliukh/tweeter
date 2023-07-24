/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*
  Clean up the content output
*/
const escapeF = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/*
  Creates an article element with the tweeter data provided
  Returns string with all the HTML for one tweeter post
*/
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

/*
  Render all the tweets 
    loops through tweets
    alls createTweetElement for each tweet
    takes return value and appends it to the tweets container
*/
const renderTweets = function(tweets) {
  $('.all-tweets').empty();
  tweets.reverse().forEach(element => {
    const $tweet = createTweetElement(element);
    $('.all-tweets').append($tweet);
  });
};

/*
  Load all the tweets from the file we have and newly added posts
*/
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

/*
  Clear text from the text area when tweeter post is created
*/
const clearNewTweetText = function() {
  let textArea = $("#createNewTweet textarea");
  const counter = textArea.closest('form').children().find('.counter');
  textArea[0].value = '';
  counter[0].classList.remove('negative');
  counter[0].value = 140;

}

/*
  Function to post a tweeter
  If the post is too short or too long, then it is not posted and error message is output
  Otherwise the tweeted is added
*/
const postTweet = function() {

  let input = $("#createNewTweet textarea")[0].value;

  if (input.length > 140) {
    $('#createNewTweet .error')[0].innerText = "The tweet can not be more that 140 characters";
  } else if (input.length === 0) {
    $('#createNewTweet .error')[0].innerText = "The tweet can not be empty";
  } else {
    $('#createNewTweet .error')[0].innerText = '';
    const data = $("#createNewTweet").serialize();

    $.post("/tweets", data)
      .then(() => {
        clearNewTweetText();
      })
      .catch((error) => {
        $('#createNewTweet .error')[0].innerText = "Something went wrong, please try again later";
        console.log(error);
      })
      .done(() => {
        loadTweets();
      });
  }


}

/*
  Main functionality
*/

$(document).ready(function() {
  loadTweets();

  $("#createNewTweet").on("submit", (event) => {
    event.preventDefault();
    postTweet();
  });
});

