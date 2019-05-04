const jwt = require('jwt-simple');
const User = require('../models/user');

// TODO -- extract config into env vars dotenv npm package!
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode(
        { // data we want to encode
            // sub = subject, who is the token about? who does this token belong to?
            // we're saying the subject of this token is this very specific user
            sub: user.id, // don't use email, otherwise if user change email you're screwed!
            // Issued At Time
            iat: timestamp
        },
        config.secret
    );
}

module.exports.signin = function(
    req,
    res,
    next
) {
    // User has already had their email and password auth'd
    // We just need to give them a token
    res.send(
        {
            token: tokenForUser(req.user)
        }
    );
};

module.exports.signup = function(
    req,
    res,
    next
) {
    // res.send({ success: 'true' });
    // console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send(
            {
                error: 'You must provide email and password'
            }
        );
    }

    // See if a user with the given email exists
    User.findOne(
        {
            email: email
        },
        function(err, existingUser) { // existingUser = null if user does not exist
            if (err) {
                return next(err);
            }

            // If a user with email does exist, return an error
            if (existingUser) {
                // unprocessible entity: you gave us bad data/an email that already exists
                return res.status(422).send(
                    {
                        error: 'Email is in use'
                    }
                );
            }

            // If a user with email does NOT exist, create and save user record
            const user = new User(
                {
                    email: email,
                    password: password
                }
            );

            user.save(
                function(err) {
                    if (err) {
                        return next(err);
                    }
                    /*
                    // Respond to request indicating the user was created
                    res.json(
                        {
                            success: true
                        }
                    );
                    */
                    // Respond to request by issuing JWT token
                    res.json(
                        {
                            token: tokenForUser(user)
                        }
                    );
                }
            );

        }
    );

};
