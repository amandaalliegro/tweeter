$(document).ready(() => {
  $("#compose-button").on('click', (evt) => {
    //evt.preventDefault();
    // if the form is not visible, slide down the form
    if ($('.new-tweet:visible').length === 0) {
      $('.new-tweet').slideDown();
      return $("#tweet-text").focus();
    }
    // else, unfocus the button and hide the form
    $("#compose-button").blur();
    return $('.new-tweet').slideUp();
  });
});