const fs = require('fs');
const process = require('process')
const axios = require('axios');
const argv = process.argv;

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('ERROR:', err.message);
            process.exit(1);
        }
        console.log(data);
    });
}

async function webCat(path) {
    try {
        const response = await axios.get(path);
        console.log(response.data);
    } catch (error) {
        console.log(`Error fetching: ${path}`)
        console.log(`${error}`);
        process.exit(1);
    }
}

function main(path) {
    if (path.slice(0, 4).toLowerCase() === "http") {
        webCat(path)
    } else {
        cat(path)
    }
}

main(argv[2]);