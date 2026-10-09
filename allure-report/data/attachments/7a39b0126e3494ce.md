# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart.spec.ts >> SauceDemo - Cart Module >> SD-CART-002 - Verify cart item count @smoke @regression
- Location: tests\cart.spec.ts:55:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - banner [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e10]: Swag Labs
        - button "Cart, 1 items" [ref=e13]:
          - generic [ref=e14]: "1"
      - generic [ref=e15]: Your Cart
    - main [ref=e17]:
      - generic [ref=e18]:
        - generic [ref=e19]:
          - generic [ref=e20]: QTY
          - generic [ref=e21]: Description
          - generic [ref=e22]:
            - generic [ref=e23]: "1"
            - generic [ref=e24]:
              - button "View details for Sauce Labs Backpack" [ref=e25] [cursor=pointer]:
                - generic [ref=e26]: Sauce Labs Backpack
              - generic [ref=e27]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
              - generic [ref=e28]:
                - generic [ref=e29]: $29.99
                - button "Remove" [ref=e30] [cursor=pointer]
        - generic [ref=e31]:
          - button "Continue Shopping" [ref=e32] [cursor=pointer]
          - button "Checkout" [ref=e33] [cursor=pointer]
  - contentinfo [ref=e34]:
    - list [ref=e35]:
      - listitem [ref=e36]:
        - link "X" [ref=e37] [cursor=pointer]:
          - /url: https://x.com/saucelabs
      - listitem [ref=e38]:
        - link "Facebook" [ref=e39] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e40]:
        - link "LinkedIn" [ref=e41] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e42]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
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
  13  |     test.beforeEach(async ({ page }) => {
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
> 65  |             expect(count).toBe(1);
      |                           ^ Error: expect(received).toBe(expected) // Object.is equality
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
  114 | 
  115 |             await expect(page)
  116 |                 .toHaveURL(
  117 |                     /checkout-step-one.html/
  118 |                 );
  119 |         }
  120 |     );
  121 | 
  122 | });
```