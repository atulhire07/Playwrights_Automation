# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart.spec.ts >> SauceDemo - Cart Module >> SD-CART-001 - Verify product in cart @smoke @regression
- Location: tests\cart.spec.ts:7:7

# Error details

```
TypeError: Cannot read properties of undefined (reading 'username')
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - main [ref=e5]:
    - form "Login" [ref=e9]:
      - textbox "Username" [ref=e11]
      - textbox "Password" [ref=e13]
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_userlocked_out_userproblem_userperformance_glitch_usererror_uservisual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from './pages/LoginPage';
  3  | import { ProductsPage } from './pages/ProductsPage';
  4  | import users from '../test-data/users.json';
  5  | 
  6  | test.describe('SauceDemo - Cart Module', () => {
  7  |   test('SD-CART-001 - Verify product in cart @smoke @regression', async ({ page }) => {
  8  |     const loginPage = new LoginPage(page);
  9  |     const productsPage = new ProductsPage(page);
  10 | 
  11 |     await loginPage.open();
  12 |     await loginPage.login(
> 13 |       users.validUser.username,
     |                       ^ TypeError: Cannot read properties of undefined (reading 'username')
  14 |       users.validUser.password
  15 |     );
  16 | 
  17 |     await expect(page).toHaveURL(/inventory\.html/);
  18 |     await expect(page.locator('.inventory_item')).toHaveCount(6);
  19 | 
  20 |     await productsPage.addProduct('Sauce Labs Backpack');
  21 |     await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  22 | 
  23 |     await productsPage.openCart();
  24 |     await expect(page).toHaveURL(/cart\.html/);
  25 | 
  26 |     const cartItem = page.locator('.cart_item');
  27 |     await expect(cartItem).toHaveCount(1);
  28 |     await expect(
  29 |       cartItem.locator('.inventory_item_name')
  30 |     ).toHaveText('Sauce Labs Backpack');
  31 |   });
  32 | });
  33 | 
```