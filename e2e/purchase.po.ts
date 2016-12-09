import { browser, element, by } from 'protractor';

export class PurchasePage {
  static async navigateTo() {
    return await browser.get('/');
  }

  static getInput(selector: string) {
    return element(by.css(selector));
  }

  static getPurchaseButton() {
    return element(by.css('button'));
  }

  static async getInputText(selector: string) {
    return await element(by.css(selector)).getAttribute('value');
  }

  static async getPurchaseButtonDisabledAttr() {
    return await this.getPurchaseButton().getAttribute('disabled');
  }
}
