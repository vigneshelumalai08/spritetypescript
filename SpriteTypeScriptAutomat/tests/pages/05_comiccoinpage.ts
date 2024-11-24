import { Locator, Page } from '@playwright/test';

export default class ComicCoin {
    page: Page;

    elements: {
        mywins: () => Locator;
        ColletmoreCTA: () => Locator;
        mywinsSRC: () => Locator;
        mmtheader: () => Locator;
        subtextcontent: () => Locator;
        ClickReedemnow: () => Locator;
        savegifttax: () => Locator;
        claimform: () => Locator;
        lastdatetoreedem: () => Locator;
        sharewithfri: () => Locator;
        phonepeheader: () => Locator;
        entercodeCTAphone: () => Locator;
        nowinsimg: () => Locator;
        phonepewins: () => Locator;
        redeemclick: () => Locator;
        phonepepopupimgsrc: () => Locator;
        itsyour: () => Locator;
        itsyousubhead: () => Locator;
        redeemnoyphonepe: () => Locator;
        previouswiner: () => Locator;
        leaderboardtext: () => Locator;
        referbanner: () => Locator;
        ugcbanner: () => Locator;
        referclick: () => Locator;
        clickUgc: () => Locator;
        ComicCoinpageclick: () => Locator;
        clickback: () => Locator
    };

    constructor(page: Page) {
        this.page = page;

        this.elements = {
            mywins: () => this.page.locator(".container-fluid  .s-title "),
            ColletmoreCTA: () => this.page.locator(".d-flex .link-wrapper .btn-sm"),
            mywinsSRC: () => this.page.locator(".card-img-top"),
            mmtheader: () => this.page.locator(".card-title"),
            subtextcontent: () => this.page.locator(".justify-content-between .pt-md-2"),
            ClickReedemnow: () => this.page.locator(".link-wrapper .btn-warning"),
            savegifttax: () => this.page.locator(".link-wrapper .btn-primary.btn-sm"),
            claimform: () => this.page.locator(".s-title"),
            lastdatetoreedem: () => this.page.locator(".s-reward-pool .redeem-date.mt-2"),
            sharewithfri: () => this.page.locator(".s-reward-pool .text-primary.font-weight-bold"),
            phonepeheader: () => this.page.locator(".container .s-title"),
            entercodeCTAphone: () => this.page.locator(".profile-address .text-center .btn-wins"),
            nowinsimg: () => this.page.locator(".profile-address .text-center .wins-image"),
            phonepewins: () => this.page.locator(".profile-address .card-wrapper"),
            redeemclick: () => this.page.locator(".profile-address .card-wrapper .btn-primary"),
            phonepepopupimgsrc: () => this.page.locator(".modal-code .position-relative .card-img-top"),
            itsyour: () => this.page.locator(".modal-code .justify-content-between .card-title"),
            itsyousubhead: () => this.page.locator(".modal-code .justify-content-between .voucher-message"),
            redeemnoyphonepe: () => this.page.locator(".link-wrapper .button-wrapper .btn-primary"),
            previouswiner: () => this.page.locator(".leaderboard-banner .content-wrapper h2"),
            leaderboardtext: () => this.page.locator(".leaderboard-banner .content-wrapper .btn-primary"),
            referbanner: () => this.page.locator("//img[@src='/assets/img/bgs/share-laugh.svg']"),
            ugcbanner: () => this.page.locator("//img[@src='/assets/img/bgs/comic-banner.svg']"),
            referclick: () => this.page.locator(".container .s-shareJokes .btn-primary"),
            clickUgc: () => this.page.locator(".container .s-shareJokes .btn-dark"),
            ComicCoinpageclick: () => this.page.locator('.col .justify-content-center .justify-content-center.wallet'),
            clickback: ()=> this.page.locator(".icon-back"),
        };
    }
}
