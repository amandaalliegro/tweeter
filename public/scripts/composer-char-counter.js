$(document).ready(function() {
  // --- our code goes here ---
// change event: it triggers *after* the change is made;
// keydown event: updates are delayed by one key
// keyup event: 
// blur event: it triggers when we *lose focus*
// keypress event: 
  $("#tweet-text").bind("keyup", function (event) {
    const value = 140 - $("#tweet-text").val().length;
    $(this).parent().find(".counter").text(value)


  })

});
