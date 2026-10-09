import { test, expect } from '@playwright/test';

import users from '../test-data/users.json';

import { LoginPage } from './pages/LoginPage';


test.describe('SauceDemo - Login Module', () => {


    // SD-LOGIN-001
    test(
        'SD-LOGIN-001 - Valid login @smoke @regression',
        async ({ page }) => {

            const loginPage = new LoginPage(page);

            await loginPage.open();

            await loginPage.login(
                users.standardUser.username,
                users.standardUser.password
            );

            await expect(page).toHaveURL(/inventory.html/);
        }
    );


    // SD-LOGIN-002
    test(
        'SD-LOGIN-002 - Invalid password @regression',
        async ({ page }) => {

            const loginPage = new LoginPage(page);

            await loginPage.open();

            await loginPage.login(
                users.standardUser.username,
                'wrong_password'
            );

            await expect(
                loginPage.errorMessage
            ).toBeVisible();

            await expect(
                loginPage.errorMessage
            ).toContainText(
                'Username and password do not match'
            );
        }
    );


    // SD-LOGIN-003
    test(
        'SD-LOGIN-003 - Invalid username @regression',
        async ({ page }) => {

            const loginPage = new LoginPage(page);

            await loginPage.open();

            await loginPage.login(
                'invalid_user',
                users.standardUser.password
            );

            await expect(
                loginPage.errorMessage
            ).toBeVisible();
        }
    );


    // SD-LOGIN-004
    test(
        'SD-LOGIN-004 - Blank username @regression',
        async ({ page }) => {

            const loginPage = new LoginPage(page);

            await loginPage.open();

            await loginPage.enterPassword(
                users.standardUser.password
            );

            await loginPage.clickLogin();

            await expect(
                loginPage.errorMessage
            ).toContainText(
                'Username is required'
            );
        }
    );


    // SD-LOGIN-005
    test(
        'SD-LOGIN-005 - Blank password @regression',
        async ({ page }) => {

            const loginPage = new LoginPage(page);

            await loginPage.open();

            await loginPage.enterUsername(
                users.standardUser.username
            );

            await loginPage.clickLogin();

            await expect(
                loginPage.errorMessage
            ).toContainText(
                'Password is required'
            );
        }
    );


    // SD-LOGIN-006
    test(
        'SD-LOGIN-006 - Both fields blank @regression',
        async ({ page }) => {

            const loginPage = new LoginPage(page);

            await loginPage.open();

            await loginPage.clickLogin();

            await expect(
                loginPage.errorMessage
            ).toContainText(
                'Username is required'
            );
        }
    );


    // SD-LOGIN-007
    test(
        'SD-LOGIN-007 - Locked user @smoke @regression',
        async ({ page }) => {

            const loginPage = new LoginPage(page);

            await loginPage.open();

            await loginPage.login(
                users.lockedUser.username,
                users.lockedUser.password
            );

            await expect(
                loginPage.errorMessage
            ).toContainText(
                'locked out'
            );
        }
    );


    // SD-LOGIN-008
    test(
        'SD-LOGIN-008 - Redirect to Products @smoke @regression',
        async ({ page }) => {

            const loginPage = new LoginPage(page);

            await loginPage.open();

            await loginPage.login(
                users.standardUser.username,
                users.standardUser.password
            );

            await expect(
                page.locator('.title')
            ).toHaveText('Products');
        }
    );

});