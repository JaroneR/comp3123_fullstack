var events = require('events');

var eventEmitter = new events.EventEmitter();
var EventHandler = function() {
    console.log('Alarm has been triggered!');
}
var EventHandler2 = function() {
    console.log('Call 911!');
}
eventEmitter
.on('call', EventHandler)
.on('call2', EventHandler2);
eventEmitter.emit('call');
eventEmitter.emit('call2');
