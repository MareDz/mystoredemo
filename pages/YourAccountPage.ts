import {Locator, Page, expect} from "@playwright/test"
import { BasePage } from "./BasePage"

export class YourAccountPage extends BasePage {

  readonly page: Page
  readonly btn_information: Locator
  readonly btn_addresses: Locator
  readonly btn_orderHistory: Locator
  readonly btn_creditSlips: Locator
  readonly btn_vouchers: Locator
  readonly lbl_updateInfoSaved: Locator

  constructor(page: Page){
    super(page)
    this.page = page
    this.btn_information = page.locator("#content #identity-link:nth-of-type(1) .material-icons") // refactor it to look nicer
    this.btn_addresses = page.locator("#addresses-link .material-icons")
    this.btn_orderHistory = page.locator("#history-link .material-icons")
    this.btn_creditSlips = page.locator("#order-slips-link .material-icons")
    this.btn_vouchers = page.locator("#discounts-link .material-icons")
    this.lbl_updateInfoSaved = page.locator("article[role='alert']  li")
  }

  async editPersonalInfo(password: string){
    console.log("editPersonalInfo()")
    await this.btn_information.click()
    await this.inp_password.fill(password)
    await this.cb_newsLetter.click()
    await this.cb_termsAndConditions.click()
    await this.btn_save.click()
  }





}