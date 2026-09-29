import { test, expect } from '@playwright/test';

test('Login and add product to cart', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');

    await page.locator('#password').fill('secret_sauce');

    await page.locator('#login-button').click();

    await expect(page.locator('.title')).toHaveText('Products');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await page.locator('.shopping_cart_link').click();

    await expect(page.locator('.inventory_item_name'))
        .toHaveText('Sauce Labs Backpack');
});