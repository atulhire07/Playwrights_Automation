# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Checkout.spec.ts >> SauceDemo - Checkout Module >> SD-CHECK-006 - Verify total amount @regression
- Location: tests\Checkout.spec.ts:173:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.summary_subtotal')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('.summary_subtotal') with timeout 5000ms
  - waiting for locator('.summary_subtotal')

```

```yaml
- banner:
  - button "Open Menu"
  - img "Open Menu"
  - text: Swag Labs
  - button "Cart, 1 items": "1"
  - text: "Checkout: Overview"
- main:
  - text: QTY Description 1
  - button "View details for Sauce Labs Backpack": Sauce Labs Backpack
  - text: "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection. $29.99 Payment Information: SauceCard #31337 Shipping Information: Free Pony Express Delivery! Price Total Item total: $29.99 Tax: $2.40 Total: $32.39"
  - button "Cancel"
  - button "Finish"
- contentinfo:
  - list:
    - listitem:
      - link "X":
        - /url: https://x.com/saucelabs
    - listitem:
      - link "Facebook":
        - /url: https://www.facebook.com/saucelabs
    - listitem:
      - link "LinkedIn":
        - /url: https://www.linkedin.com/company/sauce-labs/
  - text: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  91  |     // SD-CHECK-003
  92  |     test(
  93  |         'SD-CHECK-003 - Last name mandatory @regression',
  94  |         async ({ page }) => {
  95  | 
  96  |             const checkoutPage =
  97  |                 new CheckoutPage(page);
  98  | 
  99  |             await checkoutPage.enterCustomerDetails(
  100 |                 'Atul',
  101 |                 '',
  102 |                 '411001'
  103 |             );
  104 | 
  105 |             await checkoutPage.continue();
  106 | 
  107 |             await expect(
  108 |                 checkoutPage.errorMessage
  109 |             ).toContainText(
  110 |                 'Last Name is required'
  111 |             );
  112 |         }
  113 |     );
  114 | 
  115 | 
  116 |     // SD-CHECK-004
  117 |     test(
  118 |         'SD-CHECK-004 - Postal code mandatory @regression',
  119 |         async ({ page }) => {
  120 | 
  121 |             const checkoutPage =
  122 |                 new CheckoutPage(page);
  123 | 
  124 |             await checkoutPage.enterCustomerDetails(
  125 |                 'Atul',
  126 |                 'Hire',
  127 |                 ''
  128 |             );
  129 | 
  130 |             await checkoutPage.continue();
  131 | 
  132 |             await expect(
  133 |                 checkoutPage.errorMessage
  134 |             ).toContainText(
  135 |                 'Postal Code is required'
  136 |             );
  137 |         }
  138 |     );
  139 | 
  140 | 
  141 |     // SD-CHECK-005
  142 |     test(
  143 |         'SD-CHECK-005 - Verify checkout overview @regression',
  144 |         async ({ page }) => {
  145 | 
  146 |             const checkoutPage =
  147 |                 new CheckoutPage(page);
  148 | 
  149 |             await checkoutPage.enterCustomerDetails(
  150 |                 'Atul',
  151 |                 'Hire',
  152 |                 '411001'
  153 |             );
  154 | 
  155 |             await checkoutPage.continue();
  156 | 
  157 |             await expect(
  158 |                 checkoutPage.pageTitle
  159 |             ).toHaveText(
  160 |                 'Checkout: Overview'
  161 |             );
  162 | 
  163 |             await expect(
  164 |                 checkoutPage.summaryItems
  165 |             ).toContainText(
  166 |                 'Sauce Labs Backpack'
  167 |             );
  168 |         }
  169 |     );
  170 | 
  171 | 
  172 |     // SD-CHECK-006
  173 |     test(
  174 |         'SD-CHECK-006 - Verify total amount @regression',
  175 |         async ({ page }) => {
  176 | 
  177 |             const checkoutPage =
  178 |                 new CheckoutPage(page);
  179 | 
  180 |             await checkoutPage.enterCustomerDetails(
  181 |                 'Atul',
  182 |                 'Hire',
  183 |                 '411001'
  184 |             );
  185 | 
  186 |             await checkoutPage.continue();
  187 | 
  188 | const subtotalCount = await checkoutPage.subtotal.count();
  189 | console.log('SUBTOTAL COUNT:', subtotalCount);
  190 | 
> 191 | await expect(checkoutPage.subtotal).toBeVisible();
      |                                     ^ Error: expect(locator).toBeVisible() failed
  192 | 
  193 | await expect(checkoutPage.subtotal).toContainText('29.99', {
  194 |   timeout: 10000,
  195 | });
  196 | 
  197 |             await expect(
  198 |                 checkoutPage.tax
  199 |             ).toBeVisible();
  200 | 
  201 |             await expect(
  202 |                 checkoutPage.total
  203 |             ).toBeVisible();
  204 |         }
  205 |     );
  206 | 
  207 | 
  208 |     // SD-CHECK-007
  209 |     test(
  210 |         'SD-CHECK-007 - Complete order @smoke @regression',
  211 |         async ({ page }) => {
  212 | 
  213 |             const checkoutPage =
  214 |                 new CheckoutPage(page);
  215 | 
  216 |             await checkoutPage.enterCustomerDetails(
  217 |                 'Atul',
  218 |                 'Hire',
  219 |                 '411001'
  220 |             );
  221 | 
  222 |             await checkoutPage.continue();
  223 | 
  224 |             await checkoutPage.finish();
  225 | 
  226 |             await expect(
  227 |                 checkoutPage.completeMessage
  228 |             ).toHaveText(
  229 |                 'Thank you for your order!'
  230 |             );
  231 |         }
  232 |     );
  233 | 
  234 | 
  235 |     // SD-CHECK-008
  236 |     test(
  237 |         'SD-CHECK-008 - Verify order confirmation @smoke @regression',
  238 |         async ({ page }) => {
  239 | 
  240 |             const checkoutPage =
  241 |                 new CheckoutPage(page);
  242 | 
  243 |             await checkoutPage.enterCustomerDetails(
  244 |                 'Atul',
  245 |                 'Hire',
  246 |                 '411001'
  247 |             );
  248 | 
  249 |             await checkoutPage.continue();
  250 | 
  251 |             await checkoutPage.finish();
  252 | 
  253 |             await expect(
  254 |                 checkoutPage.completeMessage
  255 |             ).toBeVisible();
  256 | 
  257 |             await expect(
  258 |                 checkoutPage.completeText
  259 |             ).toContainText(
  260 |                 'Your order has been dispatched'
  261 |             );
  262 |         }
  263 |     );
  264 | 
  265 | });
```