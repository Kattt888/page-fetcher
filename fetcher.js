const needle = require('needle');//setting up needle and fs to access future url and file path inputs
const fs = require('fs');

const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];

if (!url || !filePath) {
  console.log("Please provide both a URL and a file path.");
  process.exit();
}

needle.get(url, (error, response) => {//using needle to retrieve the url, and a callback ti handle possible errors and associated responses to errors
  if (error) {
    console.error(`Failed to download resource: ${error.message}`);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(`Failed to download resource: HTTP Status ${response.statusCode}`);
    return;
  }

  const data = response.body;
  
  fs.writeFile(filePath, data, (err) => {//logging an error if the data failed to write
    if (err) {
      console.error(`Failed to write to file: ${err.message}`);
      return;
    }
 
    console.log(`Downloaded and saved ${data.length} bytes to ${filePath}`);
  });
});


