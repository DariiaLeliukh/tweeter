/*
  Detect the scroll to chnage the color for the top navigation
*/
$(document).ready(function() {
  let nav = $("nav");

  document.addEventListener('scroll', function(event) {
    if ($(this).scrollTop() > nav[0].scrollHeight) {
      nav[0].classList.add('scrolled');
    } else {
      nav[0].classList.remove('scrolled');
    }
  }, true /*Capture event*/);
});