const fs = require('fs');
const arg  = process.argv[2]

// console.log(arg)

fs.readFile(arg, 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        process.kill(1)
    }
    console.log(data);
});