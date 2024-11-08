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
        // const formData = new URLSearchParams(uncodedData).toString();
        const formData = deliveredPayload;
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
                data: formData
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
                data: formData
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
                data: formData
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
                data: formData
            });
            }
                 break;
                 default:
                    response=await request.get(url, {headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth}`
                    }, 
                    data: formData
                });
        }
        
        expect(response.status()).toBe(expectedStatus);
        if (expectedPayload !== undefined) {
            const responseText = await response.text();
            const responseBody = responseText ? JSON.parse(responseText) : {};
            assertPayload(expectedPayload, responseBody)
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

function assertPayload(expectedPayload, actualPayload){
    for (let key in expectedPayload) {
        expect(actualPayload[key]).toBeDefined()
        if(isNested(expectedPayload[key])){
            assertPayload(expectedPayload[key], actualPayload[key])
        }else if (typeof expectedPayload[key] === 'object' && expectedPayload[key] !== null && !Array.isArray(expectedPayload[key])){
            for (let key in expectedPayload) {
                assertValue(expectedPayload[key], actualPayload[key])
            }
        }else{
            assertValue(expectedPayload[key], actualPayload[key])
        }
}}

function assertValue(expectedValue, actualValue){
    switch (expectedValue){
        case 'Assert-Defined':
            expect(actualValue).toBeDefined()
        break
        case 'Assert-Truth':
            expect(actualValue).toBeTruthy()
        break
        case 'Assert-False':
            expect(actualValue).toBeFalsy()
        break
        case 'Assert-Empty':
            expect(actualValue).toBeEmpty()
        break
        default:
            expect(actualValue).toStrictEqual(expectedValue)
    }
}