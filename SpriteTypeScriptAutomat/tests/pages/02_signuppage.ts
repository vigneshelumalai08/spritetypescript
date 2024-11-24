import { Page, Locator } from '@playwright/test';

export default class Signuppage {
  page: Page;
  elements: {
    signuptext: () => Locator;
    signupSubhe: () => Locator;
    profilename: () => Locator;
    terms: () => Locator;
    signupsubmit: () => Locator;
    afterloginenteruniwcodeheader: () => Locator;
    entercodetext: () => Locator;
  };

  constructor(page: Page) {
    this.page = page;

    this.elements = {
      signuptext: () => this.page.locator(".s-title"),
      signupSubhe: () => this.page.locator(".s-sub-title"),
      profilename: () => this.page.getByPlaceholder('Full Name'),
      terms: () => this.page.locator("label[for='tnc']"),
      signupsubmit: () => this.page.locator("#Sprite24_Signup_Continue"),
      afterloginenteruniwcodeheader: () => this.page.locator("label[for='UniqueCode']"),
      entercodetext: () => this.page.locator("input[placeholder='Enter Unique Code here']"),
    };
  }
}
