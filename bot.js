var promise = require('request-promise');
var ApiBuilder = require("claudia-api-builder");
var api = new ApiBuilder();

api.get("/hello/{name}", function(request) {
    var name = request.pathParams.name;
    return "Hello World - meet " + name;
});

api.get("/slack", function(request) {
            var token = request.queryString.code;
            var client_id = "149347005137.156085577376";
            var client_secret = "c0960085e4c495bcd4f98aa33eae9063";
            var data = {
                client_id: client_id,
                client_secret: client_secret,
                code: token
            };
            if (!token) { // access denied
                return 'https://vejather.github.io/mdn-bot-landing-page';
            }
            var AUTH_URL = 'https://slack.com/api/oauth.access?client_id=' + client_id + '&client_secret=' + client_secret + '&code=' + token;

            return promise(setOptions(AUTH_URL)).then(function(data) {
               var TEAM_URL = 'https://slack.com/api/team.info?token=' + data.access_token;
                return "MDNBot has been added to your team";

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
