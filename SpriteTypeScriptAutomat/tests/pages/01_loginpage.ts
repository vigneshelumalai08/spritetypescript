import { Locator, Page } from '@playwright/test';
import * as launch from '../inputdata/login.json';

export default class Login {
  page: Page;
  elements: {
    LoginToUnlockText: () => Locator;
    EnterUniquecodepopup: () => Locator;
    LockHeaderText: () => Locator;
    LockSubheaderText: () => Locator;
    NoteTextLockpopup: () => Locator;
    SpriteGifSrc: () => Locator;
    UniquePopUpclose: () => Locator;
    BurgurMenu: () => Locator;
    ClickLoginBurger: () => Locator;
    LoginText: ()=>  Locator;
    LoginHeaderText: ()=>  Locator;
    LoginSubHeaderText: ()=>  Locator;
    GetOTPcta: ()=>  Locator;
    mobileTextBox: ()=> Locator;
    invalidMobilenumbererroe: ()=> Locator;
    OtpHeadertext:  ()=> Locator;
    OtpSubheadertext :  ()=> Locator;
    OtpGifSrc:  ()=> Locator;
    OtpSubmitCta:()=> Locator;
    OtpTextBox:()=>Locator;
    invalidOtpError:()=> Locator;
    
  };

  constructor(page: Page) {
    this.page = page;

    this.elements = {
      LoginToUnlockText: () => this.page.locator(".modal-unique-code .justify-content-center"),
      EnterUniquecodepopup: () => this.page.locator(".modal-content.overflow-hidden-n"),
      LockHeaderText: () => this.page.locator(".modal-unique-code label"),
      LockSubheaderText: () => this.page.locator(".modal-unique-code .modal-subcontent"),
      NoteTextLockpopup: () => this.page.locator(".modal-unique-code .font-weight-normal"),
      SpriteGifSrc: () => this.page.locator(".modal-unique-code .d-block"),
      UniquePopUpclose: () => this.page.locator(".modal-content .modal-header .close"),
      BurgurMenu: ()=> this.page.locator(".container-fluid .navbar-toggler-icon "),
      ClickLoginBurger:()=> this.page.locator(".w-100 .btn-lg"),
      LoginText:()=> this.page.locator(".container-fluid .s-title"),
      LoginHeaderText:()=>this.page.locator(".s-header .modal-heading-title.mb-2"),
      LoginSubHeaderText:()=> this.page.locator(".container-fluid .modal-subcontent"),
      GetOTPcta:()=> this.page.locator(".overflow-hidden-n .SpriteGetOTP"),
      mobileTextBox:()=> this.page.locator(".form-group  .form-control "),
      invalidMobilenumbererroe:()=> this.page.locator(".form-group  .text-danger"),
      OtpHeadertext: ()=> this.page.locator(".s-header .container-fluid .s-title"),
      OtpSubheadertext: ()=> this.page.locator(".container-fluid .s-sub-title.sm"),
      OtpGifSrc:()=> this.page.locator(".modal-content .bottle.d-block "),
      OtpSubmitCta: ()=> this.page.locator(".modal-content .form-footer .Sprite24_Submit_OTP"),
      OtpTextBox:()=>this.page.locator(".form-group .form-control"),
      invalidOtpError:()=> this.page.locator(".form-group .text-danger")
    };
  }

  async sitelaunch() {
    await this.page.goto(launch.launchURL);
  }

  async contestLaunch()
  {
    await this.page.goto(launch.ContestURL);

  }
  

  async BLuniqueCodePopup() {
    try {
      const isPopupVisible = await this.elements.EnterUniquecodepopup().isVisible();
      
      if (!isPopupVisible) {
        await this.elements.BurgurMenu().click();
        await this.elements.ClickLoginBurger().click();
      } 
      else {
        await this.elements.LoginToUnlockText().click();
      }
  
    } catch (error) {
      console.error("Error in BLuniqueCodePopup method:", error);
    }
  } 
  
  async backtoLoginPop() {
    try {
      const isPopupVisible = await this.elements.EnterUniquecodepopup().isVisible();
      if (isPopupVisible) {
        await this.elements.LoginToUnlockText().click();
      }else
      {
        await this.sitelaunch();
      }
    } catch{
      console.log("as expected");
    }

}

  async enterMobileNumber(num: number | string)
    {
      await this.elements.mobileTextBox().fill(num.toString());    
    }

    async OtpBox(otp)
    {
      await this.elements.OtpTextBox().fill(otp);
    }
}
