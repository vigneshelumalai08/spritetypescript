import { test, expect, Page, BrowserContext, Browser,chromium, Locator } from '@playwright/test';
import Login from '../pages/01_loginpage';
import Signuppage from '../pages/02_signuppage';
import Burguremenu from '../pages/03_Burgermenu';
import ContestPage from '../pages/04_conntestpage';
import * as contestdata from '../inputdata/contest.json';

let page: Page;
let browser: Browser;
let context: BrowserContext;
let loginpage: Login;
let Signup: Signuppage;
let burgerMenuFunction: Burguremenu;
let contestpage:ContestPage;


let contestTestUrl:string;
let ugcPageUrl1:string;
let contestUrl2:string;
let voteForAJokeUrl:string;
let contestUrl4:string;
let referPopupText:string | null;
let inviteBtn:Locator;
let referPopupTexts:string | null;
let profilePageUrl:string;
let allFooterMenuText:string | null;


test.beforeAll("Launch the site and navigate to homepage", async () => {
    browser = await chromium.launch({ headless: false, channel: 'chrome' });
    context = await browser.newContext({
        storageState: 'session.json',
    });
    page = await context.newPage();
    loginpage = new Login(page);
    Signup= new Signuppage(page)
    burgerMenuFunction=new Burguremenu(page)
    contestpage=new ContestPage(page)
    await loginpage.sitelaunch();
    
});

test.afterAll("Closing the session", async () => {
    await context.close();
    await browser.close();
});


