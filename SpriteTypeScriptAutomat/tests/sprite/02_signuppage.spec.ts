import { test, expect, Page, BrowserContext, Browser,chromium } from '@playwright/test';
import Login from '../pages/01_loginpage';
import * as userdata from '../inputdata/userdata.json';
import Signuppage from '../pages/02_signuppage';
import * as signupdate from '../inputdata/signup.json';
import Burguremenu from '../pages/03_Burgermenu';

let page: Page;
let browser: Browser;
let context: BrowserContext;
let loginpage: Login;
let Signup: Signuppage;
let burgerMenuFunction: Burguremenu;


test.beforeAll("Launch the site and navigate to homepage", async () => {
    browser = await chromium.launch({ headless: false, channel: 'chrome' });
    context = await browser.newContext();
    page = await context.newPage();
    loginpage = new Login(page);
    Signup= new Signuppage(page);
    burgerMenuFunction=new Burguremenu(page);
    await loginpage.sitelaunch();
    
});

test.afterAll("Closing the session", async () => {
    await context.close();
    await browser.close();
});


test.describe("Login,signup",async()=>
    {

test("TC-10_ogin with valid OTP",async()=>
            { 
                await loginpage.sitelaunch();
                await loginpage.elements.LoginToUnlockText().click();
                await loginpage.enterMobileNumber(userdata.mobileNumber);
                await loginpage.elements.GetOTPcta().click();
                await page.pause();
                // await loginpage.elements.OtpSubmitCta().click();
                await page.waitForTimeout(3000)
                const jwdtoken1=await page.evaluate(() => localStorage.getItem("token"));
                const jwdtoken2=await page.evaluate(() => localStorage.getItem("userId"));
                  console.log(jwdtoken2)
                  if (jwdtoken1 === null || jwdtoken1 === undefined)
                      {
                        
                        console.log("New User")
                       
                        expect.soft(await Signup.elements.signupSubhe().textContent()).toBe(signupdate.subheadesignup);
                        expect.soft(await Signup.elements.signuptext().textContent()).toBe(signupdate.signup);
                        await Signup.elements.profilename().fill(userdata.profilename);
                        await Signup.elements.terms().click();
                        await page.waitForTimeout(3000)
                        expect.soft(Signup.elements.signupsubmit().isEnabled).toBe(true);
                        await Signup.elements.signupsubmit().click();
                        await page.waitForTimeout(8000)
                        await burgerMenuFunction.elements.closeUniquePopUp().click();
                        await page.waitForTimeout(45000)
                        await context.storageState({ path: 'session.json' });
            
                      }else
                      {
                        console.log("Existing User")
                        await burgerMenuFunction.elements.closeUniquePopUp().click();
                        await page.waitForTimeout(5000)
                         await context.storageState({ path: 'session.json' });
                      }      
            })

test("TC-11-Login and Validate New User or Existing User",async()=>
                {
                  await page.waitForTimeout(3000)
                  const jwdtoken1=await page.evaluate(() => localStorage.getItem("token"));
                  const jwdtoken2=await page.evaluate(() => localStorage.getItem("userId"));
                  console.log(jwdtoken2)
                  if (jwdtoken1 === null || jwdtoken1 === undefined)
                      {
                        
                        console.log("New User")
                       
                        expect.soft(await Signup.elements.signupSubhe().textContent()).toBe(signupdate.subheadesignup);
                        expect.soft(await Signup.elements.signuptext().textContent()).toBe(signupdate.signup);
                        await Signup.elements.profilename().fill(userdata.profilename);
                        await Signup.elements.terms().click();
                        expect.soft(Signup.elements.signupsubmit().isEnabled).toBe(true);
                        await Signup.elements.signupsubmit().click();
                        await page.waitForTimeout(45000)
                        await context.storageState({ path: 'session.json' });
            
                      }else
                      {
                        console.log("Existing User")
                      }
          
                      await page.waitForTimeout(3000)
              })
    })
