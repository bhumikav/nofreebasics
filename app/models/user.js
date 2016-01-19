var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var md5      = require('md5');
// define the schema for our user model
var userSchema = mongoose.Schema({
    local: {
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        profileData: {
            fullname:{ type: String, required: true},
            imageURL: {type: String}
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
userSchema.methods.generateHashMD5 = function(email) {
    return md5(email);
}
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);