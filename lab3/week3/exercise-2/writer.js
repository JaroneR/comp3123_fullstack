//require file system module
const fs = require('fs');
//create the writable stream to create a file
const file = fs.createWriteStream('./writer.txt');

//create named function expression to write the data
var writeData = function(){
    for(let i=0; i<=10; i++){
        file.write('this is some write line text\n');
    }
    file.end();
}
//export the writeData function to be used elsewhere
module.exports = {
    writeData: writeData
}