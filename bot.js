var ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder();
module.exports = api;

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

api.get('/greet', function (request) {
    return request.queryString.name + ' is awesome';
});