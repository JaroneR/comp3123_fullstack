var handleCounter = function(result){
    console.log('The callback count is ' + result);
}

var callbackLoop = function(count, handleCounter){
    for(i=1; i<=count; i++){
        handleCounter(i);
    }
    console.log("Exiting callbackloop");
}

callbackLoop(5, handleCounter);
callbackLoop(2, handleCounter);
callbackLoop(7, handleCounter);