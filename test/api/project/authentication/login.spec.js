const { test } = require('@playwright/test');
const { setToken } = require('../../api/helper/tokenStorage');

let token;

test.beforeAll(async ({ request }) => {
    // Perform the login to get the token
    const loginResponse = await request.post('', {
        data: {
            username: 'your_username',
            password: 'your_password'
        }
    });

    if (loginResponse.ok()) {
        const responseBody = await loginResponse.json();
        token = responseBody.token; // Extract token from response
        setToken(token); // Store the token in tokenStorage
        console.log('Login successful, token obtained:', token);
    } else {
        throw new Error('Login failed');
    }
});
