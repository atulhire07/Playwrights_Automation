# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Logout.spec.ts >> SauceDemo - Logout Module >> SD-LOGOUT-001 - Logout successfully @smoke @regression
- Location: tests\Logout.spec.ts:13:9

# Error details

```
TypeError: productsPage.logout is not a function
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - banner [ref=e5]:
      - generic [ref=e6]:
        - generic:
          - generic:
            - generic [ref=e7]:
              - button "Open Menu" [ref=e8] [cursor=pointer]
              - img "Open Menu" [ref=e9]
            - generic [aria-hidden] [ref=e10]:
              - navigation [ref=e12]:
                - button [ref=e13] [cursor=pointer]: All Items
                - button [ref=e14] [cursor=pointer]: Dynamic Catalog
                - link [ref=e16] [cursor=pointer]:
                  - /url: https://saucelabs.com/
                  - text: About
                - button [ref=e17] [cursor=pointer]: Logout
                - button [ref=e18] [cursor=pointer]: Reset App State
              - button [ref=e20] [cursor=pointer]: Close Menu
        - generic [ref=e22]: Swag Labs
        - button "Cart, empty" [ref=e25]
      - generic [ref=e26]:
        - generic [ref=e27]: Products
        - generic [ref=e29] [cursor=pointer]:
          - generic [ref=e30]: Name (A to Z)
          - combobox "Sort products" [ref=e31]:
            - option "Name (A to Z)" [selected]
            - option "Name (Z to A)"
            - option "Price (low to high)"
            - option "Price (high to low)"
    - main [ref=e32]:
      - generic [ref=e35]:
        - generic [ref=e36]:
          - button "View details for Sauce Labs Backpack" [ref=e38] [cursor=pointer]:
            - img "Sauce Labs Backpack"
          - generic [ref=e39]:
            - generic [ref=e40]:
              - button "View details for Sauce Labs Backpack" [ref=e41] [cursor=pointer]:
                - generic [ref=e42]: Sauce Labs Backpack
              - generic [ref=e43]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
            - generic [ref=e44]:
              - generic [ref=e45]: $29.99
              - button "Add to cart" [ref=e46] [cursor=pointer]
        - generic [ref=e47]:
          - button "View details for Sauce Labs Bike Light" [ref=e49] [cursor=pointer]:
            - img "Sauce Labs Bike Light"
          - generic [ref=e50]:
            - generic [ref=e51]:
              - button "View details for Sauce Labs Bike Light" [ref=e52] [cursor=pointer]:
                - generic [ref=e53]: Sauce Labs Bike Light
              - generic [ref=e54]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
            - generic [ref=e55]:
              - generic [ref=e56]: $9.99
              - button "Add to cart" [ref=e57] [cursor=pointer]
        - generic [ref=e58]:
          - button "View details for Sauce Labs Bolt T-Shirt" [ref=e60] [cursor=pointer]:
            - img "Sauce Labs Bolt T-Shirt"
          - generic [ref=e61]:
            - generic [ref=e62]:
              - button "View details for Sauce Labs Bolt T-Shirt" [ref=e63] [cursor=pointer]:
                - generic [ref=e64]: Sauce Labs Bolt T-Shirt
              - generic [ref=e65]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
            - generic [ref=e66]:
              - generic [ref=e67]: $15.99
              - button "Add to cart" [ref=e68] [cursor=pointer]
        - generic [ref=e69]:
          - button "View details for Sauce Labs Fleece Jacket" [ref=e71] [cursor=pointer]:
            - img "Sauce Labs Fleece Jacket"
          - generic [ref=e72]:
            - generic [ref=e73]:
              - button "View details for Sauce Labs Fleece Jacket" [ref=e74] [cursor=pointer]:
                - generic [ref=e75]: Sauce Labs Fleece Jacket
              - generic [ref=e76]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
            - generic [ref=e77]:
              - generic [ref=e78]: $49.99
              - button "Add to cart" [ref=e79] [cursor=pointer]
        - generic [ref=e80]:
          - button "View details for Sauce Labs Onesie" [ref=e82] [cursor=pointer]:
            - img "Sauce Labs Onesie"
          - generic [ref=e83]:
            - generic [ref=e84]:
              - button "View details for Sauce Labs Onesie" [ref=e85] [cursor=pointer]:
                - generic [ref=e86]: Sauce Labs Onesie
              - generic [ref=e87]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
            - generic [ref=e88]:
              - generic [ref=e89]: $7.99
              - button "Add to cart" [ref=e90] [cursor=pointer]
        - generic [ref=e91]:
          - button "View details for Test.allTheThings() T-Shirt (Red)" [ref=e93] [cursor=pointer]:
            - img "Test.allTheThings() T-Shirt (Red)"
          - generic [ref=e94]:
            - generic [ref=e95]:
              - button "View details for Test.allTheThings() T-Shirt (Red)" [ref=e96] [cursor=pointer]:
                - generic [ref=e97]: Test.allTheThings() T-Shirt (Red)
              - generic [ref=e98]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
            - generic [ref=e99]:
              - generic [ref=e100]: $15.99
              - button "Add to cart" [ref=e101] [cursor=pointer]
  - contentinfo [ref=e102]:
    - list [ref=e103]:
      - listitem [ref=e104]:
        - link "X" [ref=e105] [cursor=pointer]:
          - /url: https://x.com/saucelabs
      - listitem [ref=e106]:
        - link "Facebook" [ref=e107] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e108]:
        - link "LinkedIn" [ref=e109] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e110]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | import users from '../test-data/users.json';
  4  | 
  5  | import { LoginPage } from './pages/LoginPage';
  6  | import { ProductsPage } from './pages/ProductsPage';
  7  | 
  8  | 
  9  | test.describe('SauceDemo - Logout Module', () => {
  10 | 
  11 | 
  12 |     // SD-LOGOUT-001
  13 |     test(
  14 |         'SD-LOGOUT-001 - Logout successfully @smoke @regression',
  15 |         async ({ page }) => {
  16 | 
  17 |             const loginPage =
  18 |                 new LoginPage(page);
  19 | 
  20 |             await loginPage.open();
  21 | 
  22 |             await loginPage.login(
  23 |                 users.standardUser.username,
  24 |                 users.standardUser.password
  25 |             );
  26 | 
  27 |             const productsPage =
  28 |                 new ProductsPage(page);
  29 | 
> 30 |             await productsPage.logout();
     |                                ^ TypeError: productsPage.logout is not a function
  31 | 
  32 |             await expect(
  33 |                 loginPage.usernameInput
  34 |             ).toBeVisible();
  35 |         }
  36 |     );
  37 | 
  38 | 
  39 |     // SD-LOGOUT-002
  40 |     test(
  41 |         'SD-LOGOUT-002 - Verify login page after logout @regression',
  42 |         async ({ page }) => {
  43 | 
  44 |             const loginPage =
  45 |                 new LoginPage(page);
  46 | 
  47 |             await loginPage.open();
  48 | 
  49 |             await loginPage.login(
  50 |                 users.standardUser.username,
  51 |                 users.standardUser.password
  52 |             );
  53 | 
  54 |             const productsPage =
  55 |                 new ProductsPage(page);
  56 | 
  57 |             await productsPage.logout();
  58 | 
  59 |             await expect(
  60 |                 loginPage.usernameInput
  61 |             ).toBeVisible();
  62 | 
  63 |             await expect(
  64 |                 loginPage.passwordInput
  65 |             ).toBeVisible();
  66 | 
  67 |             await expect(
  68 |                 loginPage.loginButton
  69 |             ).toBeVisible();
  70 |         }
  71 |     );
  72 | 
  73 | });
```