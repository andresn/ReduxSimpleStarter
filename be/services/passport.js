const passport = require('passport');
const User = require('../models/user');

// TODO -- extract config into env vars dotenv npm package!
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localLogin = new LocalStrategy(
    {
        usernameField: 'email' // looks for the email property in the body of the request
        // no need for telling it to look at password property because it pressumes this?
    },
    function(
        email,
        password,
        done
    ){
        // Verify this email and password, call done returning user if it is the correct user name
        // and password. Otherwise, call done with false.
        User.findOne(
            {
                email: email
            },
            function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }

                // compare passwords - is `password` equal to user.password?
                user.comparePassword(
                    password,
                    function(
                        err,
                        isMatch
                    ) {
                        if (err) {
                            return done(err);
                        }
                        if (!isMatch) {
                            return done(null, false);
                        }

                        return done(null, user);
                    }
                );
            }
        )
    }
);

// Setup options for JWT Strategy
const jwtOptions = {
    // we need to tell JwtStrategy from where to extract jwt token from header.authorization
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    'secretOrKey': config.secret // allows Jwt to decode the token
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(
    jwtOptions,
     // called whenever a user logins with jwt, i.e. whenever we need to auth a user using a jwt
     // token
    function(
        payload, // decoded jwt token, i.e., the user's id and timestamp
        done
    ) {
        // See if the user ID in the payload exists in our database

        // If it does, call 'done' with that user

        // Otherwise, call done without a user object

        User.findById(
            payload.sub,
            function(
                err, // populated only if the search fails
                user
            ) {
                if (err) {
                    return done(
                        err,
                         // the user object if we found one, in this case false meaning we didn't
                         // find a user, i.e., this person isn't authenticated
                        false
                    );
                }

                if (user) { // if we found a user, call done...                    
                    done(
                        null, // without an error...
                        user // and that user....
                    );
                } else { // otherwise, if we did not find a user...
                    done(
                        null, // there was not an error...
                        false // and we did not find a user.
                    );
                }
            }
        );
    }
);

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
