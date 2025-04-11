// tokenStorage.js
const fs = require('fs');
const path = require('path');

function setData(newData) {
    const filePath = path.join(__dirname, 'payload_data');
        
        // Write the data to the file
        fs.writeFileSync(filePath, newData, 'utf8');
}

function getData() {
    const dataPath = path.join(__dirname, 'payload_data');
        
        // Check if the data file exists
        if (fs.existsSync(dataPath)) {
            // Read the data from the file
            var data = fs.readFileSync(dataPath, 'utf8');
            return data ? JSON.parse(data) : {};
        } else {
            throw new Error("Data file not found. Ensure login test has run and saved the token.");
        }
}

module.exports = { setData, getData };
