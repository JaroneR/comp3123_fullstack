//require built-in file system module
var fs = require('fs');

//create readable stream to read in the file
var stream = fs.createReadStream("data.txt");

//subscribe to 'data' emmitter in readable stream
stream.on("data", function(data){
   
    console.log(data.toString());
    
})