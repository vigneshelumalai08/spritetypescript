import { test, expect, Page, BrowserContext, Browser,chromium } from '@playwright/test';
import Login from '../pages/01_loginpage';
import * as homedata from '../inputdata/homepage.json';
import HomePages from '../pages/homepage';

let page: Page;
let browser: Browser;
let context: BrowserContext;
let loginpage: Login;
let homepage: HomePages;

test.beforeAll("Launch the site and navigate to homepage", async () => {
    browser = await chromium.launch({ headless: false, channel: 'chrome' });
    context = await browser.newContext({
        storageState: 'session.json',
    });
    page = await context.newPage();
    loginpage = new Login(page);
    homepage =new HomePages(page)
    await loginpage.sitelaunch();
    
});

test.afterAll("Closing the session", async () => {
    await context.close();
    await browser.close();
});

test.beforeEach(async()=>
    {
    
      const homepageURL =page.url();
          if (homepageURL !== homedata.homepageURL) 
          {
          await homepage.elements.clickHome().click();
          }
    })


test.describe("Homepage validation",async()=>
{
    
    test("TC-26- Homepage contest banner validation", async()=>
    {
        let bannerURLvalidate = await homepage.elements.ContestBanner().nth(0).getAttribute('src');
        expect.soft(bannerURLvalidate).toBe(homedata.contestbannerURL);
        await homepage.elements.ContestBanner().nth(0).click();
        let CurrentContestURL=page.url()
        expect.soft(CurrentContestURL).toBe(homedata.contesturl);
        await page.waitForTimeout(2000)
        await homepage.elements.clickHome().click();
    })
    test("TC-26- Pick your mood headeing and subheading  validation",async()=>
        { 
            expect.soft(await homepage.elements.Pickurmood().textContent()).toBe(homedata.pickurmooodtext);
            await page.waitForTimeout(2000);
            expect.soft(await homepage.elements.pichurmoodsubcat().nth(0).textContent()).toBe(homedata.Pickmoodsubhead);
        
        })

    test("TC-27- Pick your mood image and content validation",async()=>
    { 
    const pickutmoodtextt = await homepage.elements.activepickurmood().count();
    const dotcount = await homepage.elements.pickMoodSlickDots().count();
    for (let i = 0; i < dotcount; i++) {
        await homepage.elements.pickMoodSlickDots().nth(i).click();
        for (let j = 0; j < pickutmoodtextt; j++) {
            const timerText = await homepage.elements.activepickurmood().nth(j).textContent();
            const timerText1 = await homepage.elements.moddimg().nth(j).getAttribute('src');
            await page.waitForTimeout(1000);
            switch (timerText) {
                case homedata.Cricket:
                    expect.soft(timerText1).toBe(homedata.CricketsvgURL);
                    break;
                case homedata.Animals:
                    expect.soft(timerText1).toBe(homedata.AnimalssvgURL);
                    break;
                case homedata.Food:
                    expect.soft(timerText1).toBe(homedata.FoodsvgURL);
                    break;
                case homedata.Weddings:
                    expect.soft(timerText1).toBe(homedata.WeddingssvgURl);
                    break;
                case homedata.College:
                    expect.soft(timerText1).toBe(homedata.CollegesvgURl);
                    break;
                case homedata.Office:
                    expect.soft(timerText1).toBe(homedata.OfficesvgURl);
                    break;
                case homedata.Family:
                    expect.soft(timerText1).toBe(homedata.FamilysvgURl);
                    break;
                case homedata.Friends:
                    expect.soft(timerText1).toBe(homedata.FriendssvgURl);
                    break;     
                case homedata.Finance:
                    expect.soft(timerText1).toBe(homedata.FinancesvgURl);
                    break;  
                case homedata.Childhood:
                    expect.soft(timerText1).toBe(homedata.ChildhoodsvgURl);
                    break;     
                case homedata.Relationships:
                    expect.soft(timerText1).toBe(homedata.RelationshipssvgURl);
                    break;     
                case homedata.Self:
                    expect.soft(timerText1).toBe(homedata.SelfsvgURl);
                  break;  
                case homedata.Adulting:
                    expect.soft(timerText1).toBe(homedata.AdultingsvgURL);
                    break;  
                case homedata.Observation:
                    expect.soft(timerText1).toBe(homedata.ObservationsvgURl);
                    break;  
                    
                default:
                    console.log(`Unhandled option: ${timerText}`);
                    break;
        }
    }      
}

    })


    test("TC-28- Comedians' Spotlight heading and sub heading validation",async()=>
        {
            await page.waitForTimeout(2000);
            expect.soft(await homepage.elements.ComediansSpotl().textContent()).toBe(homedata.Comedians)
            expect.soft(await homepage.elements.pichurmoodsubcat().nth(1).textContent()).toBe(homedata.Comedianssubhead);
            await homepage.elements.viewall().nth(0).click();
            const artistPage = page.url();
            await page.waitForTimeout(2000);
            expect.soft(artistPage).toBe(homedata.artistPageURL);
            await homepage.elements.clickback().click();

        })


        test("TC-29- Comedians' Spotlight heading and sub heading validation",async()=>
            {
                await page.waitForTimeout(3000);
                await homepage.artimag();


            })



        test("TC-29 joke box image and content validation",async()=>
            {
                await page.waitForTimeout(2000);
                expect(await homepage.elements.jokebox().textContent()).toBe(homedata.JokeBox);
                expect.soft(await homepage.elements.pichurmoodsubcat().nth(2).textContent()).toBe(homedata.JokeBoxsubhead);
                await homepage.elements.viewall().nth(1).click();
                const jokeBoxPage = page.url();
                await page.waitForTimeout(2000);
                expect.soft(jokeBoxPage).toBe(homedata.UGClistpage);
                await homepage.elements.clickback().click();
        
            })


})