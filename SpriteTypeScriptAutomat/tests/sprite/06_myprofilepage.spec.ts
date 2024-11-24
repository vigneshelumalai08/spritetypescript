import { test, expect, Page, BrowserContext, Browser,chromium } from '@playwright/test';
import Login from '../pages/01_loginpage';
import Signuppage from '../pages/02_signuppage';
import Burguremenu from '../pages/03_Burgermenu';
import ContestPage from '../pages/04_conntestpage';
import Comiccoin from '../pages/05_comiccoinpage';
import ProfilePage from '../pages/06_myprofile';
import * as profile from '../inputdata/myprofile.json'
import * as contestdata from '../inputdata/contest.json';
import * as userdata from '../inputdata/userdata.json';

let page: Page;
let browser: Browser;
let context: BrowserContext;
let loginpage: Login;
let Signup: Signuppage;
let burgerMenuFunction: Burguremenu;
let contestpage:ContestPage;
let Comiccoinpage: Comiccoin;
let profilepage: ProfilePage;


test.beforeAll("Launch the site and navigate to homepage", async () => {
    browser = await chromium.launch({ headless: false, channel: 'chrome' });
    context = await browser.newContext({
        storageState: 'session.json',
    });
    page = await context.newPage();
    loginpage = new Login(page);
    Signup= new Signuppage(page);
    burgerMenuFunction=new Burguremenu(page);
    contestpage=new ContestPage(page);
    Comiccoinpage=new Comiccoin(page);
    profilepage=new ProfilePage(page)
    await loginpage.sitelaunch();
    
});

test.afterAll("Closing the session", async () => {
    await context.close();
    await browser.close();
});

test.beforeEach(async()=>
    {
    
      const Profilefooterlink =page.url();
          if (Profilefooterlink !== profile.myprofile) 
          {
          await profilepage.elements.myprofilepageclick().click();
          }
    
    })

test.describe(async()=>
    {

        test("TC-22-Profile page header timer validation", async () => {
            expect(await profilepage.elements.announcingtext().textContent()).toBe(profile.anoncing);
            let timerContent = await profilepage.elements.timercount().count();
            let timerContext = profilepage.elements.timercount();
            for (let i = 0; i < timerContent; i++) {
                const timerText = await timerContext.nth(i).textContent();
               console.log(timerText);
            }
        });
        test("TC-22-Profile informatction Edit and update", async () => {
            
            const profileExitIconSrc = await profilepage.elements.clickprofileexiticon().getAttribute('src');
            expect(profileExitIconSrc).toBe(profile.profileediticon);
            await profilepage.elements.clickprofileexiticon().click();
            const nameValue = await profilepage.elements.formtextbox().nth(0).inputValue();
            const nameTextbox = profilepage.elements.formtextbox().nth(0);
            if (nameValue === '') {
              await nameTextbox.fill(profile.profilename);
            } else {
              console.log(`Name field is already filled with: ${nameValue}`);
            }
            const emailValue = await profilepage.elements.formtextbox().nth(2).inputValue();
            const emailTextbox = profilepage.elements.formtextbox().nth(2);
            if (emailValue === '') {
              await emailTextbox.fill(profile.email);
            } else {
              console.log(`Email field is already filled with: ${emailValue}`);
            }
          
            const dobValue = await profilepage.elements.formtextbox().nth(3).inputValue();
            if (dobValue === '') {
              await profilepage.elements.userDOBInProEditPg().click();
              await profilepage.elements.userDOBInProEditPg().clear();
              await profilepage.elements.yearPicker().selectOption({ label: profile.year });
              await profilepage.elements.monthPicker().selectOption({ label: profile.month });
              await profilepage.elements.dayPicker().nth(0).click();
            } else {
              console.log(`DOB field is already filled with: ${dobValue}`);
            }
            await profilepage.elements.userGenderInProEditPg().selectOption({ label: profile.gender });
            await page.waitForTimeout(5000);
            await profilepage.elements.saveDetailsInEditProPg().click();
          });
 
          test("TC-23 - Adding address: If address is already added, remove the old one and add a new address", async () => {
            await page.waitForTimeout(3000);
            expect.soft(await profilepage.elements.Addrestextvali().textContent()).toBe(profile.Address);
            let addCTAstatusf = profilepage.elements.addctastatus();
            let isEnabled = await addCTAstatusf.evaluate((el: HTMLButtonElement) => !el.disabled);
            console.log(isEnabled)
            if (!isEnabled)
              {
                let CountforCheckbox= await profilepage.elements.Checkboxprofile().count();
                
                for(let i=0;i<CountforCheckbox; i++)
                  {
                    let verifycheckbox=await profilepage.elements.Checkboxprofile().nth(i).isChecked();
                   
                    if(!verifycheckbox)
                      {
                        await profilepage.elements.addressdeleteicon().nth(i).click();
                        await page.waitForTimeout(3000);
                        await addCTAstatusf.click();
                        const addressFieldCount = profilepage.elements.addressfill().locator('input');
                        await addressFieldCount.nth(0).fill(profile.street);
                        await addressFieldCount.nth(1).fill(profile.CityName);
                        await addressFieldCount.nth(4).fill(profile.pincode);
                        await page.waitForTimeout(5000);
                        await profilepage.elements.saveaddress().click();
                        await page.waitForTimeout(3000);
                        break;
                      }
                  }
                }else
                {
                            await addCTAstatusf.click();
                            const addressFieldCount = profilepage.elements.addressfill().locator('input');
                            await addressFieldCount.nth(0).fill(profile.street);
                            await addressFieldCount.nth(1).fill(profile.CityName);
                            await addressFieldCount.nth(4).fill(profile.pincode);
                            await page.waitForTimeout(5000);
                            await profilepage.elements.saveaddress().click();
                            await page.waitForTimeout(3000);
              }
          
              let myprofile = page.url();
              expect.soft(myprofile).toBe(contestdata.myprofile)

    
          });
          test("TC-24 - Check the refer buton and click",async()=>
          {
            try {
              const checkref: boolean = await profilepage.elements.clickrefer1().isVisible();
 
              if (checkref) {
                  await profilepage.elements.clickrefer1().click();
                  let popupText: string |null = await profilepage.elements.referpopuptext().textContent();
                  expect(popupText).toContain(profile.Brocodewefollow);
              } else {
                  await profilepage.elements.referanother().click();
                  let popupText: string |null= await profilepage.elements.referpopuptext().textContent();
                  expect(popupText).toContain(profile.Brocodewefollow);
              }
          } catch (error) {
              console.log("Popup not found");
          }
          })
          test("TC-25 - Refer new,own alredy Exist number  ",async()=>
            {
            await page.waitForTimeout(2000);
            await profilepage.fillMobileNumber(Number(userdata.refertype), String(userdata.mobileNumber));
            await profilepage.elements.clicksubmitbutton().click();
            await page.waitForTimeout(5000)
            await profilepage.referdpopupenabled();
            await burgerMenuFunction.popupclose();
            })
        

    })