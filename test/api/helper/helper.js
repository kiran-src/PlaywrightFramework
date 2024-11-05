// @ts-check
const { test, expect } = require('@playwright/test');
const { getToken } = require('./tokenStorage');
const fs = require('fs'); // Import the fs module
const token=1
export async function getTest(description, url, expectedStatus, expectedPayload){
    apiTest(description, url, {}, 'get', expectedStatus, expectedPayload)
}

export async function postTest(description, url, deliveredPayload, expectedStatus, expectedPayload){
        apiTest(description, url, deliveredPayload, 'post', expectedStatus, expectedPayload)
}

export async function putTest(description, url, deliveredPayload, expectedStatus, expectedPayload){
        apiTest(description, url, deliveredPayload, 'put', expectedStatus, expectedPayload)
}

export async function patchTest(description, url, deliveredPayload, expectedStatus, expectedPayload){
        apiTest(description, url, deliveredPayload, 'patch', expectedStatus, expectedPayload)
}

export async function deleteTest(description, url, deliveredPayload, expectedStatus, expectedPayload){
        apiTest(description, url, deliveredPayload, 'delete', expectedStatus, expectedPayload)
}

function apiTest(description, url, deliveredPayload, apiType, expectedStatus, expectedPayload) {
    test(description, async ({ request }) => {
        var response = null
        switch (apiType){
            case 'get':
                response=await request.get(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }});
                break;
            case 'post':
                if(deliveredPayload.length === 0){
                response=await request.post(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }});
            } else{
                response=await request.post(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }, 
                data: deliveredPayload
            });
            }
                break;
            case 'put':
                if(deliveredPayload.length === 0){
                response=await request.put(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }});
            } else{
                response=await request.put(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }, 
                data: deliveredPayload
            });
            }
                break;
            case 'patch':
                if(deliveredPayload.length === 0){
                response=await request.patch(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }});
            } else{
                response=await request.patch(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }, 
                data: deliveredPayload
            });
            }
                break;
            case 'delete':
                if(deliveredPayload.length === 0){
                response=await request.delete(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }});
            } else{
                response=await request.delete(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }, 
                data: deliveredPayload
            });
            }
                 break;
        }
        
        expect(response.status()).toBe(expectedStatus);
        if (expectedPayload !== undefined) {
            const responseText = await response.text();
            const responseBody = responseText ? JSON.parse(responseText) : {};
            assertValue(expectedPayload, responseBody)
    }});
}

function isNested(obj) {
    // Check if the input is an object and not null
    if (typeof obj === 'object' && obj !== null) {
        // Loop through the keys of the object
        for (const key in obj) {
            // Check if the value of the key is an object
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                return true; // Found a nested object
            }
        }
    }
    return false; // No nested objects found
}

function assertValue(expectedPayload, actualPayload){
    for (let key in expectedPayload) {
        // console.log('key')
        // console.log(key)
        // console.log('act')
        // console.log(actualPayload[key])
        // console.log('exp')
        // console.log(expectedPayload[key])
        // console.log('nest')
        // console.log(isNested(expectedPayload[key]))
        expect(actualPayload[key]).toBeDefined()
        if(isNested(expectedPayload[key])){
            assertValue(expectedPayload[key], actualPayload[key])
        }else if (typeof expectedPayload[key] === 'object' && expectedPayload[key] !== null && !Array.isArray(expectedPayload[key])){
            for (let key in expectedPayload) {
                expect(expectedPayload[key]).toStrictEqual(actualPayload[key])
            }
        }else{
            expect(expectedPayload[key]).toStrictEqual(actualPayload[key])
        }
}}