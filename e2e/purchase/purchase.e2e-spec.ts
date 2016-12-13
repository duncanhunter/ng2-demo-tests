import { PurchasePage } from './purchase.po';
import { browser } from 'protractor';

beforeEach(async () => {
  await PurchasePage.navigateTo();
});

describe('Payment Page', () => {

  it('should have an active purchase button with valid form', async () => {

    PurchasePage.getInput('input').sendKeys('1111222233334444');

    const purchaseButton = PurchasePage.getPurchaseButton();

    expect(await purchaseButton.getAttribute('disabled')).toBeFalsy();

  });
});
