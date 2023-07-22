$(document).ready(function() {
  const newTweetTextArea = $('#tweet-text');

  newTweetTextArea[0].addEventListener(
    'input',
    function() {
      const inputLength = $(this)[0].value.length;
      const counter = $(this).closest('form').children().find('.counter');
      const newLength = 140 - inputLength;

      if (newLength <= 0) {
        counter[0].classList.add('negative');
      } else {

        counter[0].classList.remove('negative');

      }
      counter[0].innerText = 140 - inputLength;

    });
});