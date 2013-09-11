

function grabTweets () {

  userHandle = $('h1 span').text();

  $.ajax({
    url: '/grabTweets',
    type: 'Post',
    dataType: "JSON",
    data: {user: userHandle},
    beforeSend: function () {
      $('.container #tweets img').addClass('visible');
      domTweets = $('.container #tweets ul li').hide();
    }
  })
  .done(function(response) {
    console.log("success");

    domTweets.remove();
    $('.container #tweets img').removeClass('visible');

    $.each(response,function() {
      // console.log(this);
      // console.log(this.tweet.content);
      console.log(typeof(this));
      $('<li>'+this.content+'</li>').appendTo('#tweets ul');
    });

  })
  .fail(function() {
    console.log("error");

    domTweets.show();

  })
  .always(function() {
    console.log("complete");
  });
  
}


function sendTweet () {

  var tweet = $('form textarea').val();

  $.ajax({
    url: '/tweet',
    type: 'POST',
    data: {user: tweet, handle: userHandle},
    beforeSend: function (data) {
      $('.container #tweets img').addClass('visible');
      domTweets.hide();
      console.log(data);
    }
  })
  .done(function() {
    console.log("success");
    tweet = $('form textarea').val("");
    grabTweets();
  })
  .fail(function() {
    console.log("error");
    domTweets.show();
  })
  .always(function() {
    console.log("complete");
  });
  
}

function getJobId () {
  
  var tweet = $('form textarea').val();

  $.ajax({
    url: '/get_job',
    type: 'POST',
    // dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
    data: {user: tweet},
  })
  .done(function(jid) {
    console.log("success jid");
    console.log(jid);
    checkJob(jid);

  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete jid");

  });

}

function checkJob (jid) {
  $.ajax({
    url: '/status',
    type: 'GET',
    // dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
    data: {job_id: jid},
  })
  .done(function(response) {
    console.log("success in checkJob");
    console.log(response);
    if (response == "false"){
      setTimeout(checkJob(jid), 5000);
    }
    else if(response == "true"){
      grabTweets();
    }
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
  
}



$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  grabTweets();


  $('#tweet').click(function(event) {
    event.preventDefault();
    // sendTweet();
    // getJobId();
    getJobId();
    // for (var i = 10 - 1; i >= 0; i--) {
    //     getJobId();
    //    };
  });


});

