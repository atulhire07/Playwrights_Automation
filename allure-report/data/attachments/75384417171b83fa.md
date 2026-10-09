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
  191 | await expect(
  192 |     checkoutPage.subtotal
> 193 | ).toContainText('29.99');
      |   ^ Error: expect(locator).toContainText(expected) failed
  194 | 
  195 |             await expect(
  196 |                 checkoutPage.tax
  197 |             ).toBeVisible();
  198 | 
  199 |             await expect(
  200 |                 checkoutPage.total
  201 |             ).toBeVisible();
  202 |         }
  203 |     );
  204 | 
  205 | 
  206 |     // SD-CHECK-007
  207 |     test(
  208 |         'SD-CHECK-007 - Complete order @smoke @regression',
  209 |         async ({ page }) => {
  210 | 
  211 |             const checkoutPage =
  212 |                 new CheckoutPage(page);
  213 | 
  214 |             await checkoutPage.enterCustomerDetails(
  215 |                 'Atul',
  216 |                 'Hire',
  217 |                 '411001'
  218 |             );
  219 | 
  220 |             await checkoutPage.continue();
  221 | 
  222 |             await checkoutPage.finish();
  223 | 
  224 |             await expect(
  225 |                 checkoutPage.completeMessage
  226 |             ).toHaveText(
  227 |                 'Thank you for your order!'
  228 |             );
  229 |         }
  230 |     );
  231 | 
  232 | 
  233 |     // SD-CHECK-008
  234 |     test(
  235 |         'SD-CHECK-008 - Verify order confirmation @smoke @regression',
  236 |         async ({ page }) => {
  237 | 
  238 |             const checkoutPage =
  239 |                 new CheckoutPage(page);
  240 | 
  241 |             await checkoutPage.enterCustomerDetails(
  242 |                 'Atul',
  243 |                 'Hire',
  244 |                 '411001'
  245 |             );
  246 | 
  247 |             await checkoutPage.continue();
  248 | 
  249 |             await checkoutPage.finish();
  250 | 
  251 |             await expect(
  252 |                 checkoutPage.completeMessage
  253 |             ).toBeVisible();
  254 | 
  255 |             await expect(
  256 |                 checkoutPage.completeText
  257 |             ).toContainText(
  258 |                 'Your order has been dispatched'
  259 |             );
  260 |         }
  261 |     );
  262 | 
  263 | });
```