// @ts-check
const { test, expect } = require('@playwright/test');
// const { getToken } = require('./tokenStorage');
export async function getTest(description, auth, url, expectedStatus, expectedPayload){
    apiTest(description, auth, url, {}, 'get', expectedStatus, expectedPayload)
}

export async function postTest(description, auth, url, deliveredPayload, expectedStatus, expectedPayload){
        apiTest(description, auth, url, deliveredPayload, 'post', expectedStatus, expectedPayload)
}

export async function putTest(description, auth, url, deliveredPayload, expectedStatus, expectedPayload){
        apiTest(description, auth, url, deliveredPayload, 'put', expectedStatus, expectedPayload)
}

export async function patchTest(description, auth, url, deliveredPayload, expectedStatus, expectedPayload){
        apiTest(description, auth, url, deliveredPayload, 'patch', expectedStatus, expectedPayload)
}

export async function deleteTest(description, auth, url, deliveredPayload, expectedStatus, expectedPayload){
        apiTest(description, auth, url, deliveredPayload, 'delete', expectedStatus, expectedPayload)
}

function apiTest(description, auth, url, deliveredPayload, apiType, expectedStatus, expectedPayload) {
    test(description, async ({ request }) => {
        var response = null
        console.log('token')
        console.log(auth)
        const uncodedData={data:deliveredPayload}
    const formData = new URLSearchParams(uncodedData).toString();
        switch (apiType){
            case 'get':
                response=await request.get(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth}`
                }});
                break;
            case 'post':
                if(deliveredPayload.length === 0){
                response=await request.post(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth}`
                }});
            } else{
                response=await request.post(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth}`
                }, 
                data: deliveredPayload
            });
            }
                break;
            case 'put':
                if(deliveredPayload.length === 0){
                response=await request.put(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth}`
                }});
            } else{
                response=await request.put(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth}`
                }, 
                data: deliveredPayload
            });
            }
                break;
            case 'patch':
                if(deliveredPayload.length === 0){
                response=await request.patch(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth}`
                }});
            } else{
                response=await request.patch(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth}`
                }, 
                data: deliveredPayload
            });
            }
                break;
            case 'delete':
                if(deliveredPayload.length === 0){
                response=await request.delete(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth}`
                }});
            } else{
                response=await request.delete(url, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth}`
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
            return responseBody
    }
else{
    return {}
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