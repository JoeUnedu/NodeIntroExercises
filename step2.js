function cat(fileName) {
  const fs = require("fs");

  fs.readFile(fileName, "utf8", (err, data) => {
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

function webCat(url) {
  const axios = require("axios");

  axios
    .get(url)
    .then(function (resp) {
      console.log(resp.data.slice(0, 76), "...");
      console.log(
        `PLEASE NOTE: '${url}' \n  still may not be a viable site url. The data returned above could be \n  the start of a fancier 404 error from your web services provider!`
      );
    })
    .catch((err) => {
      console.log(`Error encountered with url '${url}':`);
      console.error(
        `  Error: Request failed with status code ${err.response.status} - ${err.response.statusText}.`
      );
      process.exit(1);
    });
}

// Evaluate the 1st argument passed in.

if (process.argv[2].toLowerCase().indexOf("http") > -1) {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}
