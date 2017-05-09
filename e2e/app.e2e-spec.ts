import { CheapFlightsPage } from './app.po';

describe('cheap-flights App', () => {
  let page: CheapFlightsPage;

  beforeEach(() => {
    page = new CheapFlightsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
