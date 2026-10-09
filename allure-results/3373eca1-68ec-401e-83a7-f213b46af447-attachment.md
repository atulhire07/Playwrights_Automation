# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Checkout.spec.ts >> SauceDemo - Checkout Module >> SD-CHECK-006 - Verify total amount @regression
- Location: tests\Checkout.spec.ts:173:9

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.summary_subtotal')
Expected substring: "29.99"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" locator('.summary_subtotal') with timeout 5000ms
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
  90  | 
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
  188 |             await expect(
  189 |                 checkoutPage.subtotal
> 190 |             ).toContainText(
      |               ^ Error: expect(locator).toContainText(expected) failed
  191 |                 '29.99'
  192 |             );
  193 | 
  194 |             await expect(
  195 |                 checkoutPage.tax
  196 |             ).toBeVisible();
  197 | 
  198 |             await expect(
  199 |                 checkoutPage.total
  200 |             ).toBeVisible();
  201 |         }
  202 |     );
  203 | 
  204 | 
  205 |     // SD-CHECK-007
  206 |     test(
  207 |         'SD-CHECK-007 - Complete order @smoke @regression',
  208 |         async ({ page }) => {
  209 | 
  210 |             const checkoutPage =
  211 |                 new CheckoutPage(page);
  212 | 
  213 |             await checkoutPage.enterCustomerDetails(
  214 |                 'Atul',
  215 |                 'Hire',
  216 |                 '411001'
  217 |             );
  218 | 
  219 |             await checkoutPage.continue();
  220 | 
  221 |             await checkoutPage.finish();
  222 | 
  223 |             await expect(
  224 |                 checkoutPage.completeMessage
  225 |             ).toHaveText(
  226 |                 'Thank you for your order!'
  227 |             );
  228 |         }
  229 |     );
  230 | 
  231 | 
  232 |     // SD-CHECK-008
  233 |     test(
  234 |         'SD-CHECK-008 - Verify order confirmation @smoke @regression',
  235 |         async ({ page }) => {
  236 | 
  237 |             const checkoutPage =
  238 |                 new CheckoutPage(page);
  239 | 
  240 |             await checkoutPage.enterCustomerDetails(
  241 |                 'Atul',
  242 |                 'Hire',
  243 |                 '411001'
  244 |             );
  245 | 
  246 |             await checkoutPage.continue();
  247 | 
  248 |             await checkoutPage.finish();
  249 | 
  250 |             await expect(
  251 |                 checkoutPage.completeMessage
  252 |             ).toBeVisible();
  253 | 
  254 |             await expect(
  255 |                 checkoutPage.completeText
  256 |             ).toContainText(
  257 |                 'Your order has been dispatched'
  258 |             );
  259 |         }
  260 |     );
  261 | 
  262 | });
```