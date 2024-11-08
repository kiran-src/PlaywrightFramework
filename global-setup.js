import {chromium} from "@playwright/test"
const fs = require('fs');
const path = require('path');

export default async function globalSetup() {
    //Login
        process.env.AUTH_TOKEN='55'
        //Save session state cookie
        const browser = await chromium.launch({headless: false})
        const context = await browser.newContext()
        const page = await context.newPage()
        //Navigation
        await page.context().storageState({path:"./LoginAuth.json"})

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
