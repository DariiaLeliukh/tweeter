/*
  Detects the click on button to create the new tweet
*/
$(document).ready(function() {

  $('.new-tweet-control')[0].addEventListener(
    'click',
    function() {
      let newTweetSection = $('.new-tweet');
      newTweetSection.toggleClass("visible");
      newTweetSection.find('textarea').focus();
    });
});

