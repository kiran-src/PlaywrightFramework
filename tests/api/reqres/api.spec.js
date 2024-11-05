// @ts-check
const { test, expect } = require('@playwright/test');

test('Response Status', async ({ request }) => {
  const response = await request.get("users/2")
  expect(response.status()).toBe(200)
});

test('Invalid Endpoint', async ({ request }) => {
    const response = await request.get("users/dfgfsdtgesrtgsgsd")
    expect(response.status()).toBe(404)
});

test('Parse Response', async({request})=>{
    const response = await request.get("users/2")
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.data.id).toBe(2)
    expect(responseBody.data.email).toBeTruthy()
    expect(responseBody.data.first_name).toContain("Janet")
    console.log(responseBody.data.first_name)
});

test('POST Request', async({request})=>{
    const response = await request.post("user",{
        data:{
            name:"Steve",
            job:"assassin"
}})
        const responseBody=JSON.parse(await response.text())
        console.log(responseBody)
        expect(responseBody.createdAt).toBeTruthy()
        expect (response.status()).toBe(201)
})

test("POST Login test", async({request})=>{
    const response = await request.post("login", {
        data:{
            email:"eve.holt@reqres.in",
            password:"cityslicka"
        }
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.token).toBeTruthy()
})

test("POST Login test fail", async({request})=>{
    const response = await request.post("login", {
        data:{
            email:"eve.hoalt@reqres.in",
            password:"cityslicka"
        }
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(400)
    expect(responseBody.error).toBeTruthy()
})

test("PUT Update User", async({request})=>{
    const response = await request.put("users/2",{
        data: {
            name:"Name Update",
            job: "Job Update"
        }
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.updatedAt).toBeTruthy()
})

test("DELETE", async({request})=>{
    const response = request.delete("users/2")
    expect((await response).status()).toBe(204)
})