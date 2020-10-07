/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Fake data taken from initial-tweets.json
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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]



$(document).ready(() => {
  const createTweetElement = (tweetObj) => {
    // calculate how many days after the data of creation we are
    const date = Math.round((Date.now() - tweetObj.created_at) / (1000 * 60 * 60 * 24));
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div>
            <img src="${tweetObj.user.avatars}">
            <p>${tweetObj.user.name}</p>
          </div>
          <a href="#">${tweetObj.user.handle}</a>
        </header>
        <p>${tweetObj.content.text}</p>
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
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
      
    })
  
  };
  renderTweets(data);
  $('form').on('submit', function (event) {
    // Use event.preventDefault() to prevent the default form submission behaviour
    event.preventDefault();
    /* server is configured to receive form data formatted as a query string, 
    .serialize() function, which turns the form data into a query string
    This serialized data should be sent to the server in the data field of the AJAX POST request */
    $.ajax({ url: '/tweets/', data: $(this).serialize(), method: "POST" }).then(response => {
      console.log("Success!")
    }).catch(e => {
      console.log("Failed!");
    })
  })

});




