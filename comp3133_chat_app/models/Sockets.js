const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sockioSchema = new Schema({
    socket_id: { type:String },
    connectTime: { type:Date, default:Date },
    createdBy: { type:String },
    disconnectTime: { type:Date, default:null },
});

module.exports = mongoose.model("Sockets", sockioSchema);