const {test, expect} = require ('@playwright/test')
test("Base URL hd", async({request})=>{
console.log("*******************************")
console.log(process.env.BASE_URL)
console.log("*******************************")
})
test("Fetch and Validate Response Header", async({request})=>{
    request.get("")
    expect().toBe()
})