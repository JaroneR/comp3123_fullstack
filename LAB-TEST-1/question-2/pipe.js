const fs = require('fs');

const stream = fs.createReadStream("output.txt");

stream.pipe(fs.createWriteStream("output.txt.gz"));