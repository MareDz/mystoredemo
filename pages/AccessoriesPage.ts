import {Locator, Page, expect} from "@playwright/test"
import { BasePage } from "../pages/BasePage"
import { adventureMugCaption, foxNotebookCaption, homeAccessoriesCaption, stationeryCaptoion } from "../utils/Strings"

export class AccessoriesPage extends BasePage {

  readonly page: Page
  readonly lbl_stationery: Locator
  readonly lbl_stationeryCaption: Locator
  readonly lbl_homeAccessories: Locator
  readonly lbl_homeAccessoriesCaption: Locator
  readonly lbl_foxNotebookCaption: Locator
  readonly lbl_adventureMugCaption: Locator
  readonly img_foxNotebook: Locator
  readonly img_adventureMug: Locator
 
  constructor(page: Page){
    super(page)
    this.page = page
    this.lbl_stationery = page.locator("//ul[@class='category-sub-menu']/li[1]")
    this.lbl_homeAccessories = page.locator("//ul[@class='category-sub-menu']/li[2]")
    this.lbl_stationeryCaption = page.locator(".h1") // category sub menu
    this.lbl_homeAccessoriesCaption = page.locator(".h1") // category sub menu
    this.lbl_foxNotebookCaption = page.locator(".h1")
    this.lbl_adventureMugCaption = page.locator(".h1")
    this.img_foxNotebook = page.locator("[data-id-product='16']")
    this.img_adventureMug = page.locator("img[alt='Mug The adventure begins']")
  }

  async clickStationery(){
    this.log('clickStationery')
    await this.lbl_stationery.click()
    await expect(this.lbl_stationeryCaption).toContainText(stationeryCaptoion)
  }

  async clickHomeAccessories(){
    this.log('clickHomeAccessories')
    await this.lbl_homeAccessories.click()
    await expect(this.lbl_stationeryCaption).toContainText(homeAccessoriesCaption)
  }

  async clickOnFoxNotebook(){
    this.log('clickOnFoxNotebook')
    await this.img_foxNotebook.click()
    await expect(this.lbl_foxNotebookCaption).toContainText(foxNotebookCaption)
  }

  async clickOnMug(){
    this.log('clickOnMug')
    await this.img_adventureMug.click()
    await expect(this.lbl_adventureMugCaption).toContainText(adventureMugCaption)
  }

}