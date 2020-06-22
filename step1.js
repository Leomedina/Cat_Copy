const fs = require('fs');

function cat() {
    fs.readFile(process.argv[2], 'utf8', (err, data) => {
        if (err) {
            console.log('ERROR:', err.message);
            process.exit(1);
        }
        console.log(data);
    });
}

cat()