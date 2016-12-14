import { browser, element, by } from 'protractor';

describe('Payment Page', () => {

  it('should have an active purchase button with valid form', async () => {

    browser.get('./');

    element(by.css('input')).sendKeys('1111222233334444');

    const purchaseButton = element(by.css('button'));

    const result = await purchaseButton.getAttribute('disabled');

    expect(result).toBeFalsy();

  });
});
