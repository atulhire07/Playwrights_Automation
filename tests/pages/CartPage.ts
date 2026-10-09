
import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;

    readonly pageTitle: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pageTitle = page.locator('.title');
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator(
            '[data-test="continue-shopping"]'
        );
    }

    async getItemCount(): Promise<number> {
        await expect(this.pageTitle).toHaveText('Your Cart');
        return await this.cartItems.count();
    }

    async getProductNames(): Promise<string[]> {
        return await this.cartItems
            .locator('.inventory_item_name')
            .allTextContents();
    }

    async removeProduct(productName: string): Promise<void> {
        const product = this.cartItems.filter({
            has: this.page.locator('.inventory_item_name', {
                hasText: productName
            })
        });

        await product.getByRole('button', {
            name: 'Remove'
        }).click();
    }

    async checkout(): Promise<void> {
        await expect(this.checkoutButton).toBeVisible();
        await this.checkoutButton.click();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }
}
