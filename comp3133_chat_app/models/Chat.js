const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    nick: { type:String },
    msg: {type:String },
    room: { type:String },
    created: { type:Date, default:Date }
});

module.exports = mongoose.model('Messages', chatSchema);