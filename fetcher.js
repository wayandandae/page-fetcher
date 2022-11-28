const fs = require('fs');
const request = require('request');

const urlToCopy = process.argv[2];
const pathToPaste = process.argv[3];

request(urlToCopy, (error, response, body) => {
  if (error) {
    console.error(error);
  }

  fs.writeFile(pathToPaste, body, 'utf-8', error => {
    if (error) {
      console.error(error);
    }
  });

  console.log(`Downloaded and saved ${body.length} bytes to ${pathToPaste}`);
});