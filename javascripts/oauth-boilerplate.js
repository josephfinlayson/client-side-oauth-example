$(function () {
    // Initialize OAuth with the public key. This will be something twitter gives to you when you sign up for an app
    // at http://twitter.com/apps
    OAuth.initialize('qb24rqcWu7g5eAUJ2IU6px8WkYE');

    $('#oauth-connect button').click(function (e) {
        e.preventDefault();
        {
            // we first authorise the twitter API (this was the hard bit I was telling you about
            // but we found a library to do it for us at http://oauth-io.github.io/
            OAuth.popup('twitter', function (error, success) {
                if (error) {
                    console.log(error)
                    return error
                }
                // when we succeed with the authorisation, we can access the twitter API
                // we're using the search API here, you can read about it here https://dev.twitter.com/rest/reference/get/search/tweets
                // you need to find a way of changing the 'geocode' to where the user wants to search :D
                success.get("https://api.twitter.com/1.1/search/tweets.json?q=&geocode=37.781157,-122.398720,1000mi")
                    // this happens when the call to twitter is successful
                    .then(function success(tweet) {
                        console.log(tweet)
                        // statuses are the tweets
                        tweet.statuses.forEach(function (tweet) {
                            // we log each tweet
                            console.log(tweet.text)
                        })
                    }, function error(err) {
                        console.log(err)
                    });
            });
        }

    });

});
