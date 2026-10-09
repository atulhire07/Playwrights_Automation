
import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;

    readonly pageTitle: Locator;

    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;

    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly finishButton: Locator;
    readonly backHomeButton: Locator;

    readonly errorMessage: Locator;
    readonly completeMessage: Locator;
    readonly completeText: Locator;

    readonly summaryItems: Locator;
    readonly subtotal: Locator;
    readonly tax: Locator;
    readonly total: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pageTitle = page.locator('.title');

        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');

        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');

        this.errorMessage = page.locator('[data-test="error"]');
        this.completeMessage = page.locator('.complete-header');
        this.completeText = page.locator('.complete-text');

        this.summaryItems = page.locator('.cart_item');

        // Correct SauceDemo checkout overview selectors
        this.subtotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
    }

    async enterCustomerDetails(
        firstName: string,
        lastName: string,
        postalCode: string
    ): Promise<void> {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async continue(): Promise<void> {
        await this.continueButton.click();
    }

    async cancel(): Promise<void> {
        await this.cancelButton.click();
    }

    async finish(): Promise<void> {
        await this.finishButton.click();
    }

    async backToProducts(): Promise<void> {
        await this.backHomeButton.click();
    }
}
