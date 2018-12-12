const fs = require('fs');

const stream = fs.createReadStream("data.txt");
const file = fs.createWriteStream('./output.txt');
stream.on("data", function(data){
    console.log(data.toString());
    file.write(data);
    file.end();
    console.log('write is completed!');
});


