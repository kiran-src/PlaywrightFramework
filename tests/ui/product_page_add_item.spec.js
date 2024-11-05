import {test, expect} from "@playwright/test"

test.skip("Product page Add to Basket", async ({ page }) => {
    await page.goto('/');
    // await page.pause()

    const addToBasket = page.locator('[data-qa="product-button"]').first()
    const basket = page.locator('[data-qa="header-basket-count"]')
    const checkout = page.getByRole('link', { name: 'Checkout' })
    await addToBasket.waitFor()
    await basket.waitFor()
    await expect(addToBasket).toHaveText("Add to Basket")
    await expect(basket).toHaveText("0")
    await addToBasket.click()
    await expect(addToBasket).toHaveText("Remove from Basket")
    await expect(basket).toHaveText("1")
    await checkout.waitFor()
    await checkout.click()
    await page.waitForURL("/basket")
    // await page.pause()
})



const addTwoNumbers = (a,b) => {
    console.log("Adding two numbers")
    return a+b
}