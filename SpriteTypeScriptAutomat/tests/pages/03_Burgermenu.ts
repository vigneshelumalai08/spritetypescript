import { Page, Locator } from '@playwright/test';

export default class Burguremenu {
  page: Page;
  elements: {
    closeUniquePopUp: () => Locator;
    clickBurgerMenu: () => Locator;
    burgerMidSect: () => Locator;
    homeBtn: () => Locator;
    ContestBtn: () => Locator;
    ExplorBtn: () => Locator;
    Explorothermene: () => Locator;
    leaderboardCTA: () => Locator;
    EnterUniquecodepopup: () => Locator;
    enterUniquCodeicon:()=> Locator;
    uniqueCodeTextBox:()=> Locator;
    uniqueCodeSubmit:()=> Locator;
    Emptyuniqueerror:()=> Locator;
    aftersixcodeenteredexpectedPopup:()=> Locator;
  };

  constructor(page: Page) {
    this.page = page;

    this.elements = {
        closeUniquePopUp: () => this.page.locator(".overflow-hidden-n .modal-header .close"),
        clickBurgerMenu: ()=> this.page.locator(".navbar-toggler-icon"),
        burgerMidSect: ()=> this.page.locator(".offcanvas-menu .navbar-nav .nav-item"),
        homeBtn:()=> this.elements.burgerMidSect().locator(".nav-item").nth(0),
        ContestBtn:()=> this.elements.burgerMidSect().locator(".nav-item").nth(1),
        ExplorBtn:()=> this.elements.burgerMidSect().locator(".nav-item").nth(2),
        Explorothermene:()=> this.page.locator(".offcanvas-menu .navbar-nav .nav-item .dropdown-item "),
        leaderboardCTA: ()=> this.page.locator(".tour-leaderboard"),
        EnterUniquecodepopup: () => this.page.locator(".modal-content.overflow-hidden-n"),
        enterUniquCodeicon: ()=> this.page.locator(".unique_code .justify-content-center"),
        uniqueCodeTextBox:()=> this.page.locator(".form-group .form-control"),
        uniqueCodeSubmit:()=> this.page.locator(".form-footer .btn-primary"),
        Emptyuniqueerror:()=> this.page.locator(".form-group .text-danger"),
        aftersixcodeenteredexpectedPopup:()=> this.page.locator(".unique-code-limit")

    };
  }
  async popupclose()
  {
    const isPopupVisible = await this.elements.EnterUniquecodepopup().isVisible();
      
      if (isPopupVisible)
        {
          await this.elements.closeUniquePopUp().click();
        }

  }

  async generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }
}
