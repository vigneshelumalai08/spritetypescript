import { test, expect, Page, BrowserContext, Browser,chromium } from '@playwright/test';
import Login from '../pages/01_loginpage';
import * as logindata from '../inputdata/login.json';
import * as userdata from '../inputdata/userdata.json';

let page: Page;
let browser: Browser;
let context: BrowserContext;
let loginpage: Login;

test.beforeAll("Launch the site and navigate to homepage", async () => {
    browser = await chromium.launch({ headless: false, channel: 'chrome' });
    context = await browser.newContext();
    page = await context.newPage();
    loginpage = new Login(page);
    await loginpage.sitelaunch();
    
});

test.afterAll("Closing the session", async () => {
    await context.close();
    await browser.close();
});

test.beforeEach("",async()=>

    {
        await loginpage.sitelaunch();
        
    
    })

test.describe("LoginGroup", () => {

    test("TS-1_Verify 'Enter Unique Code' Popup with Lock Icon on Landing Page", async () => {
        expect.soft(loginpage.elements.LoginToUnlockText()).toHaveText(logindata.LoginToUnlockText);
        expect.soft(loginpage.elements.LockHeaderText()).toHaveText(logindata.headerTextLock);
        expect.soft(loginpage.elements.LockSubheaderText()).toHaveText(logindata.SubHeaderTextLock);
        expect.soft(loginpage.elements.NoteTextLockpopup()).toHaveText(logindata.NoteTextValidate);
        expect.soft(loginpage.elements.SpriteGifSrc().getAttribute('src')).resolves.toBe(logindata.SpriteLockGifSrc);

    });

    test("TS-2_Verify Navigation to Content Page After Closing 'Enter Code' Popup", async () => {
        await loginpage.elements.UniquePopUpclose().click();
        const Aftercloseentercode = page.url();
        expect(Aftercloseentercode).toBe(logindata.contentURLBefoerLogin);
    });


    test("TS-3_Verify Navigation to Login Popup on Clicking 'Login to Unlock' CTA",async()=>
        {
            await loginpage.sitelaunch();
            await loginpage.BLuniqueCodePopup();
        });

    test("TC-4 - Check the images and text in login popup",async()=>
            {  
                
                let LoginToUnlockCTA=await loginpage.elements.LoginToUnlockText().isVisible();
                if(!LoginToUnlockCTA)
                    {
                     expect.soft(loginpage.elements.LoginText()).toHaveText(logindata.LoginTextVali);
                     expect.soft(loginpage.elements.LoginHeaderText()).toHaveText(logindata.LoginheaderText);
                     expect.soft(loginpage.elements.LoginSubHeaderText()).toHaveText(logindata.LoginSubHeaderText);
                       
                    }else
                    {
                     await loginpage.elements.LoginToUnlockText().click();
                     expect.soft(loginpage.elements.LoginText()).toHaveText(logindata.LoginTextVali);
                     expect.soft(loginpage.elements.LoginHeaderText()).toHaveText(logindata.LoginheaderText);
                     expect.soft(loginpage.elements.LoginSubHeaderText()).toHaveText(logindata.LoginSubHeaderText);
                    }
                
            })
    test("TC-5 - Check the empty mobile number",async()=>
            {   
                
                let LoginToUnlockCTA=await loginpage.elements.LoginToUnlockText().isVisible();
                if(!LoginToUnlockCTA)
                    {
                        await loginpage.elements.GetOTPcta().click();

                    }else
                    {
                        await loginpage.elements.LoginToUnlockText().click();
                        await loginpage.elements.GetOTPcta().click();
                    }


            })
     test("TC-6- Check the invalid mobile number with alphabets",async()=>
                {
                    
                    let LoginToUnlockCTA=await loginpage.elements.LoginToUnlockText().isVisible();
                    
                    if(!LoginToUnlockCTA)
                        {
                            await loginpage.elements.mobileTextBox().click()
                            await loginpage.enterMobileNumber(userdata.invalidMobileNumberwithAlpha);
                            expect.soft(loginpage.elements.mobileTextBox()).toHaveValue('');
                            expect(loginpage.elements.invalidMobilenumbererroe()).toHaveText(logindata.invalidMobileNumbererror);
                            await loginpage.elements.GetOTPcta().click();
                        }else
                        {

                            await page.waitForTimeout(2000)
                            await loginpage.elements.LoginToUnlockText().click();
                            await loginpage.elements.mobileTextBox().click()
                            await loginpage.enterMobileNumber(userdata.invalidMobileNumberwithAlpha);
                            expect.soft(loginpage.elements.mobileTextBox()).toHaveValue('');
                            await loginpage.elements.GetOTPcta().click();
                            expect.soft(loginpage.elements.invalidMobilenumbererroe()).toHaveText(logindata.invalidMobileNumbererror);
                            
                        }
    
    
                })


    test("TC-7-Check the invalid mobile number",async()=>
                    {
                        
                        let LoginToUnlockCTA=await loginpage.elements.LoginToUnlockText().isVisible();
                        if(LoginToUnlockCTA)
                            {
                                await loginpage.elements.LoginToUnlockText().click();
                                await loginpage.enterMobileNumber(userdata.invalidMobileNumber);
                                await loginpage.elements.GetOTPcta().click();
                                expect.soft(loginpage.elements.invalidMobilenumbererroe()).toHaveText(logindata.invalidMobileNumbererror);
                            
                            }else
                            {
                                await loginpage.enterMobileNumber(userdata.invalidMobileNumber);
                                await loginpage.elements.GetOTPcta().click();
                                expect.soft(loginpage.elements.invalidMobilenumbererroe()).toHaveText(logindata.invalidMobileNumbererror);
                            }
                    })

        test("TC8 - Check the valid mobile number and check the text and images in OTP page",async()=>
                        {
                                await loginpage.elements.LoginToUnlockText().click();
                                await loginpage.enterMobileNumber(userdata.mobileNumber);
                                await loginpage.elements.GetOTPcta().click();
                                await page.waitForTimeout(4000)
                                expect.soft(loginpage.elements.OtpHeadertext()).toHaveText(logindata.OtpHeaderText);
                                let subheadertext=await loginpage.elements.OtpSubheadertext().textContent();
                                expect.soft(subheadertext).toBe(logindata.Otpsubheadertext);
                                let bottlesrc=await loginpage.elements.OtpGifSrc().getAttribute('src');
                                expect.soft(bottlesrc).toBe(logindata.OtpGifsrc);
                                expect.soft(loginpage.elements.OtpSubmitCta()).toBeEnabled();
                                expect.soft(loginpage.elements.OtpSubmitCta()).toHaveText(logindata.submitOtp);
 
                        })
            


            test("TC9 - Check the empty OTP and invalid OTP",async()=>
                            {
                                await loginpage.elements.LoginToUnlockText().click();
                                await loginpage.enterMobileNumber(userdata.mobileNumber);
                                await loginpage.elements.GetOTPcta().click();
                                await page.waitForTimeout(2000)
                                await loginpage.elements.OtpSubmitCta().click();
                                expect.soft(loginpage.elements.invalidOtpError()).toHaveText(logindata.InvalidOtpError);
                                await page.waitForTimeout(1000);
                                await page.reload();
                                expect.soft(loginpage.elements.OtpTextBox()).toBeEditable();
                                await loginpage.OtpBox(userdata.invalidOTP);
                                await loginpage.elements.OtpSubmitCta().click();
                                await page.waitForTimeout(2000);
                                
                            })



});
