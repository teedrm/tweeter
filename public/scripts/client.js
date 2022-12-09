
$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const createTweetElement = tweetData => {
    
    const tweets = `

    <article>
        <header class="tweet-header">
            <div class="id">
                <img src=${tweetData.user.avatars}>
                <span>${tweetData.user.name}</span>
            </div>
            <div class="hashtag">
                <span>${tweetData.user.handle}</span>
            </div>
        </header>
        <div class="message">
            <span>${escape(tweetData.content.text)}</span>
        </div>

        <footer class="tweet-footer">
            <span>${timeago.format(tweetData.created_at)}</span>
                <div>
                    <span>
                    <i class="fa-solid fa-flag"></i>
                    <i class="fa-solid fa-retweet"></i>
                    <i class="fa-solid fa-heart"></i>
                    </span>
                </div>
        </footer>
    </article>
    `;
    return tweets;
  };

  // taking in an array of tweet objects then append each one to the tweet container
  const renderTweets = tweetObj => {

    for (let obj of tweetObj) {
      // prepend instead of append for chronological
      $('#tweet-container').prepend(createTweetElement(obj));
    }
  };


// event listener to handle form submission
  $('form').submit(function(event) {

    event.preventDefault();

    const inputTweet = $("#tweet-text").val();

    if (inputTweet === "" || inputTweet === null) {
      $('.error').slideUp('fast');
      $('.error').text("Type in something to tweet").slideDown('fast').css({"color": "#fe6f5e", "text-align": "center"});
    } else if (inputTweet.length > 140) {
      $('.error').slideUp('fast');
      $('.error').text("Tweet exceeds maximum characters").slideDown('fast').css({"color": "#fe6f5e", "text-align": "center"});
    } else {
      $('.error').slideUp('fast');
      // ajax POST request will send serialized form data to server
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
      })
      .then(function(res) {
        renderTweets(res);
        $('#tweet-text').val('');
        $(`.counter`).val(140);
      })
    }
  });


  // make a request and receive array of tweets
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: "json",
    })
      .then(function(data) {
        renderTweets(data);
      });
  };
  loadTweets();

// Hide at start and toggle angles-down to show -> write tweet option
// Click again to hide
$('.new-tweet').hide();

$('.fa-angles-down').on('click', function(event) {
  $('.new-tweet').toggle();
});

});

