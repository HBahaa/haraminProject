import { EvaraProjectPage } from './app.po';

describe('evara-project App', () => {
  let page: EvaraProjectPage;

  beforeEach(() => {
    page = new EvaraProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
