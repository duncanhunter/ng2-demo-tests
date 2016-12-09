import { FirebootcampAngularTestingPage } from './app.po';

describe('firebootcamp-angular-testing App', function() {
  let page: FirebootcampAngularTestingPage;

  beforeEach(() => {
    page = new FirebootcampAngularTestingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
