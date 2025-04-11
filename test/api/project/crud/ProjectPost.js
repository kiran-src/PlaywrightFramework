// @ts-check

const { test } = require('@playwright/test');
const { getTest, postTest, putTest, patchTest, deleteTest} = require('../../helper/helper');
const { getData } = require('../../helper/payloadData');
const { login} = require('../authentication/login');
test.describe('Test Suite', ()=>{
    test.describe.configure({ mode: 'serial' });
const auth=process.env.AUTH_TOKEN

getTest('Demo Get Response', auth, 'users/2', 200, {support: {
    url: 'https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral',
    text: 'Tired of writing endless social media content? Let Content Caddy generate it for you.'
  }})
  console.log("Data: ", getData())

postTest('Demo Post Response', auth, 'user', {
        name:'Steve', 
        job:'Welder'
    }, 201)

putTest('Demo Put Response', auth, 'users/2', {
        name:"Name Update",
        job: "Job Update"}, 200)

deleteTest('Demo Delete Response', auth, 'users/2', {}, 204)
    
})
