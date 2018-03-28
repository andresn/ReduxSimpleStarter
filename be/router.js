const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireSignin = passport.authenticate(
    'local',
    {
        session: false
    }
);

const requireAuth = passport.authenticate(
    'jwt',
    {
        session: false // otherwise, by default passport tries to make this a cookie based auth
    }
);

// here we have access to our Express app, which provides the brains to our entire application
module.exports = function(app) {
    /*
        req: request, our incoming http request
        res: response, that we're going to form us and send back
        next: is for error handling

    app.get('/', function(req, res, next) { // our router handler, use app.get vs. app.post etc.
        res.send(['waterbottle', 'phone', 'paper']);
    });
    */

    app.post(
        '/signup',
        Authentication.signup
    );

    app.post(
        '/signin',
        requireSignin,
        Authentication.signin
    );

    app.get(
        '/',
        requireAuth,
        function(req, res, next) {
            res.send({ message: 'This is my private feature' });
        }
    );

};
