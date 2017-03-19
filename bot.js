// api.get('/slack', function (req) {
// 	return request.queryString.name + ' is awesome';
//   //    if (!req.query.code) { // access denied
// 	 //    res.redirect('https://vejather.github.io/mdn-bot-landing-page/');
// 	 //    return;
// 	 //  }
//   //    var data = {form: {
//   //     client_id: process.env.SLACK_CLIENT_ID,
//   //     client_secret: process.env.SLACK_CLIENT_SECRET,
//   //     code: req.query.code
//   // }};
//   // return request.post('https://slack.com/api/oauth.access', data, function (error, response, body) {
//   //   if (!error && response.statusCode == 200) {
//   //     // You are done.
//   //     // If you want to get team info, you need to get the token here
//   //     let token = JSON.parse(body).access_token; // Auth token
//   //      request.post('https://slack.com/api/team.info', {form: {token: token}}, function (error, response, body) {
// 	 //    if (!error && response.statusCode == 200) {
// 	 //     if(JSON.parse(body).error == 'missing_scope') {
//   //           res.send('MDNBot has been added to your team!');
//   //         } else {
//   //           let team = JSON.parse(body).team.domain;
//   //           res.redirect('http://' +team+ '.slack.com');
//   //         }
// 	 //    }
// 	 //  });
//   //   }
// });
var promise = require('request-promise');
var ApiBuilder = require("claudia-api-builder");
var api = new ApiBuilder();
var AUTH_URL = 'https://slack.com/api/oauth.access';
api.get("/hello/{name}", function(request) {
    var name = request.pathParams.name;
    return "Hello World - meet " + name;
});

api.get("/slack", function(request) {
    var token = request.queryString.code;
    var client_id = "149347005137.150718347975";
    var client_secret = "3ca9e87936199c0cd06179a82b34242f";
    var data = {
    	client_secret:client_secret,
    	client_id:client_id,
    	code:token
    }
    if (!token) { // access denied
        return 'https://vejather.github.io/mdn-bot-landing-page';
    }

    return promise(setOptions(AUTH_URL, data)).then(function(data) {
        //var token = JSON.parse(data).access_token; // Auth token
        return 'auth token ' + JSON.stringify(data);
        //   request.post('https://slack.com/api/team.info', {form: {token: token}}, function (error, response, body) {
        // if (!error && response.statusCode == 200) {
        //  if(JSON.parse(body).error == 'missing_scope') {
        //        res.send('MDNBot has been added to your team!');
        //      } else {
        //        let team = JSON.parse(body).team.domain;
        //        res.redirect('http://' +team+ '.slack.com');
        //      }



    }).catch(function(err) {
        return err;
    });

});

function setOptions(url, data) {
    return {
        uri: url,
        headers: { 'User-Agent': 'Request-Promise' },
        json: true // Automatically parses the JSON string in the response 
    };
}

module.exports = api;
