import { test, expect } from '@playwright/test';

import users from '../test-data/users.json';

import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';


test.describe('SauceDemo - Cart Module', () => {


    test.beforeEach(async ({ page }) => {

        const loginPage =
            new LoginPage(page);

        await loginPage.open();

        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );

        const productsPage =
            new ProductsPage(page);

        await productsPage.addProduct(
            'Sauce Labs Backpack'
        );

        await productsPage.openCart();
    });


    // SD-CART-001
    test(
        'SD-CART-001 - Verify product in cart @smoke @regression',
        async ({ page }) => {

            const cartPage =
                new CartPage(page);

            const products =
                await cartPage.getProductNames();

            expect(products).toContain(
                'Sauce Labs Backpack'
            );
        }
    );


    // SD-CART-002
    test(
        'SD-CART-002 - Verify cart item count @smoke @regression',
        async ({ page }) => {

            const cartPage =
                new CartPage(page);

            const count =
                await cartPage.getItemCount();

            expect(count).toBe(1);
        }
    );


    // SD-CART-003
    test(
        'SD-CART-003 - Remove product @regression',
        async ({ page }) => {

            const cartPage =
                new CartPage(page);

            await cartPage.removeProduct(
                'Sauce Labs Backpack'
            );

            expect(
                await cartPage.getItemCount()
            ).toBe(0);
        }
    );


    // SD-CART-004
    test(
        'SD-CART-004 - Continue shopping @regression',
        async ({ page }) => {

            const cartPage =
                new CartPage(page);

            await cartPage.continueShopping();

            await expect(page)
                .toHaveURL(/inventory.html/);
        }
    );


    // SD-CART-005
    test(
        'SD-CART-005 - Open checkout @smoke @regression',
        async ({ page }) => {

            const cartPage =
                new CartPage(page);

            await cartPage.checkout();

            await expect(page)
                .toHaveURL(
                    /checkout-step-one.html/
                );
        }
    );

});