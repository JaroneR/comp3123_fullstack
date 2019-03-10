const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    type: String,
    name:{ type:String, default:null },
    socket: { type:String },
    room: { type:String },
    connect: { type:Date, default:Date },
    disconnect: { type:Date, default:null }
});

module.exports = mongoose.model('EventLog', eventSchema);