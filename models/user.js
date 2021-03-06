var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	}
});

var User = module.exports = mongoose.model("User", UserSchema)

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback) ;
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	console.log("username is " + username)
	var query = {username : username}

	User.findOne(query, callback)
}

module.exports.getUserById = function(id, callback){
	var query = {_id : id}
	User.findById(query, callback)
}

module.exports.comparePassword = function(candidatepassword, hash, callback){
	bcrypt.compare(candidatepassword, hash, function(err, isMatch) {
		if(err){
			throw err;
		}
		callback(null, isMatch)
	});
}