test.describe("Contest page",async()=>
{
    test('TC-15-Contest page Images validation', async () => {
        const contestPageUrl = page.url();
        if (contestPageUrl !== contestdata.contesturl) {
          await contestpage.elements.ContestPageclick().click();
        }
        let videobannersrc = await contestpage.elements.videobanner().nth(0).getAttribute('src')
        expect.soft(videobannersrc).toBe(contestdata.videobannercontest);
        let howtopartiSrc = await contestpage.elements.howtoparti().nth(0).getAttribute('src');
        let contestKvSrc = await contestpage.elements.contestkv().nth(0).getAttribute('src');
        expect.soft(howtopartiSrc).toBe(contestdata.howtopartic);
        expect.soft(contestKvSrc).toBe(contestdata.contestKV);
        let textPri = await contestpage.elements.HowtoGatheComicCoins().textContent();
        expect.soft(contestpage.elements.rewardpool()).toContainText(contestdata.RewardsPool);
        expect.soft(textPri).toBe(contestdata.HowtoGatherComicCoins);
      });

    test('TC-16-Contest page links and CTA validation', async () => {
      let contestPageUrl = page.url();
        if (contestPageUrl !== contestdata.contesturl) {
          await contestpage.elements.ContestPageclick().click();
        }
        let rewardMmtSrcBanner = await contestpage.elements.rewardSrc().nth(0).getAttribute('src');
        expect.soft(rewardMmtSrcBanner).toBe(contestdata.mmtvoucher);
        // Check leaderboard CTA
        let phonePeSrc = await contestpage.elements.rewardSrc().nth(3).getAttribute('src');
        expect.soft(phonePeSrc).toBe(contestdata.phonmepee);
        expect.soft(contestpage.elements.leaderboardCTA()).toBeEnabled();
        expect.soft(await contestpage.elements.leaderboardCTA().textContent()).toBe(contestdata.Leaderboardtext);
        await contestpage.elements.leaderboardCTA().click();
        await page.waitForTimeout(1000)
        let currentURLLeaderboard =page.url();
        expect(currentURLLeaderboard).toBe(contestdata.leaderboard);
        await contestpage.elements.clickback().click();
        await page.waitForTimeout(1000)
        let contestURLContest = page.url();
        expect(contestURLContest).toBe(contestdata.ContestURL);
        // Check comic coin CTA
        let comicCoinText = await contestpage.elements.comiccoin().textContent();
        expect(comicCoinText).toBe(contestdata.ComicCoins);
        await contestpage.elements.comiccoin().click();
        let comicCoinPageUrl = page.url();
        expect(comicCoinPageUrl).toBe(contestdata.ComiccoinURL);
        let allFooterMenuText = await contestpage.elements.contestclick().nth(1).textContent();
        expect(allFooterMenuText).toBe(contestdata.CONTEST);
        await contestpage.elements.contestclick().nth(1).click();
        expect(page.url()).toBe(contestdata.ContestURL);
      });


      test('TC-17-Contest page how to gather navigation switch', async () => {
        let contestPageUrl = page.url();
        if (contestPageUrl !== contestdata.contesturl) {
          await contestpage.elements.ContestPageclick().click();
        }
        let howToGatherPointCount = await contestpage.elements.allhowtogetherpoint().count();
        let howToGatherPointElements = contestpage.elements.allhowtogetherpoint();
        for (let i = 0; i < howToGatherPointCount; i++) {
          let textContent = (await howToGatherPointElements.nth(i).textContent())?.trim();
          switch (textContent) {
            case 'React to a Joke':
              expect(await howToGatherPointElements.nth(0).textContent()).toBe('React to a Joke');
              await howToGatherPointElements.nth(0).click();
              ugcPageUrl1= page.url();
              expect(ugcPageUrl1).toBe(contestdata.ugcurl);
              await contestpage.elements.clickback().click();
              contestUrl2 =page.url();
              expect(contestUrl2).toBe(contestdata.ContestURL);
              break;
              case 'Vote for a Joke':
              expect(await howToGatherPointElements.nth(1).textContent()).toBe('Vote for a Joke');
              await howToGatherPointElements.nth(1).click();
              voteForAJokeUrl = page.url();
              expect(voteForAJokeUrl).toBe(contestdata.ugcurl);
              await contestpage.elements.clickback().click();
              contestUrl4 = page.url();
              expect(contestUrl4).toBe(contestdata.ContestURL);
              break;
              case 'Refer a Friend':
              expect(await howToGatherPointElements.nth(2).textContent()).toBe('Refer a Friend');
              await howToGatherPointElements.nth(2).click();
              referPopupText = await contestpage.elements.referpopup().textContent();
              if (referPopupText) {
                await burgerMenuFunction.popupclose();
              } else {
                console.log('Refer is available');
              }
              break;
              case 'Use Invite Code':
              expect(await howToGatherPointElements.nth(3).textContent()).toBe('Use Invite Code');
              inviteBtn = howToGatherPointElements.nth(3);
              await inviteBtn.evaluateHandle(e => e?.parentElement?.parentElement?.click());
              referPopupTexts = await contestpage.elements.referpopup().textContent();
              if (referPopupTexts) {
                await burgerMenuFunction.popupclose();
              } else {
                console.log('Refer is available');
              }
              break;
      
              case 'Complete Your Profile':
              expect(await howToGatherPointElements.nth(4).textContent()).toBe('Complete Your Profile');
              await howToGatherPointElements.nth(4).click();
              profilePageUrl = page.url();
              expect(profilePageUrl).toBe(contestdata.myprofile);
              allFooterMenuText = await contestpage.elements.contestclick().nth(3).textContent();
              await contestpage.elements.contestclick().nth(1).click();
              await burgerMenuFunction.popupclose();
              contestTestUrl = page.url();
              break;
      
            default:
              console.log(`Unhandled option: ${textContent}`);
              break;
          }
        }
      });

      test('TC-18-Contest page how to gather banner validation', async () => {
        const contestPageUrl = page.url();
        if (contestPageUrl !== contestdata.contesturl) {
          await contestpage.elements.ContestPageclick().click();
        }
        const getUrlSpriteBottle = await contestpage.elements.spritebottle().getAttribute('src');
        expect.soft(getUrlSpriteBottle).toBe(contestdata.spriteBottleContest);
        const drinkMoreText = await contestpage.elements.bannerDrinkmore().textContent();
        expect.soft(drinkMoreText).toBe(contestdata.drinkmore);
        expect.soft(contestpage.elements.enteruniqueCTA()).toBeEnabled();
        await burgerMenuFunction.popupclose();
        await contestpage.elements.enteruniqueCTA().click();
        await burgerMenuFunction.popupclose();
      });

      

})
