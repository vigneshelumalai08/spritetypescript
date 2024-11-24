import { Locator, Page, expect } from '@playwright/test';
import * as userdata from '../inputdata/userdata.json';
import * as profile from '../inputdata/myprofile.json'

export default class ProfilePage {
    page: Page;
    elements: {
        announcingtext: () => Locator;
        timercount: () => Locator;
        clickprofileexiticon: () => Locator;
        formtextbox: () => Locator;
        userDOBInProEditPg: () => Locator;
        monthPicker: () => Locator;
        yearPicker: () => Locator;
        dayPicker: () => Locator;
        userGenderInProEditPg: () => Locator;
        saveDetailsInEditProPg: () => Locator;
        Addrestextvali: () => Locator;
        addctastatus: () => Locator;
        addressfill: () => Locator;
        saveaddress: () => Locator;
        referfriend: () => Locator;
        referanother: () => Locator;
        clickrefer1: () => Locator;
        referpopuptext: () => Locator;
        enterrefnumber: () => Locator;
        clicksubmitbutton: () => Locator;
        clickcloseicon: () => Locator;
        referconfimpopup: () => Locator;
        selflove: () => Locator;
        alredyreferred: () => Locator;
        refnumber: () => Locator;
        successtext: () => Locator;
        getreferredtext: () => Locator;
        profilename: () => Locator;
        usermailid: () => Locator;
        clickediticon: () => Locator;
        datepicker: () => Locator;
        clickyear: () => Locator;
        clickmonth: () => Locator;
        dayselect: () => Locator;
        gender: () => Locator;
        profilesubmit: () => Locator;
        Breaktheice: () => Locator;
        yesclose: () => Locator;
        addButton: () => Locator;
        address1: () => Locator;
        pincode: () => Locator;
        setdefaul: () => Locator;
        myprofilepageclick:() => Locator;
        addressdeleteicon:()=> Locator;
        Checkboxprofile:()=> Locator;
        selflovetextvali:()=> Locator;
    };

    constructor(page: Page) {
        this.page = page;

        this.elements = {
            announcingtext: () => this.page.locator(".justify-content-between .mt-1"),
            timercount: () => this.page.locator(".justify-content-between .timer"),
            clickprofileexiticon: () => this.page.locator(".container-fluid  .edit-icon"),
            formtextbox: () => this.page.locator(".form-group .form-control"),
            userDOBInProEditPg: () => this.page.locator('[placeholder="YYYY/MM/DD"]'),
            monthPicker: () => this.page.locator('.react-datepicker__month-select'),
            yearPicker: () => this.page.locator('.react-datepicker__year-select'),
            dayPicker: () => this.page.locator('.react-datepicker__day--006'),
            userGenderInProEditPg: () => this.page.locator('[placeholder="Select Gender"]'),
            saveDetailsInEditProPg: () => this.page.locator('.form-footer > button'),
            Addrestextvali: () => this.page.locator(".address-tag"),
            addctastatus: () => this.page.locator(".address-add-btn.border-0"),
            addressfill: () => this.page.locator(".overflow-hidden-n .form-group"),
            saveaddress: () => this.page.locator(".overflow-hidden-n .modal-body .btn-primary"),
            referfriend: () => this.page.locator(".container-fluid .s-title .btn-primary"),
            referanother: () => this.page.locator(".justify-content-center .btn-primary.refer-btns"),
            clickrefer1: () => this.page.locator(".btn.btn-primary.d-flex"),
            referpopuptext: () => this.page.getByText("Bro-code we follow!"),
            enterrefnumber: () => this.page.locator("input[placeholder='Enter your friend’s mobile no.']"),
            clicksubmitbutton: () => this.page.locator(".modal-content .form-footer"),
            clickcloseicon: () => this.page.locator(".modal-header .btn-link"),
            referconfimpopup: () => this.page.locator(".text-center .modal-heading"),
            selflove: () => this.page.getByText("Ahem Ahem!"),
            alredyreferred: () => this.page.locator("//h5[normalize-space()='Trying to get one past us?']"),
            refnumber: () => this.page.locator(".modal-description.pb-md-2.pb-1.text-primary.font-weight-bolder"),
            successtext: () => this.page.locator("p[class='modal-description pb-md-2 pb-1']"),
            getreferredtext: () => this.page.locator("//p[@class='mb-4 modal-sub-title sm']"),
            profilename: () => this.page.locator("input[placeholder='Full Name']"),
            usermailid: () => this.page.locator("input[placeholder='Email ID']"),
            clickediticon: () => this.page.locator(".edit-icon.profilepos"),
            datepicker: () => this.page.locator("//input[@id='date']"),
            clickyear: () => this.page.locator(".react-datepicker__year-select"),
            clickmonth: () => this.page.locator(".react-datepicker__month-select"),
            dayselect: () => this.page.locator("//div[@aria-label='Choose Sunday, April 2nd, 1967']"),
            gender: () => this.page.locator("select[placeholder='Select Gender']"),
            profilesubmit: () => this.page.locator("button[type='submit']"),
            Breaktheice: () => this.page.getByText("Break the ice, Maybe?"),
            yesclose: () => this.page.locator("//button[normalize-space()='Yes']"),
            addButton: () => this.page.locator("//button[normalize-space()='+ Add']"),
            address1: () => this.page.locator("input[placeholder='Address Line 1*']"),
            pincode: () => this.page.locator("input[placeholder='Pincode*']"),
            setdefaul: () => this.page.locator("label[for='check-box']"),
            myprofilepageclick:()=> this.page.locator(".col .justify-content-center .justify-content-center.profile-tour"),
            addressdeleteicon:()=>this.page.locator(".justify-content-between .default-address-label +img"),
            Checkboxprofile:()=> this.page.locator(".justify-content-between .form-check-input "),
            selflovetextvali: ()=> this.page.locator(".modal-content .modal-sub-title")
        };
    }


