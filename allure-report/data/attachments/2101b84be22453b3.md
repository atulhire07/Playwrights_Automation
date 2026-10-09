# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: product.spec.ts >> SauceDemo - Products Module >> SD-PROD-008 - Open shopping cart @smoke @regression
- Location: tests\product.spec.ts:110:9

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
      - textbox "Username" [active] [ref=e11]
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
  1   | 
  2   | import { test, expect } from '@playwright/test';
  3   | 
  4   | import users from '../test-data/users.json';
  5   | 
  6   | import { LoginPage } from './pages/LoginPage';
  7   | import { ProductsPage } from './pages/ProductsPage';
  8   | 
  9   | test.describe('SauceDemo - Products Module', () => {
  10  | 
> 11  |     test.beforeEach(async ({ page }) => {
      |          ^ Test timeout of 30000ms exceeded while running "beforeEach" hook.
  12  |         const loginPage = new LoginPage(page);
  13  | 
  14  |         await loginPage.open();
  15  | 
  16  |         await loginPage.login(
  17  |             users.standardUser.username,
  18  |             users.standardUser.password
  19  |         );
  20  | 
  21  |         await expect(page).toHaveURL(/inventory\.html/);
  22  |     });
  23  | 
  24  |     // SD-PROD-001
  25  |     test('SD-PROD-001 - Verify products page @smoke @regression', async ({ page }) => {
  26  |         const productsPage = new ProductsPage(page);
  27  | 
  28  |         await expect(productsPage.pageTitle).toHaveText('Products');
  29  |         await expect(productsPage.inventoryItems).not.toHaveCount(0);
  30  |     });
  31  | 
  32  |     // SD-PROD-002
  33  |     test('SD-PROD-002 - Verify product names @regression', async ({ page }) => {
  34  |         const productsPage = new ProductsPage(page);
  35  | 
  36  |         await expect(productsPage.inventoryItems).not.toHaveCount(0);
  37  | 
  38  |         const productNames = await productsPage.getProductNames();
  39  | 
  40  |         console.log('Product names:', productNames);
  41  | 
  42  |         expect(productNames.length).toBeGreaterThan(0);
  43  |         expect(productNames).toContain('Sauce Labs Backpack');
  44  |     });
  45  | 
  46  |     // SD-PROD-003
  47  |     test('SD-PROD-003 - Verify product prices @regression', async ({ page }) => {
  48  |         const productsPage = new ProductsPage(page);
  49  | 
  50  |         await expect(productsPage.inventoryItems).not.toHaveCount(0);
  51  | 
  52  |         const prices = await productsPage.getProductPrices();
  53  | 
  54  |         console.log('Prices found:', prices.length);
  55  |         console.log('Price values:', prices);
  56  | 
  57  |         expect(prices.length).toBeGreaterThan(0);
  58  |         expect(prices).toContain('$29.99');
  59  |     });
  60  | 
  61  |     // SD-PROD-004
  62  |     test('SD-PROD-004 - Verify product count @regression', async ({ page }) => {
  63  |         const productsPage = new ProductsPage(page);
  64  | 
  65  |         await expect(productsPage.inventoryItems).not.toHaveCount(0);
  66  | 
  67  |         const productCount = await productsPage.getProductCount();
  68  | 
  69  |         expect(productCount).toBe(6);
  70  |     });
  71  | 
  72  |     // SD-PROD-005
  73  |     test('SD-PROD-005 - Add product to cart @smoke @regression', async ({ page }) => {
  74  |         const productsPage = new ProductsPage(page);
  75  | 
  76  |         await productsPage.addProduct('Sauce Labs Backpack');
  77  | 
  78  |         await expect(productsPage.cartBadge).toHaveText('1');
  79  |     });
  80  | 
  81  |     // SD-PROD-006
  82  |     test('SD-PROD-006 - Remove product from cart @regression', async ({ page }) => {
  83  |         const productsPage = new ProductsPage(page);
  84  | 
  85  |         await productsPage.addProduct('Sauce Labs Backpack');
  86  |         await productsPage.removeProduct('Sauce Labs Backpack');
  87  | 
  88  |         await expect(productsPage.cartBadge).toHaveCount(0);
  89  |     });
  90  | 
  91  |     // SD-PROD-007
  92  |     test('SD-PROD-007 - Sort products by price low to high @regression', async ({ page }) => {
  93  |         const productsPage = new ProductsPage(page);
  94  | 
  95  |         await productsPage.sortProducts('lohi');
  96  | 
  97  |         const prices = await productsPage.getProductPrices();
  98  | 
  99  |         const numericPrices = prices.map(price =>
  100 |             Number(price.replace('$', ''))
  101 |         );
  102 | 
  103 |         expect(numericPrices.length).toBeGreaterThan(0);
  104 |         expect(numericPrices).toEqual(
  105 |             [...numericPrices].sort((a, b) => a - b)
  106 |         );
  107 |     });
  108 | 
  109 |     // SD-PROD-008
  110 |     test('SD-PROD-008 - Open shopping cart @smoke @regression', async ({ page }) => {
  111 |         const productsPage = new ProductsPage(page);
```