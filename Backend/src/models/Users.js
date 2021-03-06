const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
    name:{type: String, required:true},
    lastName:{type: String},
    email:{type: String, required:true},
    secretPass: {type: String, required:true}
});

exports.users = model('users',usersSchema);