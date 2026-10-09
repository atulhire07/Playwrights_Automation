import { test, expect } from '@playwright/test';

import users from '../test-data/users.json';

import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';


test.describe('SauceDemo - Logout Module', () => {


    // SD-LOGOUT-001
    test(
        'SD-LOGOUT-001 - Logout successfully @smoke @regression',
        async ({ page }) => {

            const loginPage =
                new LoginPage(page);

            await loginPage.open();

            await loginPage.login(
                users.standardUser.username,
                users.standardUser.password
            );

            const productsPage =
                new ProductsPage(page);

            await productsPage.logout();

            await expect(
                loginPage.usernameInput
            ).toBeVisible();
        }
    );


    // SD-LOGOUT-002
    test(
        'SD-LOGOUT-002 - Verify login page after logout @regression',
        async ({ page }) => {

            const loginPage =
                new LoginPage(page);

            await loginPage.open();

            await loginPage.login(
                users.standardUser.username,
                users.standardUser.password
            );

            const productsPage =
                new ProductsPage(page);

            await productsPage.logout();

            await expect(
                loginPage.usernameInput
            ).toBeVisible();

            await expect(
                loginPage.passwordInput
            ).toBeVisible();

            await expect(
                loginPage.loginButton
            ).toBeVisible();
        }
    );

});