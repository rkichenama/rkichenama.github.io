import { RichardKichenamaPage } from './app.po';

describe('richard-kichenama App', function() {
  let page: RichardKichenamaPage;

  beforeEach(() => {
    page = new RichardKichenamaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
