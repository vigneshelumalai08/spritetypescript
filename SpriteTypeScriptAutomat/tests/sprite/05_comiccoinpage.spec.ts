import { test, expect, Page, BrowserContext, Browser,chromium } from '@playwright/test';
import Login from '../pages/01_loginpage';
import Signuppage from '../pages/02_signuppage';
import Burguremenu from '../pages/03_Burgermenu';
import ContestPage from '../pages/04_conntestpage';
import Comiccoin from '../pages/05_comiccoinpage';
import * as comic from '../inputdata/comiccoin.json';

let page: Page;
let browser: Browser;
let context: BrowserContext;
let loginpage: Login;
let Signup: Signuppage;
let burgerMenuFunction: Burguremenu;
let contestpage:ContestPage;
let Comiccoinpage: Comiccoin;

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
    await loginpage.sitelaunch();
    
});

test.afterAll("Closing the session", async () => {
    await context.close();
    await browser.close();
});

test.describe(async()=>
    {

        test('TC-19-my wins section validation', async () => {
            const ComicCoinpage = page.url();
            if (ComicCoinpage !== comic.ComiccoinURL) {
                await Comiccoinpage.elements.ComicCoinpageclick().click();
            }
            await page.waitForTimeout(2000);
            expect(await Comiccoinpage.elements.mywins().textContent()).toBe(comic.MYWINS);
            const collectMoreCTAcount = await Comiccoinpage.elements.ColletmoreCTA().count();
            if (collectMoreCTAcount > 1) {
                expect(await Comiccoinpage.elements.mywinsSRC().getAttribute('src')).toBe(comic.mmtlive);
                expect(await Comiccoinpage.elements.mmtheader().textContent()).toBe(comic.TheUltimateRetreattext);
                expect(await Comiccoinpage.elements.subtextcontent().textContent()).toBe(comic.takebreakcontent);
                const reedemtext = await Comiccoinpage.elements.ClickReedemnow().textContent();
                expect(reedemtext).toBe(comic.RedeemNowCTA);
                await Comiccoinpage.elements.ClickReedemnow().click();
                const [newTab] = await Promise.all([
                    page.waitForEvent('popup'),
                ]);
                await newTab.waitForLoadState();
                console.log(await newTab.title());
                await expect(newTab).toHaveURL(comic.mmturl);
                await newTab.close();
                expect(await Comiccoinpage.elements.savegifttax().textContent()).toBe(comic.SaveGiftTax);
                await Comiccoinpage.elements.savegifttax().click();
                expect(await Comiccoinpage.elements.claimform().textContent()).toBe(comic.Claimform);
                await Comiccoinpage.elements.clickback().click();
                expect(await Comiccoinpage.elements.lastdatetoreedem().textContent()).toBe(comic.lastdatetext);
                let sharewith = Comiccoinpage.elements.sharewithfri();
                expect(sharewith).toBeEnabled();
                expect(await Comiccoinpage.elements.sharewithfri().textContent()).toBe(comic.SharewithFriends);
            } else {
                expect(await Comiccoinpage.elements.mywinsSRC().getAttribute('src')).toBe(comic.mmtlive);
                expect(await Comiccoinpage.elements.mmtheader().textContent()).toBe(comic.TheUltimateRetreattext);
                expect(await Comiccoinpage.elements.subtextcontent().textContent()).toBe(comic.Participate);
                
            }
        });

        test('TC-20-phonepe section validation', async () => {
            const ComicCoinpage = page.url();
            if (ComicCoinpage !== comic.ComiccoinURL) {
                await Comiccoinpage.elements.ComicCoinpageclick().click();
            }
            expect.soft(await Comiccoinpage.elements.phonepeheader().textContent()).toBe(comic.PhonePeCashbacktext);
            
            await page.waitForTimeout(2000)
            const EnterCodeCTAElement = await Comiccoinpage.elements.entercodeCTAphone().isVisible();
            console.log(EnterCodeCTAElement)
            if (EnterCodeCTAElement) {
                const EnterCodeCTA = await Comiccoinpage.elements.entercodeCTAphone().textContent();
                console.log(EnterCodeCTA);
                if (EnterCodeCTA === comic.EnterCodetext) {
                    expect.soft(EnterCodeCTA).toBe(comic.EnterCodetext);
                    await Comiccoinpage.elements.entercodeCTAphone().click();
                    await burgerMenuFunction.popupclose();
                    expect.soft(await Comiccoinpage.elements.nowinsimg().getAttribute('src')).toBe(comic.notwin);
                    await page.waitForTimeout(2000)
                }
            } else {
                console.log("Enter Code CTA is not available on the page.");
        
                const winscount = await Comiccoinpage.elements.phonepewins().count();
                
                for (let i = 0; i < winscount; i++) {
                    await Comiccoinpage.elements.redeemclick().nth(i).click();
                    expect(await Comiccoinpage.elements.phonepepopupimgsrc().getAttribute('src')).toBe(comic.rsvoucher);
                    expect(await Comiccoinpage.elements.itsyour().textContent()).toBe(comic.ityours);
                    expect(await Comiccoinpage.elements.itsyousubhead().textContent()).toBe(comic.pocketsize);
                    await Comiccoinpage.elements.redeemnoyphonepe().click();
                    let [newTab] = await Promise.all([
                        page.waitForEvent('popup'), 
                    ]);
                    await newTab.waitForLoadState();
                    await expect.soft(newTab).toHaveURL(comic.phonepenexttab);
                    await newTab.close();
                    await burgerMenuFunction.popupclose();
                }
            }
        });

        test("TC-21-Comic Coin Page Validation", async () => {
            const comicCoinPageUrl = page.url();
            if (comicCoinPageUrl !== comic.ComiccoinURL) {
                await Comiccoinpage.elements.ComicCoinpageclick().click();
            }
            expect.soft(await Comiccoinpage.elements.previouswiner().textContent()).toBe(comic.PreviousWinners);
            expect.soft(await Comiccoinpage.elements.leaderboardtext().textContent()).toBe(comic.Leaderboardtext);
            await Comiccoinpage.elements.leaderboardtext().click();
            const currentURL = page.url();
            expect.soft(currentURL).toBe(comic.leaderboard);
            await Comiccoinpage.elements.clickback().click();
            const currentURL1 = page.url();
            expect.soft(currentURL1).toBe(comic.ComiccoinURL);
            expect.soft(await Comiccoinpage.elements.referbanner().getAttribute('src')).toBe(comic.referbanner);
            await Comiccoinpage.elements.referclick().click();
            await burgerMenuFunction.popupclose();
            expect(await Comiccoinpage.elements.ugcbanner().getAttribute('src')).toBe(comic.comicbanner);
            await Comiccoinpage.elements.clickUgc().click();
            const UGCURLget = page.url();
            expect(UGCURLget).toBe(comic.UGC);
            await Comiccoinpage.elements.clickback().click();
            const currentURL2 = page.url();
            expect(currentURL2).toBe(comic.ComiccoinURL);
            
        });
    })
