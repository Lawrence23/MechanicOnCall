import { MechanicOnCallPage } from './app.po';

describe('mechanic-on-call App', function() {
  let page: MechanicOnCallPage;

  beforeEach(() => {
    page = new MechanicOnCallPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
