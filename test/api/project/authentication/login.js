// @ts-check
require('dotenv').config()
const { test, expect } = require('@playwright/test');

const { getTest, postTest, putTest, patchTest, deleteTest} = require('../../helper/helper');

// const { setToken} = require('../../helper/tokenStorage');


let token;
export function login(){
    // Perform the login to get the token
    token=55
    console.log('Token Change')
    // const loginResponse = await request.post('', {
    //     data: {
    //         username: 'your_username',
    //         password: 'your_password'
    //     }
    // });

    // if (loginResponse.ok()) {
    //     const responseBody = await loginResponse.json();
    //     token = responseBody.token; // Extract token from response
    //     setToken(token); // Store the token in tokenStorage
    //     console.log('Login successful, token obtained:', token);
    // } else {
    //     throw new Error('Login failed');
    // }

console.log('Token return')
return token}