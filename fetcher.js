// imports
const fs = require('fs');
const request = require('request');
const readline = require('readline');

// readline interface object
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// first and second arguments of command line are used as origin and destination respectively
const urlToCopy = process.argv[2];
const pathToPaste = process.argv[3];

const write = (destination, content) => {
  // fs write content to destination
  fs.writeFile(destination, content, error => {
    // print the error if one occurred
    if (error) {
      console.log('write error:', error);
    } else {
      // print detailed message when the download is complete
      console.log(`Downloaded and saved ${content.length} bytes to ${destination}`);
    }
  });
};

const pasteFromURL = (origin, destination, callback) => {
  // request for contents from origin
  request(origin, (error, response, body) => {
    // if it encounters an error,
    if (error) {
      // print error message and status code
      console.log('server error:', error);
      console.log('status code:', response && response.statusCode);
    } else {
      // otherwise, call callback function using data fetched from request
      callback(destination, body);
    }
  });
};

// if file doesn't exist at the destination directory,
if (!fs.existsSync(pathToPaste)) {
  pasteFromURL(urlToCopy, pathToPaste, write);
  // if it already exists,
} else {
  // ask whether to perform writeFile or not
  rl.question("File already exists. Enter Y to overwrite. ", answer => {
    // if user input is strictly Y,
    if (answer === "Y") {
      pasteFromURL(urlToCopy, pathToPaste, write);
    } else {
      rl.output.write("Filewrite failed.\n");
    }
    // terminate the readline interface
    rl.close();
  });
}