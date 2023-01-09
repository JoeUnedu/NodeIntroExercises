function cat(fileName) {

    const fs = require('fs');

    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${fileName}:`);
            console.error(err);

            // exit the process with a non-zero status
            process.exit(1);
        }
        // otherwise success
        console.log(data);
    });

}

cat(process.argv[2])