    async generateRandomMobileNumber() {

        const randomNumber = Math.floor(Math.random() * 1000000000);
        return '8' + randomNumber.toString().padStart(9, '0');
    
    }
    
    async fillMobileNumber(iteration: number, ownNumber: string) {

        
        let referredNumber = this.generateRandomMobileNumber();
        if (iteration === 1) {
            await this.elements.enterrefnumber().fill(await referredNumber);
        } else if (iteration === 2) {
            await this.elements.enterrefnumber().fill(ownNumber);
        } else if (iteration === 3 ) {
            await this.elements.enterrefnumber().fill(userdata.referednumber);
        }
        else if (iteration === 4 ) {
            await this.elements.enterrefnumber().fill(userdata.alredyuserexit);
        }
         else {
            console.log("Invalid iteration or no previously referred number found.");
        }
    }

    async referdpopupenabled(){
        const successMessageVisible = await this.elements.referconfimpopup().isVisible();
        const Selflove = await this.elements.selflove().isVisible();
        const alresyreferred = await this.elements.alredyreferred().isVisible();
        const UseralreadyExist = await this.elements.referpopuptext().isVisible();

        let condition: string;
        if (successMessageVisible) {
            condition = 'successMessageVisible';
        } else if (Selflove) {
            condition = 'Selflove';
        } else if (UseralreadyExist) {
            condition = 'UseralreadyExist';
        } else if (alresyreferred) {
            condition = 'alresyreferred';
        } else {
            condition = 'notFound';
        }
        switch (condition) {
            case 'successMessageVisible':
                let gerrefno: string | null = await this.elements.refnumber().textContent();
                console.log("Referral number:", gerrefno);
                let getsuccessmessage = this.elements.successtext();
                expect.soft(getsuccessmessage).toHaveText(profile.successrefer);
                break;
            case 'Selflove':
                expect.soft(this.elements.selflovetextvali()).toHaveText(profile.selflovevali)
                break;
            case 'UseralreadyExist':
                console.log('Error: Referred User already exists.');
                break;
    
            case 'alresyreferred':
                const alredyrefferdtext = this.elements.getreferredtext();
                expect.soft(alredyrefferdtext).toHaveText(profile.alredyrefsent);
                break;
    
            case 'notFound':
                console.log('Error: Page not found.');
                break;
    
            default:
                console.log('Unexpected condition.');
                break;
        }
    }

   
}
