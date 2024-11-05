// @ts-check
const { test, expect } = require('@playwright/test');

const { getTest, postTest, putTest, patchTest, deleteTest} = require('../../helper/helper');

getTest('Demo Get Response', 'users/2', 200, {support: {
    url: 'https://reqres.in/#support-heading',
    text: 'To keep ReqRes free, contributions towards server costs are appreciated!'
  }})

  postTest('Demo Post Response', 'user', {
        name:'Steve', 
        job:'Welder'
    }, 201)

putTest('Demo Put Response', 'users/2', {
        name:"Name Update",
        job: "Job Update"}, 200)

deleteTest('Demo Delete Response', 'users/2', {}, 204)
