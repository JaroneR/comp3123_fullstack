var events = require('events');
var eventEmitter = new events.EventEmitter();

var ping = function(){
    console.log("Ping!")
}

var pong = function(){
    console.log("Pong!");
}

eventEmitter
    .on('ping', ping)
    .on('pong',pong);
eventEmitter.emit('ping');
eventEmitter.emit('pong');

var callbackLoop = function(counter, callback) {

    for(var i=1; i <= counter; i++) {
        callback(i);
    }
    console.log("Game Over!");
}

var handleCounter = function (result) {
    console.log('count is ' + result+" -- ");
}

