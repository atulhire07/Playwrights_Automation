# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart.spec.ts >> SauceDemo - Cart Module >> SD-CART-001 - Verify product in cart @smoke @regression
- Location: tests\cart.spec.ts:37:9

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
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
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | import users from '../test-data/users.json';
  4   | 
  5   | import { LoginPage } from './pages/LoginPage';
  6   | import { ProductsPage } from './pages/ProductsPage';
  7   | import { CartPage } from './pages/CartPage';
  8   | 
  9   | 
  10  | test.describe('SauceDemo - Cart Module', () => {
  11  | 
  12  | 
> 13  |     test.beforeEach(async ({ page }) => {
      |          ^ Test timeout of 30000ms exceeded while running "beforeEach" hook.
  14  | 
  15  |         const loginPage =
  16  |             new LoginPage(page);
  17  | 
  18  |         await loginPage.open();
  19  | 
  20  |         await loginPage.login(
  21  |             users.standardUser.username,
  22  |             users.standardUser.password
  23  |         );
  24  | 
  25  |         const productsPage =
  26  |             new ProductsPage(page);
  27  | 
  28  |         await productsPage.addProduct(
  29  |             'Sauce Labs Backpack'
  30  |         );
  31  | 
  32  |         await productsPage.openCart();
  33  |     });
  34  | 
  35  | 
  36  |     // SD-CART-001
  37  |     test(
  38  |         'SD-CART-001 - Verify product in cart @smoke @regression',
  39  |         async ({ page }) => {
  40  | 
  41  |             const cartPage =
  42  |                 new CartPage(page);
  43  | 
  44  |             const products =
  45  |                 await cartPage.getProductNames();
  46  | 
  47  |             expect(products).toContain(
  48  |                 'Sauce Labs Backpack'
  49  |             );
  50  |         }
  51  |     );
  52  | 
  53  | 
  54  |     // SD-CART-002
  55  |     test(
  56  |         'SD-CART-002 - Verify cart item count @smoke @regression',
  57  |         async ({ page }) => {
  58  | 
  59  |             const cartPage =
  60  |                 new CartPage(page);
  61  | 
  62  |             const count =
  63  |                 await cartPage.getItemCount();
  64  | 
  65  |             expect(count).toBe(1);
  66  |         }
  67  |     );
  68  | 
  69  | 
  70  |     // SD-CART-003
  71  |     test(
  72  |         'SD-CART-003 - Remove product @regression',
  73  |         async ({ page }) => {
  74  | 
  75  |             const cartPage =
  76  |                 new CartPage(page);
  77  | 
  78  |             await cartPage.removeProduct(
  79  |                 'Sauce Labs Backpack'
  80  |             );
  81  | 
  82  |             expect(
  83  |                 await cartPage.getItemCount()
  84  |             ).toBe(0);
  85  |         }
  86  |     );
  87  | 
  88  | 
  89  |     // SD-CART-004
  90  |     test(
  91  |         'SD-CART-004 - Continue shopping @regression',
  92  |         async ({ page }) => {
  93  | 
  94  |             const cartPage =
  95  |                 new CartPage(page);
  96  | 
  97  |             await cartPage.continueShopping();
  98  | 
  99  |             await expect(page)
  100 |                 .toHaveURL(/inventory.html/);
  101 |         }
  102 |     );
  103 | 
  104 | 
  105 |     // SD-CART-005
  106 |     test(
  107 |         'SD-CART-005 - Open checkout @smoke @regression',
  108 |         async ({ page }) => {
  109 | 
  110 |             const cartPage =
  111 |                 new CartPage(page);
  112 | 
  113 |             await cartPage.checkout();
```