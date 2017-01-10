import { PhCardsPage } from './app.po';

describe('ph-cards App', function() {
  let page: PhCardsPage;

  beforeEach(() => {
    page = new PhCardsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
