function cat(fileName, outFile) {
  const fs = require("fs");

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${fileName}:`);
      console.error(err.message);

      // exit the process with a non-zero status
      process.exit(1);
    }
    // Success! outputData
    outputData(data, outFile, "");
  });
}

function webCat(url, outFile) {
  const axios = require("axios");

  axios
    .get(url)
    .then(function (resp) {
      let msgNote = `PLEASE NOTE: '${url}' \n  still may not be a viable site url. The data returned above could be \n  the start of a fancier 404 error from a web services provider!`;
      outputData(resp.data, outFile, msgNote);
    })
    .catch((err) => {
      console.log(`Error encountered with url '${url}':`);
      console.error(
        `  Error: Request failed with status code ${err.response.status} - ${err.response.statusText}.`
      );
      process.exit(1);
    });
}

function outputData(data, outFile, htmlAddlMsg) {
  if (outFile) {
    const fs = require("fs");

    fs.writeFile(outFile, data, "utf8", (err, data) => {
      if (err) {
        console.log(`Error writing to ${outFile}:`);
        console.error(err.message);

        // exit the process with a non-zero status
        process.exit(1);
      }
    });
  } else {
    if (htmlAddlMsg) {
      console.log(data.slice(0, 76), "...");
      console.log(`\n${htmlAddlMsg}\n`);
    } else {
      console.log(data);
    }
  }
}

function syntaxHelp() {
  // prints help text to the console with the syntax for calling this function.

  console.log("  syntax: step3.js {--out output_file_name} input_file_OR_url ");
  console.log("  where:");
  console.log(
    "   '--out output_file_name' are optional but output_file_name is "
  );
  console.log(
    "     required when --out is specified. output_file_name is created "
  );
  console.log(
    "     or the contents the existing output_file_name are OVERWRITTEN. "
  );
  console.log(
    "   input_file_OR_url is required and is either the name of a file "
  );
  console.log("     to read or the url of a website to read.\n");
}

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   Main
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

if (process.argv.length > 2) {
  let outFile = "";
  let idx = 2;
  // do we have -- out and a filename?
  if (process.argv[2] === "--out") {
    // make sure we have 5 arguments passed in
    if (process.argv.length > 4) {
      outFile = process.argv[3];
      idx = 4;
    } else {
      console.error(
        "ERROR - two additional values are needed when using --out."
      );
      syntaxHelp();
      process.exit(1);
    }
  }

  // Evaluate the 1st / 3rd argument (idx 2 / 4) passed in.
  // Call webCat when the argument begins with http
  // Call cat in all other cases.
  if (process.argv[idx].toLowerCase().indexOf("http") > -1) {
    webCat(process.argv[idx], outFile);
  } else {
    cat(process.argv[idx], outFile);
  }
} else {
  syntaxHelp();
}
