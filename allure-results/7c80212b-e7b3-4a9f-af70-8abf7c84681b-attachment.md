# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Checkout.spec.ts >> SauceDemo - Checkout Module >> SD-CHECK-004 - Postal code mandatory @regression
- Location: tests\Checkout.spec.ts:67:9

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.inventory_item').filter({ has: locator('.inventory_item_name').filter({ hasText: 'Sauce Labs Backpack' }) }).getByRole('button', { name: 'Add to cart' })

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
  1  | 
  2  | import { Page, Locator, expect } from '@playwright/test';
  3  | 
  4  | export class ProductsPage {
  5  |     readonly page: Page;
  6  | 
  7  |     readonly pageTitle: Locator;
  8  |     readonly inventoryItems: Locator;
  9  |     readonly productNames: Locator;
  10 |     readonly productPrices: Locator;
  11 |     readonly sortDropdown: Locator;
  12 |     readonly cartLink: Locator;
  13 |     readonly cartBadge: Locator;
  14 |     readonly menuButton: Locator;
  15 |     readonly logoutLink: Locator;
  16 | 
  17 |     constructor(page: Page) {
  18 |         this.page = page;
  19 | 
  20 |         this.pageTitle = page.locator('.title');
  21 |         this.inventoryItems = page.locator('.inventory_item');
  22 |         this.productNames = page.locator('.inventory_item_name');
  23 |         this.productPrices = page.locator('.inventory_item_price');
  24 |         this.sortDropdown = page.locator(
  25 |             '[data-test="product-sort-container"]'
  26 |         );
  27 |         this.cartLink = page.locator('.shopping_cart_link');
  28 |         this.cartBadge = page.locator('.shopping_cart_badge');
  29 | 
  30 |         this.menuButton = page.locator('#react-burger-menu-btn');
  31 |         this.logoutLink = page.locator('#logout_sidebar_link');
  32 |     }
  33 | 
  34 |     async getProductCount(): Promise<number> {
  35 |         return await this.inventoryItems.count();
  36 |     }
  37 | 
  38 |     async getProductNames(): Promise<string[]> {
  39 |         return await this.productNames.allTextContents();
  40 |     }
  41 | 
  42 |     async getProductPrices(): Promise<string[]> {
  43 |         return await this.productPrices.allTextContents();
  44 |     }
  45 | 
  46 |     async addProduct(productName: string): Promise<void> {
  47 |         const product = this.inventoryItems.filter({
  48 |             has: this.page.locator('.inventory_item_name', {
  49 |                 hasText: productName
  50 |             })
  51 |         });
  52 | 
  53 |         await product.getByRole('button', {
  54 |             name: 'Add to cart'
> 55 |         }).click();
     |            ^ Error: locator.click: Test timeout of 30000ms exceeded.
  56 |     }
  57 | 
  58 |     async removeProduct(productName: string): Promise<void> {
  59 |         const product = this.inventoryItems.filter({
  60 |             has: this.page.locator('.inventory_item_name', {
  61 |                 hasText: productName
  62 |             })
  63 |         });
  64 | 
  65 |         await product.getByRole('button', {
  66 |             name: 'Remove'
  67 |         }).click();
  68 |     }
  69 | 
  70 |     async openCart(): Promise<void> {
  71 |         await this.cartLink.click();
  72 |     }
  73 | 
  74 |     async getCartCount(): Promise<number> {
  75 |         if (await this.cartBadge.count() === 0) {
  76 |             return 0;
  77 |         }
  78 | 
  79 |         return Number(await this.cartBadge.innerText());
  80 |     }
  81 | 
  82 |     async sortProducts(option: string): Promise<void> {
  83 |         await this.sortDropdown.selectOption(option);
  84 |     }
  85 | 
  86 |     async logout(): Promise<void> {
  87 |         await this.menuButton.click();
  88 | 
  89 |         await this.logoutLink.waitFor({
  90 |             state: 'visible',
  91 |             timeout: 10000
  92 |         });
  93 | 
  94 |         await this.logoutLink.click();
  95 | 
  96 |         await expect(this.page.locator('[data-test="username"]'))
  97 |             .toBeVisible();
  98 |     }
  99 | }
```