# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Checkout.spec.ts >> SauceDemo - Checkout Module >> SD-CHECK-006 - Verify total amount @regression
- Location: tests\Checkout.spec.ts:173:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.textContent: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.summary_subtotal')

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
      - generic [ref=e15]: "Checkout: Overview"
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
              - generic [ref=e28]: $29.99
        - generic [ref=e30]:
          - generic [ref=e31]: "Payment Information:"
          - generic [ref=e32]: "SauceCard #31337"
          - generic [ref=e33]: "Shipping Information:"
          - generic [ref=e34]: Free Pony Express Delivery!
          - generic [ref=e35]: Price Total
          - generic [ref=e36]: "Item total: $29.99"
          - generic [ref=e37]: "Tax: $2.40"
          - generic [ref=e38]: "Total: $32.39"
          - generic [ref=e39]:
            - button "Cancel" [ref=e40] [cursor=pointer]
            - button "Finish" [ref=e41] [cursor=pointer]
  - contentinfo [ref=e42]:
    - list [ref=e43]:
      - listitem [ref=e44]:
        - link "X" [ref=e45] [cursor=pointer]:
          - /url: https://x.com/saucelabs
      - listitem [ref=e46]:
        - link "Facebook" [ref=e47] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e48]:
        - link "LinkedIn" [ref=e49] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e50]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
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
  188 |             console.log(
  189 |     'SUBTOTAL:',
> 190 |     await checkoutPage.subtotal.textContent()
      |                                 ^ Error: locator.textContent: Test timeout of 30000ms exceeded.
  191 | );
  192 | 
  193 |             await expect(
  194 |                 checkoutPage.subtotal
  195 |             ).toContainText(
  196 |                 '29.99'
  197 |             );
  198 | 
  199 |             await expect(
  200 |                 checkoutPage.tax
  201 |             ).toBeVisible();
  202 | 
  203 |             await expect(
  204 |                 checkoutPage.total
  205 |             ).toBeVisible();
  206 |         }
  207 |     );
  208 | 
  209 | 
  210 |     // SD-CHECK-007
  211 |     test(
  212 |         'SD-CHECK-007 - Complete order @smoke @regression',
  213 |         async ({ page }) => {
  214 | 
  215 |             const checkoutPage =
  216 |                 new CheckoutPage(page);
  217 | 
  218 |             await checkoutPage.enterCustomerDetails(
  219 |                 'Atul',
  220 |                 'Hire',
  221 |                 '411001'
  222 |             );
  223 | 
  224 |             await checkoutPage.continue();
  225 | 
  226 |             await checkoutPage.finish();
  227 | 
  228 |             await expect(
  229 |                 checkoutPage.completeMessage
  230 |             ).toHaveText(
  231 |                 'Thank you for your order!'
  232 |             );
  233 |         }
  234 |     );
  235 | 
  236 | 
  237 |     // SD-CHECK-008
  238 |     test(
  239 |         'SD-CHECK-008 - Verify order confirmation @smoke @regression',
  240 |         async ({ page }) => {
  241 | 
  242 |             const checkoutPage =
  243 |                 new CheckoutPage(page);
  244 | 
  245 |             await checkoutPage.enterCustomerDetails(
  246 |                 'Atul',
  247 |                 'Hire',
  248 |                 '411001'
  249 |             );
  250 | 
  251 |             await checkoutPage.continue();
  252 | 
  253 |             await checkoutPage.finish();
  254 | 
  255 |             await expect(
  256 |                 checkoutPage.completeMessage
  257 |             ).toBeVisible();
  258 | 
  259 |             await expect(
  260 |                 checkoutPage.completeText
  261 |             ).toContainText(
  262 |                 'Your order has been dispatched'
  263 |             );
  264 |         }
  265 |     );
  266 | 
  267 | });
```