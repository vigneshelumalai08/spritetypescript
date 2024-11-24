import { Locator, Page } from '@playwright/test';

export default class ContestPage {
  page: Page;
  elements: { 
    howtoparti: () => Locator;
    leaderboardCTA: () => Locator;
    contestkv: () => Locator;
    rewardpool: () => Locator;
    HowtoGatheComicCoins: () => Locator;
    rewardSrc: () => Locator;
    clickback: () => Locator;
    comiccoin: () => Locator;
    contestclick: () => Locator;
    howtogatehrpoi: () => Locator;
    allhowtogetherpoint: () => Locator;
    text1: () => Locator;
    referpopup: () => Locator;
    haveinvitecode: () => Locator;
    spritebottle: () => Locator;
    bannerDrinkmore: () => Locator;
    enteruniqueCTA: () => Locator;
    saveDetailsInEditProPg: () => Locator;
    ContestPageclick: () => Locator;
    ComicCoinpageclick: () => Locator;
    myprofilepageclick: () => Locator;
    videobanner :()=> Locator;
  };

  constructor(page: Page) {
    this.page = page;

    this.elements = {
      videobanner:()=> this.page.locator(".img-block .react-player video"),
      howtoparti: () => this.page.locator('.slick-slide .CSBharatHomeBanner_1'),
      leaderboardCTA: () => this.page.locator('.tour-leaderboard'),
      contestkv: () => this.page.locator('.slick-slide .CSBharatHomeBanner_2'),
      rewardpool: () => this.page.locator('.s-title').nth(0),
      HowtoGatheComicCoins: () => this.page.locator('.s-title').nth(1),
      rewardSrc: () => this.page.locator('.card-img-top'),
      clickback: () => this.page.locator('.icon-back'),
      comiccoin: () => this.page.locator('.tour-comic .btn-primary'),
      contestclick: () => this.page.locator('.justify-content-center .align-items-center'),
      howtogatehrpoi: () => this.page.locator('.tour-gather-cominc'),
      allhowtogetherpoint: () => this.elements.howtogatehrpoi().locator('.col-xl-4 h3'),
      text1: () => this.page.locator('.tour-gather-cominc .col-xl-4 .pl-2.tour-gather-cominc .col-xl-4 .pl-2 h3'),
      referpopup: () => this.page.locator('.modal-title'),
      haveinvitecode: () => this.page.locator('.modal-title'),
      spritebottle: () => this.page.locator('.contest-bottle'),
      bannerDrinkmore: () => this.page.locator('.contest-banner .text-uppercase'),
      enteruniqueCTA: () => this.page.locator('.contest-banner .btn-primary'),
      saveDetailsInEditProPg: () => this.page.locator('.form-footer > button'),
      ContestPageclick: () => this.page.locator('.col .justify-content-center.Sprite_Contest_button'),
      ComicCoinpageclick: () => this.page.locator('.col .justify-content-center .justify-content-center.wallet'),
      myprofilepageclick: () => this.page.locator('.col .justify-content-center .justify-content-center.profile-tour')
    };
  }
}
