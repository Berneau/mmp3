import { LungauPage } from './app.po';

describe('lungau App', function() {
  let page: LungauPage;

  beforeEach(() => {
    page = new LungauPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
