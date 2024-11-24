import { expect, Locator, Page } from '@playwright/test';
import * as homedata from '../inputdata/homepage.json';

export default class HomePages {
    page: Page;

    elements: {
        clickHome: () => Locator;
        ContestBanner:()=> Locator;
        upperheader:()=> Locator;
        Pickurmood:()=> Locator;
        ComediansSpotl:()=> Locator;
        jokebox:()=> Locator;
        Moodcatagory:()=> Locator;
        moddimg:()=> Locator;
        pichurmoodsubcat:()=> Locator;
        artiestname:()=> Locator;
        viewall:()=> Locator;
        clickback: ()=> Locator;
        activepickurmood:()=> Locator;
        pickMoodBlock: () =>  Locator;
        pickMoodSlickDots: () => Locator;
        ComedianDot: ()=> Locator;
        comedianimg: ()=> Locator;
        ComedianName: ()=> Locator;
        
    };

    constructor(page: Page) {
        this.page = page;

        this.elements = {
            clickHome: () => this.page.locator(".footer .row .align-items-center .home"),
            ContestBanner:()=> this.page.locator(".container-fluid .img-card"),
            upperheader:()=> this.page.locator(".s-header .container-fluid .text-uppercase"),
            Pickurmood:()=> this.elements.upperheader().nth(0),
            ComediansSpotl: ()=> this.elements.upperheader().nth(1),
            jokebox:()=> this.elements.upperheader().nth(2),
            Moodcatagory:()=> this.page.locator(".align-items-center .card-tickle h6"),
            activepickurmood:()=> this.page.locator("#pick_mood .slick-track > [aria-hidden='false']"),
            pichurmoodsubcat:()=> this.page.locator(".s-header .container-fluid .s-sub-title"),
            //#pick_mood .slick-slide
            moddimg:()=> this.page.locator("#pick_mood .slick-track > [aria-hidden='false'] img"),
            artiestname:()=> this.page.locator(".col-12 .slick-track .card-body h4"),
            viewall:()=> this.page.locator(".s-header  .view-more"),
            clickback: ()=> this.page.locator(".icon-back"),
            pickMoodBlock: () => this.page.locator('#pick_mood'),
            pickMoodSlickDots: () => this.elements.pickMoodBlock().locator('.slick-dots > li'),
            ComedianDot: ()=> this.page.locator(".col-12 .tour-comedianSlider .slick-dots > li"),
            comedianimg: ()=> this.page.locator(".col-12 .tour-comedianSlider .card-comedian img"),
            ComedianName: ()=> this.page.locator(".col-12 .tour-comedianSlider .card-comedian .justify-content-center h4")
            
        };
    }


