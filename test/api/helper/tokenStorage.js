// tokenStorage.js
const fs = require('fs');
const path = require('path');

// function setToken(newToken) {
//     const tokenPath = path.join(__dirname, 'auth_token');
        
//         // Write the token to the file
//         fs.writeFileSync(tokenPath, newToken, 'utf8');
//         console.log('Token saved to auth_token file');
// }

// function getToken() {
//     const tokenPath = path.join(__dirname, 'auth_token');
        
//         // Check if the token file exists
//         if (fs.existsSync(tokenPath)) {
//             // Read the token from the file
//             token = fs.readFileSync(tokenPath, 'utf8');
//             console.log("Token read from auth_token file:", token);
//             return token
//         } else {
//             throw new Error("Token file not found. Ensure login test has run and saved the token.");
//         }
// }

// module.exports = { setToken, getToken };
