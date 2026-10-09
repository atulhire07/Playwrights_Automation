
import { test, expect } from '@playwright/test';

import users from '../test-data/users.json';

import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';

test.describe('SauceDemo - Checkout Module', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();

        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );

        const productsPage = new ProductsPage(page);

        await productsPage.addProduct('Sauce Labs Backpack');
        await productsPage.openCart();

        const cartPage = new CartPage(page);

        await cartPage.checkout();
    });

    // SD-CHECK-001
    test('SD-CHECK-001 - Valid checkout @smoke @regression', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.enterCustomerDetails('Atul', 'Hire', '411001');
        await checkoutPage.continue();

        await expect(page).toHaveURL(/checkout-step-two\.html/);
        await expect(checkoutPage.pageTitle).toHaveText('Checkout: Overview');
    });

    // SD-CHECK-002
    test('SD-CHECK-002 - First name mandatory @regression', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.enterCustomerDetails('', 'Hire', '411001');
        await checkoutPage.continue();

        await expect(checkoutPage.errorMessage)
            .toContainText('First Name is required');
    });

    // SD-CHECK-003
    test('SD-CHECK-003 - Last name mandatory @regression', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.enterCustomerDetails('Atul', '', '411001');
        await checkoutPage.continue();

        await expect(checkoutPage.errorMessage)
            .toContainText('Last Name is required');
    });

    // SD-CHECK-004
    test('SD-CHECK-004 - Postal code mandatory @regression', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.enterCustomerDetails('Atul', 'Hire', '');
        await checkoutPage.continue();

        await expect(checkoutPage.errorMessage)
            .toContainText('Postal Code is required');
    });

    // SD-CHECK-005
    test('SD-CHECK-005 - Verify checkout overview @regression', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.enterCustomerDetails('Atul', 'Hire', '411001');
        await checkoutPage.continue();

        await expect(checkoutPage.pageTitle)
            .toHaveText('Checkout: Overview');

        await expect(checkoutPage.summaryItems)
            .toContainText('Sauce Labs Backpack');
    });

    // SD-CHECK-006
    test('SD-CHECK-006 - Verify total amount @regression', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.enterCustomerDetails('Atul', 'Hire', '411001');
        await checkoutPage.continue();

        await expect(page).toHaveURL(/checkout-step-two\.html/);

        await expect(checkoutPage.pageTitle)
            .toHaveText('Checkout: Overview');

        await expect(checkoutPage.summaryItems)
            .toContainText('Sauce Labs Backpack');

        const subtotalLocator = page.locator('.summary_subtotal_label');
        const taxLocator = page.locator('.summary_tax_label');
        const totalLocator = page.locator('.summary_total_label');

        await expect(subtotalLocator)
            .toHaveText('Item total: $29.99');

        await expect(taxLocator).toBeVisible();
        await expect(totalLocator).toBeVisible();

        const subtotalText = await subtotalLocator.innerText();
        const taxText = await taxLocator.innerText();
        const totalText = await totalLocator.innerText();

        const subtotal = Number(subtotalText.replace(/[^\d.]/g, ''));
        const tax = Number(taxText.replace(/[^\d.]/g, ''));
        const total = Number(totalText.replace(/[^\d.]/g, ''));

        expect(Number((subtotal + tax).toFixed(2))).toBe(total);
    });

    // SD-CHECK-007
    test('SD-CHECK-007 - Complete order @smoke @regression', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.enterCustomerDetails('Atul', 'Hire', '411001');
        await checkoutPage.continue();
        await checkoutPage.finish();

        await expect(checkoutPage.completeMessage)
            .toHaveText('Thank you for your order!');
    });

    // SD-CHECK-008
    test('SD-CHECK-008 - Verify order confirmation @smoke @regression', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.enterCustomerDetails('Atul', 'Hire', '411001');
        await checkoutPage.continue();
        await checkoutPage.finish();

        await expect(checkoutPage.completeMessage).toBeVisible();

        await expect(checkoutPage.completeText)
            .toContainText('Your order has been dispatched');
    });

});
