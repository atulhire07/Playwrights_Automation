import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import users from '../test-data/users.json';

test.describe('SauceDemo - Cart Module', () => {
  test(
    'SD-CART-001 - Verify product in cart @smoke @regression',
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);

      // Step 1: Open the login page
      await loginPage.open();

      // Step 2: Login with valid credentials
      await loginPage.login(
        users.standardUser.username,
        users.standardUser.password
      );

      // Step 3: Verify the products page
      await expect(page).toHaveURL(/inventory\.html/);
      await expect(page.locator('.inventory_item')).toHaveCount(6);

      // Step 4: Add the product to the cart
      await productsPage.addProduct('Sauce Labs Backpack');
      await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

      // Step 5: Open the shopping cart
      await productsPage.openCart();
      await expect(page).toHaveURL(/cart\.html/);

      // Step 6: Verify the product in the cart
      const cartItem = page.locator('.cart_item');

      await expect(cartItem).toHaveCount(1);
      await expect(
        cartItem.locator('.inventory_item_name')
      ).toHaveText('Sauce Labs Backpack');
    }
  );
});