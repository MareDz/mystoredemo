import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "../pages/BasePage"
import { failedLoginCaption} from "../utils/Strings"


export class LoginPage extends BasePage{

  readonly page: Page
  readonly btn_show: Locator
  readonly btn_signUserIn: Locator
  readonly lbl_noAccount: Locator
  readonly lbl_forgotPassword: Locator
  readonly lbl_alertFailed: Locator
 
  constructor(page: Page){
    super(page)
    this.page = page
    this.btn_show = page.locator("[type='button']")
    this.btn_signUserIn = page.locator("#submit-login")
    this.lbl_noAccount = page.locator(".no-account a")
    this.lbl_forgotPassword = page.locator(".forgot-password")
    this.lbl_alertFailed = page.locator(".alert-danger")
  }

  
  async setUpStore(email: string, password: string){
    this.log('setUpStore')
    await this.openApp()
    await this.clickSignIn()
    await this.loginToStore(email, password)
  }


  async loginToStore(email: string, password: string){
    this.log('loginToStore')
    await this.inp_email.fill(email)
    await this.inp_password.fill(password)
    await this.btn_show.click()
    await this.btn_show.click()
    await this.btn_signUserIn.click()
  }


  async createUserAccountFromAPI(firstName: string, lastName: string, email: string, password: string){
    this.log('createUserAccountFromAPI')
    await this.openApp()
    await this.clickSignIn()
    await this.lbl_noAccount.click()
    await this.inp_firstName.fill(firstName)
    await this.inp_lastName.fill(lastName)
    await this.inp_email.fill(email)
    await this.inp_password.fill(password)
    await this.cb_termsAndConditions.click()
    await this.btn_save.click()
  }


  async clickShowHideButton(){
    this.log('clickShowHideButton')
    await this.btn_show.click()
  }
  

  async loginErrorMessage(){
    this.log('loginErrorMessage')
    await expect(this.lbl_alertFailed).toContainText(failedLoginCaption)
  }

}