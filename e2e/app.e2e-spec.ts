import { MyMeanLoginPage } from './app.po';

describe('my-mean-login App', () => {
  let page: MyMeanLoginPage;

  beforeEach(() => {
    page = new MyMeanLoginPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
