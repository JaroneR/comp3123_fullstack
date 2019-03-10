const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type:String, default: "username" },
    password: { type:String, default: "password" } ,
    creationDate: { type:Date, default:Date }
});

module.exports = mongoose.model("User", userSchema);