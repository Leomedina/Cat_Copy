const fs = require('fs');
const process = require('process')
const axios = require('axios');
const argv = process.argv;

function cat(path, out) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('ERROR:', err.message);
            process.exit(1);
        }
        if (out !== null) {
            writeToFile(data, out)
        } else {
            console.log(data);
        }
    });
}

function writeToFile(data, out) {
    fs.writeFile(out, data, 'utf8', (err) =>{
        if (err){
            console.log(`Error: ${err}`)
            process.exit()
        } 
    })
}

async function webCat(path, out) {
    try {
        const response = await axios.get(path);
        if (out !== null) {
            writeToFile(response.data, out)
        } else {
            console.log(response.data);
        }
    } catch (error) {
        console.log(`Error fetching: ${path}`)
        console.log(`${error}`);
        process.exit(1);
    }
}

function mainChecker(path, out) {
    if (path.slice(0, 4).toLowerCase() === "http") {
        webCat(path, out)
    } else {
        cat(path, out)
    }
}

function init(argv) {
    if (argv[2] === "--out") {
        mainChecker(argv[4], argv[3])
    } else {
        mainChecker(argv[2], null)
    }
}

init(argv);