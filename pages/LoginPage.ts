import {Locator, Page, expect} from "@playwright/test"
import { BasePage } from "../pages/BasePage"
import { alertFailed, invalidPassword, validEmailMarko, validPasswordMarko } from "../utils/Strings"

export class LoginPage extends BasePage{

  readonly page: Page
  readonly btn_show: Locator
  readonly btn_signUserIn: Locator
  readonly lbl_noAccount: Locator
  readonly lbl_forgotPassword: Locator
  readonly lbl_alertFailed: Locator
  readonly inp_email: Locator
  readonly inp_password: Locator

  constructor(page: Page){
    super(page)
    this.page = page
    this.btn_show = page.locator("[type='button']")
    this.btn_signUserIn = page.locator("#submit-login")
    this.lbl_noAccount = page.locator(".no-account a || No account? Create one here")
    this.lbl_forgotPassword = page.locator(".forgot-password")
    this.lbl_alertFailed = page.locator(".alert-danger")
    this.inp_email = page.locator("section input[name='email']")
    this.inp_password = page.locator("[name='password']")
  }

  // async setUpStoreNegativ(email: string){
  //   console.log('setUpStoreNegative()')
  //   await this.openApp()
  //   await this.clickSignIn()
  //   await this.loginToStoreNegative(email)
  //   await this.loginErrorMessage()
  // }
  
  async setUpStore(email: string, password: string){
    console.log('setUpStore()')
    await this.openApp()
    await this.clickSignIn()
    await this.loginToStore(email, password)
  }

  async loginToStore(email: string, password: string){
    console.log('loginToStore()')
    await this.inp_email.fill(email)
    await this.inp_password.fill(password)
    await this.btn_show.click()
    await this.btn_show.click()
    await this.btn_signUserIn.click()
  }

  // async loginToStoreNegative(email: string){
  //   await console.log('loginToStoreNegative()')
  //   await this.inp_email.fill(email)
  //   await this.inp_password.fill(invalidPassword)
  //   await this.btn_show.click()
  //   await this.btn_signUserIn.click()
  // }

  async clickShowHide(){
    console.log('clickShowHide()')
    await this.btn_show.click()
  }

  async loginErrorMessage(){
    console.log('loginErrorMessage()')
    await expect(this.lbl_alertFailed).toContainText(alertFailed)
  }

}