    async artimag()
    {
        let CmdyNameCount= await this.elements.ComedianName().count();
                for(let i=0; i<CmdyNameCount; i++)
                {
                    let CmdyName= await this.elements.ComedianName().nth(i).textContent();
                    let cmdyimg =await this.elements.comedianimg().nth(i).getAttribute('src');

                    switch(CmdyName)
                    {
                    case homedata.SaikiranRayaprolu:    
                    await expect.soft(cmdyimg).toBe(homedata.SaikiranRayaproluIMGurl);
                    await this.elements.ComedianName().nth(i).click();
                    await this.page.waitForTimeout(2000);
                    await this.elements.clickback().click();
                    break;

                    // case homedata.BiswaKalyanRath:    
                    // await expect.soft(cmdyimg).toBe(homedata.BiswaKalyanRathIMGURL);
                    // await this.elements.ComedianName().nth(i).click();
                    // await this.page.waitForTimeout(2000);
                    // await this.elements.clickback().click();
                    // break;

                    // case homedata.SorabhPant:    
                    // await expect.soft(cmdyimg).toBe(homedata.SorabhPantIMGURL);
                    // await this.elements.ComedianName().nth(i).click();
                    // await this.page.waitForTimeout(2000);
                    // await this.elements.clickback().click();
                    // break;

                    // case homedata.KapilSharma:    
                    // await expect.soft(cmdyimg).toBe(homedata.KapilSharmaIMGURL);
                    // await this.elements.ComedianName().nth(i).click();
                    // await this.page.waitForTimeout(2000);
                    // await this.elements.clickback().click();
                    // break;

                    // case homedata.MallikaDua:    
                    // await expect.soft(cmdyimg).toBe(homedata.MallikaDuaIMGURL);
                    // await this.elements.ComedianName().nth(i).click();
                    // await this.page.waitForTimeout(2000);
                    // await this.elements.clickback().click();
                    // break;

                    // case homedata.KennySebastian:    
                    // await expect.soft(cmdyimg).toBe(homedata.KennySebastianIMGURL);
                    // await this.elements.ComedianName().nth(i).click();
                    // await this.page.waitForTimeout(2000);
                    // await this.elements.clickback().click();
                    // break;

                    // case homedata.PrashastiSingh:    
                    // await expect.soft(cmdyimg).toBe(homedata.PrashastiSingh);
                    // await this.elements.ComedianName().nth(i).click();
                    // await this.page.waitForTimeout(2000);
                    // await this.elements.clickback().click();
                    // break;

                    // case homedata.NaveenSingh:    
                    // await expect.soft(cmdyimg).toBe(homedata.NaveenSingh);
                    // await this.elements.ComedianName().nth(i).click();
                    // await this.page.waitForTimeout(2000);
                    // await this.elements.clickback().click();
                    // break;

                    // case homedata.NiharikaNM:    
                    // await expect.soft(cmdyimg).toBe(homedata.NiharikaNMIMGURL);
                    // await this.elements.ComedianName().nth(i).click();
                    // await this.page.waitForTimeout(2000);
                    // await this.elements.clickback().click();
                    // break;

                    // case homedata.AnirbanDasgupta:    
                    // await expect.soft(cmdyimg).toBe(homedata.AnirbanDasgupta);
                    // await this.elements.ComedianName().nth(i).click();
                    // await this.page.waitForTimeout(2000);
                    // await this.elements.clickback().click();
                    // break;

                    // case homedata.NiranjanMondal:    
                    // await expect.soft(cmdyimg).toBe(homedata.NiranjanMondalIMGURL);
                    // await this.elements.ComedianName().nth(i).click();
                    // await this.page.waitForTimeout(2000);
                    // await this.elements.clickback().click();
                    // break;

                    // case homedata.VarunThakur:    
                    // await expect.soft(cmdyimg).toBe(homedata.VarunThakurIMGURL);
                    // await this.elements.ComedianName().nth(i).click();
                    // await this.page.waitForTimeout(2000);
                    // await this.elements.clickback().click();
                    // break;

                    // case homedata.MirAfsarAli:    
                    // await expect.soft(cmdyimg).toBe(homedata.MirAfsarAliIMGURL);
                    // await this.elements.ComedianName().nth(i).click();
                    // await this.page.waitForTimeout(2000);
                    // await this.elements.clickback().click();
                    // break;

                    // case homedata.UroojAshfaq:    
                    // await expect.soft(cmdyimg).toBe(homedata.UroojAshfaqIMGURL);
                    // await this.elements.ComedianName().nth(i).click();
                    // await this.page.waitForTimeout(2000);
                    // await this.elements.clickback().click();
                    // break;

                    // case homedata.DanishSaitIMGURL:    
                    // await expect.soft(cmdyimg).toBe(homedata.DanishSaitIMGURL);
                    // await this.elements.ComedianName().nth(i).click();
                    // await this.page.waitForTimeout(2000);
                    // await this.elements.clickback().click();
                    // // break;

                    // default:
                    // console.log(`Unhandled option: ${CmdyName}`);
                    // break;

                    }
                }
    }
}
