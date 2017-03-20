var promise = require('request-promise');
var ApiBuilder = require("claudia-api-builder");
var api = new ApiBuilder();
var credentials = require('./environment');

api.get("/hello/{name}", function(request) {
    var name = request.pathParams.name;
    return "Hello World - meet " + name;
});

api.get("/slack", function(request,response) {
            var token = request.queryString.code;
            if (!token) { // access denied
                return 'https://vejather.github.io/mdn-bot-landing-page';
            }
            var AUTH_URL = 'https://slack.com/api/oauth.access?scope=commands+team%3Aread&client_id=' + credentials.client_id + '&client_secret=' + credentials.client_secret + '&code=' + token;

            return promise(setOptions(AUTH_URL)).then(function(data) {
               var TEAM_URL = 'https://slack.com/api/team.info?token=' + data.access_token;
                //return "MDNBot has been added to your team";
                return promise(setOptions('https://slack.com/api/team.info?token='+data.access_token)).then(function (data) { 
                      //return "team info"+JSON.stringify(data);
                        if(data.error == 'missing_scope') {
                             return 'MDNBot has been added to your team!';
                           } else {
                             var team = data.team.domain;
                             return 'http://' +team+ '.slack.com';
                           }



                    });
            });
        });

        function setOptions(url) {
            return {
                uri: url,
                headers: { 'User-Agent': 'Request-Promise' },
                json: true // Automatically parses the JSON string in the response 
            };
        }

        module.exports = api;
