
import { test, expect } from '@playwright/test';

import users from '../test-data/users.json';

import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';

test.describe('SauceDemo - Products Module', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();

        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );

        await expect(page).toHaveURL(/inventory\.html/);
    });

    // SD-PROD-001
    test('SD-PROD-001 - Verify products page @smoke @regression', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await expect(productsPage.pageTitle).toHaveText('Products');
        await expect(productsPage.inventoryItems).not.toHaveCount(0);
    });

    // SD-PROD-002
    test('SD-PROD-002 - Verify product names @regression', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await expect(productsPage.inventoryItems).not.toHaveCount(0);

        const productNames = await productsPage.getProductNames();

        console.log('Product names:', productNames);

        expect(productNames.length).toBeGreaterThan(0);
        expect(productNames).toContain('Sauce Labs Backpack');
    });

    // SD-PROD-003
    test('SD-PROD-003 - Verify product prices @regression', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await expect(productsPage.inventoryItems).not.toHaveCount(0);

        const prices = await productsPage.getProductPrices();

        console.log('Prices found:', prices.length);
        console.log('Price values:', prices);

        expect(prices.length).toBeGreaterThan(0);
        expect(prices).toContain('$29.99');
    });

    // SD-PROD-004
    test('SD-PROD-004 - Verify product count @regression', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await expect(productsPage.inventoryItems).not.toHaveCount(0);

        const productCount = await productsPage.getProductCount();

        expect(productCount).toBe(6);
    });

    // SD-PROD-005
    test('SD-PROD-005 - Add product to cart @smoke @regression', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await productsPage.addProduct('Sauce Labs Backpack');

        await expect(productsPage.cartBadge).toHaveText('1');
    });

    // SD-PROD-006
    test('SD-PROD-006 - Remove product from cart @regression', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await productsPage.addProduct('Sauce Labs Backpack');
        await productsPage.removeProduct('Sauce Labs Backpack');

        await expect(productsPage.cartBadge).toHaveCount(0);
    });

    // SD-PROD-007
    test('SD-PROD-007 - Sort products by price low to high @regression', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await productsPage.sortProducts('lohi');

        const prices = await productsPage.getProductPrices();

        const numericPrices = prices.map(price =>
            Number(price.replace('$', ''))
        );

        expect(numericPrices.length).toBeGreaterThan(0);
        expect(numericPrices).toEqual(
            [...numericPrices].sort((a, b) => a - b)
        );
    });

    // SD-PROD-008
    test('SD-PROD-008 - Open shopping cart @smoke @regression', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await productsPage.addProduct('Sauce Labs Backpack');
        await productsPage.openCart();

        await expect(page).toHaveURL(/cart\.html/);
        await expect(
            page.locator('.cart_item')
        ).toContainText('Sauce Labs Backpack');
    });

});
