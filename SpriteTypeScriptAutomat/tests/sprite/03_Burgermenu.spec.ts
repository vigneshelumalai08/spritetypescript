import { test, expect, Page, BrowserContext, Browser,chromium } from '@playwright/test';
import Login from '../pages/01_loginpage';
import Signuppage from '../pages/02_signuppage';
import Burguremenu from '../pages/03_Burgermenu';
import * as  Burger from '../inputdata/burgur.json';
import ContestPage from '../pages/04_conntestpage';
import * as contestdata from '../inputdata/contest.json';

let page: Page;
let browser: Browser;
let context: BrowserContext;
let loginpage: Login;
let Signup: Signuppage;
let burgerMenuFunction: Burguremenu;
let contestpage:ContestPage;



test.beforeAll("Launch the site and navigate to homepage", async () => {
    browser = await chromium.launch({ headless: false, channel: 'chrome' });
    context = await browser.newContext({
        storageState: 'session.json',
    });
    page = await context.newPage();
    loginpage = new Login(page);
    Signup= new Signuppage(page)
    burgerMenuFunction=new Burguremenu(page)
    await loginpage.sitelaunch();
    contestpage=new ContestPage(page)
    
});

test.afterAll("Closing the session", async () => {
    await context.close();
    await browser.close();
});


test.describe("Login,signup,Enter uniquecode ",async()=>
    {

test("TC-12-Close Enter code pop up",async()=>
    {
      
      await burgerMenuFunction.popupclose();
      await burgerMenuFunction.elements.enterUniquCodeicon().click();
      await burgerMenuFunction.elements.closeUniquePopUp().click();    
    })
test("TC-13-Burger_Menu_Click_burger_menu and validate all the text in the burger menu",async()=>
        {
          await page.pause();
      await burgerMenuFunction.elements.enterUniquCodeicon().click();
      await burgerMenuFunction.popupclose();
      await burgerMenuFunction.elements.clickBurgerMenu().click();
      const homeCtaText= await burgerMenuFunction.elements.burgerMidSect().nth(0).textContent();
      expect.soft(homeCtaText).toBe(Burger.homeText);
      const contestCtaText= await burgerMenuFunction.elements.burgerMidSect().nth(1).textContent();
      expect.soft(contestCtaText).toBe(Burger.contestText);
      const countexplo =await burgerMenuFunction.elements.Explorothermene().count();
      for(let i=0;i<countexplo;i++)
        {
          const textContent = await burgerMenuFunction.elements.Explorothermene().nth(i).textContent();
          console.log(textContent);
          expect(await burgerMenuFunction.elements.Explorothermene().nth(0).textContent()).toBe(Burger.Comedians);
          expect(await burgerMenuFunction.elements.Explorothermene().nth(1).textContent()).toBe(Burger.Challenge);
          expect(await burgerMenuFunction.elements.Explorothermene().nth(2).textContent()).toBe(Burger.Pickyourmood);
          expect(await burgerMenuFunction.elements.Explorothermene().nth(3).textContent()).toBe(Burger.JokeBox);
          expect(await burgerMenuFunction.elements.Explorothermene().nth(4).textContent()).toBe(Burger.HALLOFLAME);
          expect(await burgerMenuFunction.elements.Explorothermene().nth(5).textContent()).toBe(Burger.ReferAFriend);
          expect.soft(await burgerMenuFunction.elements.Explorothermene().nth(6).textContent()).toBe(Burger.HaveanInviteCode);
          expect.soft(await burgerMenuFunction.elements.Explorothermene().nth(7).textContent()).toBe(Burger.Voteforthefunniest);
          expect.soft( await burgerMenuFunction.elements.burgerMidSect().nth(3).textContent()).toBe(Burger.ContactUs);
          expect.soft( await burgerMenuFunction.elements.burgerMidSect().nth(4).textContent()).toBe(Burger.FAQs);
          expect.soft( await burgerMenuFunction.elements.burgerMidSect().nth(5).textContent()).toBe(Burger.TermsConditions);
          expect.soft( await burgerMenuFunction.elements.burgerMidSect().nth(6).textContent()).toBe(Burger.PrivacyPolicy);
          
        }
        await burgerMenuFunction.elements.burgerMidSect().nth(0).click();  
      
      })

      test("TC-14-Enter one Empty unique code for validation",async()=>
        {
          await burgerMenuFunction.popupclose();
          await burgerMenuFunction.elements.enterUniquCodeicon().click();
          await burgerMenuFunction.elements.uniqueCodeTextBox().fill(" ");
          await burgerMenuFunction.elements.uniqueCodeSubmit().click();
          await page.waitForTimeout(2000)
          expect.soft(burgerMenuFunction.elements.Emptyuniqueerror()).toHaveText(Burger.emptyError);

            
        })

        test("TC-15-Enter one Used unique code for validation",async()=>
          { 
              await page.reload();
              await page.waitForTimeout(2000)
              await burgerMenuFunction.popupclose();
              const contestPageUrl = page.url();
              if (contestPageUrl !== contestdata.contesturl) {
                await contestpage.elements.ContestPageclick().click();
              }
              await contestpage.elements.enteruniqueCTA().click();
              // await burgerMenuFunction.elements.enterUniquCodeicon().click();
              await burgerMenuFunction.elements.uniqueCodeTextBox().fill(Burger.UsedcodeUnique);
              await burgerMenuFunction.elements.uniqueCodeSubmit().click();
              await page.waitForTimeout(2000)
              const Usedcodelimit = await burgerMenuFunction.elements.aftersixcodeenteredexpectedPopup().isVisible();
              if (Usedcodelimit) {
              console.log('5 attempts done');
              await burgerMenuFunction.popupclose();
              }
          })

        test("TC-16-Enter two Invalid unique code for validation",async()=>
          {
            await page.reload();
            await page.waitForTimeout(2000)
            await  burgerMenuFunction.elements.enterUniquCodeicon().click();
            for (let i=0;i<=2;i++)
              {
                await burgerMenuFunction.elements.uniqueCodeTextBox().clear();
                const randomString = burgerMenuFunction.generateRandomString(10);
                await burgerMenuFunction.elements.uniqueCodeTextBox().fill(await randomString);
                await burgerMenuFunction.elements.uniqueCodeSubmit().click();
                await page.waitForTimeout(2000)
                const isPopupVisible = await burgerMenuFunction.elements.aftersixcodeenteredexpectedPopup().isVisible();
                if (isPopupVisible) {
                  console.log('5 attempts done');
                  await burgerMenuFunction.popupclose();
                break; 
                }
                await page.waitForTimeout(1000)
                expect.soft(burgerMenuFunction.elements.Emptyuniqueerror()).toHaveText(Burger.invalidErrorcode);
                await burgerMenuFunction.popupclose();
                await burgerMenuFunction.elements.enterUniquCodeicon().click();
                
              }
          })
        


})
       

