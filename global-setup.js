const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

export default async function globalSetup() {
    return new Promise((resolve, reject) => {
        const directory = 'allure-results';

        // Check if the folder exists
        if (fs.existsSync(directory)) {
            // Read and delete all files in the folder
            fs.readdir(directory, (err, files) => {
                if (err) reject(`Error reading directory: ${err.message}`);
                
                for (const file of files) {
                    fs.unlink(path.join(directory, file), (unlinkErr) => {
                        if (unlinkErr) reject(`Error deleting file: ${unlinkErr.message}`);
                    });
                }
                resolve('Allure results folder contents cleared.');
            });
        } else {
            resolve('Allure results folder does not exist or is already empty.');
        }
    });
}
