import { chromium } from "@playwright/test";
const fs = require('fs');
const path = require('path');

export default async function globalSetup() {
    // Set authorization token for the environment
    process.env.AUTH_TOKEN = '55';

    return new Promise((resolve, reject) => {
        const allureDirectory = 'allure-results';
        const payloadFilePath = './test/api/helper/payload_data'; // Changed to payload_data

        // Check if the allure-results folder exists and clean up its contents
        if (fs.existsSync(allureDirectory)) {
            fs.readdir(allureDirectory, (err, files) => {
                if (err) reject(`Error reading directory: ${err.message}`);
                
                for (const file of files) {
                    fs.unlink(path.join(allureDirectory, file), (unlinkErr) => {
                        if (unlinkErr) reject(`Error deleting file: ${unlinkErr.message}`);
                    });
                }
                console.log('Allure results folder contents cleared.');
            });
        } else {
            console.log('Allure results folder does not exist or is already empty.');
        }

        // Check if the payload_data file exists and delete it
        if (fs.existsSync(payloadFilePath)) {
            fs.unlink(payloadFilePath, (err) => {
                if (err) reject(`Error deleting payload_data: ${err.message}`);
                else console.log('payload_data file deleted.');
            });
        } else {
            console.log('payload_data does not exist.');
        }

        resolve('Global setup completed.');
    });
}
