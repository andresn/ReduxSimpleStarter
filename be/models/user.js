const mongoose = require('mongoose');
const Schema = mongoose.Schema; // what we use to tell Mongoose about the very particular fields that our model is going to have.

const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
    email: {
        type: String, // literally, a JavaScript string, make sure to always tolowercase!
        unique: true,
        lowercase: true // make sure to always tolowercase to avoid stephen@gmail.com vs. STEPHEN@GMAIL.COM!
    },
    password: String
});

// on Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
    const user = this;

    // generate a salt, then run callback
    bcrypt.genSalt(
        10,
        function(err, salt) {
            if (err) {
                return next(err);
            }
            // hash (encrypt) our password using the salt
            bcrypt.hash(
                user.password,
                salt,
                null,
                function(err, hash) {
                    if (err) {
                        return next(err);
                    }
                    // overwrite plain text password with encrypted password
                    user.password = hash;
                    next();
                }
            );
        }
    );

});

userSchema.methods.comparePassword = function( // wrap any methods we defined by the user class
    candidatePassword,
    callback
) {
    // bcrypt encrypts and compares the user submitted password by deriving the salt from the db
    // stored hashed password.
    bcrypt.compare(
        candidatePassword,
        this.password,
        function(err, isMatch) {
            if (err) {
                return callback(err);
            }
            callback(null, isMatch);
        }
    );
};

// Create the model class
const User = mongoose.model('user', userSchema); // there's a new schema; and it corresponds to a new user

// Export the model
module.exports = User;
