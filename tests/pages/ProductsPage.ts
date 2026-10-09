
import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;

    readonly pageTitle: Locator;
    readonly inventoryItems: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly sortDropdown: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;
    readonly menuButton: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pageTitle = page.locator('.title');
        this.inventoryItems = page.locator('.inventory_item');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.sortDropdown = page.locator(
            '[data-test="product-sort-container"]'
        );
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');

        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
    }

    async getProductCount(): Promise<number> {
        return await this.inventoryItems.count();
    }

    async getProductNames(): Promise<string[]> {
        return await this.productNames.allTextContents();
    }

    async getProductPrices(): Promise<string[]> {
        return await this.productPrices.allTextContents();
    }

    async addProduct(productName: string): Promise<void> {
        const product = this.inventoryItems.filter({
            has: this.page.locator('.inventory_item_name', {
                hasText: productName
            })
        });

        await product.getByRole('button', {
            name: 'Add to cart'
        }).click();
    }

    async removeProduct(productName: string): Promise<void> {
        const product = this.inventoryItems.filter({
            has: this.page.locator('.inventory_item_name', {
                hasText: productName
            })
        });

        await product.getByRole('button', {
            name: 'Remove'
        }).click();
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }

    async getCartCount(): Promise<number> {
        if (await this.cartBadge.count() === 0) {
            return 0;
        }

        return Number(await this.cartBadge.innerText());
    }

    async sortProducts(option: string): Promise<void> {
        await this.sortDropdown.selectOption(option);
    }

    async logout(): Promise<void> {
        await this.menuButton.click();

        await this.logoutLink.waitFor({
            state: 'visible',
            timeout: 10000
        });

        await this.logoutLink.click();

        await expect(this.page.locator('[data-test="username"]'))
            .toBeVisible();
    }
}