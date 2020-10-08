/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  const createTweetElement = (tweetObj) => {
    // calculate how many days after the data of creation we are
    const date = Math.round((Date.now() - tweetObj.created_at) / (1000 * 60 * 60 * 24));
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div>
          <img src="${escape(tweetObj.user.avatars)}">
          <p>${escape(tweetObj.user.name)}</p>
          </div>
          <a href="#">${escape(tweetObj.user.handle)}</a>
        </header>
        <p>${escape(tweetObj.content.text)}</p>
        <footer>
          <p>${date} days ago</p>
          <div>
            <span>&#9873</span>
            <span>&#8633</span>
            <span>&#9829</span>
          </div>
        </footer>
      </article>
    `)
    return $tweet;
  };
  const renderTweets = tweetsArray => {
    // loops through tweets
    tweetsArray.forEach(elem => {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(elem);
      // takes return value and prepends it to the tweets container
      $('#tweets-container').prepend($tweet);
      
    })
  
  };
  
  $('form').on('submit', function (event) {
    // Use event.preventDefault() to prevent the default form submission behaviour
    event.preventDefault();
    // before validating the input, get rid of any error messages
    $("#error-message").slideUp();
    $("#error-message").empty();
    // Implement validation before sending the form data to the server
    //The user should be given an error that their tweet content is too long
    if ($("#tweet-text").val().length > 140) {
      $("#error-message").html("&#128680; Your tweet could not be processed since it exceeds the 140 characters. &#128680;");
      $("#error-message").slideDown({
        start: function () {
          $(this).css({
            display: "flex"
          })
        }
      });
      return;
    }
    //The user should be given an error that their tweet is empty
    if (!$("#tweet-text").val()) {
      $("#error-message").html("&#128680; Your tweet seems to be empty. &#128680 ");
      $("#error-message").slideDown({
        start: function () {
          $(this).css({
            display: "flex"
          })
        }
      });
      return;
    }
    // valid content is saved on the data object, the text area and counter must be reseted, a request is sent to the server to update the database
    const data = $(this).serialize()
    $("#tweet-text").val("");
    $("#tweet-text").parent().find(".counter").text(140);
    $.ajax({ url: '/tweets/', data, method: "POST" }).then(response => {
      $.ajax({ url: '/tweets/', method: "GET" }).then(response => {
        $("#tweets-container").empty();
        renderTweets(response);
      })
      console.log("Success!")
    }).catch(e => {
      console.log("Failed!");
    })
  })
  //that is responsible for fetching tweets from the http://localhost:8080/tweets page
  const loadTweets = () => {
    //The loadtweets function will use jQuery to make a request to /tweets and receive the array of tweets as JSON
    $.ajax({ url: '/tweets/', method: "GET" }).then(response => {
      console.log("Successful load!!");
      //so your success callback function will simply call up renderTweets
      renderTweets(response);
    }).catch(e => {
      console.log("Failed to load tweets");
    })
  }
  loadTweets();

});




