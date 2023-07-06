import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "../pages/BasePage"
import { adventureMugCaption, adventureMugTitle, customizableMugCaption, customizableMugTitle, foxNotebookCaption, foxNotebookTitle, homeAccessoriesCaption, homeAccessoriesTitle, stationeryCaptoion, stationeryTitle } from "../utils/Strings"


export class AccessoriesPage extends BasePage {

  readonly page: Page
  readonly btn_closePreview: Locator
  readonly lbl_stationery: Locator
  readonly lbl_accessoriesCaption: Locator  // All Accessories share the same locator
  readonly lbl_homeAccessories: Locator
  readonly lbl_numOfProducts: Locator
  readonly lbl_productCaption: Locator  // All Products share the same locator
  readonly img_foxNotebook: Locator
  readonly img_adventureMug: Locator
  readonly img_adventureMugPreview: Locator
  readonly img_customizableMug: Locator
  readonly articles: Locator
 
  constructor(page: Page){
    super(page)
    this.page = page
    this.btn_closePreview = page.locator(".close > span")
    this.lbl_stationery = page.locator("//ul[@class='category-sub-menu']/li[1]")
    this.lbl_homeAccessories = page.locator("//ul[@class='category-sub-menu']/li[2]")
    this.lbl_accessoriesCaption = page.locator(".h1") 
    this.lbl_productCaption = page.locator(".h1")
    this.lbl_numOfProducts = page.locator("//*[@id='js-product-list-top']//p")
    this.img_foxNotebook = page.locator("[data-id-product='16']")
    this.img_adventureMug = page.locator("[alt='Mug The adventure begins']")
    this.img_adventureMugPreview = page.locator("[data-id-product='7'] [data-link-action]")
    this.img_customizableMug = page.locator("[data-id-product='19']")
    this.articles = page.locator("//*[@class='products row']/article")
  }


  async clickStationery(){
    this.log('clickStationery')
    await this.lbl_stationery.click()
    await expect(this.page).toHaveTitle(stationeryTitle)
    await expect(this.lbl_accessoriesCaption).toContainText(stationeryCaptoion)
  }


  async clickHomeAccessories(){
    this.log('clickHomeAccessories')
    await this.lbl_homeAccessories.click()
    await expect(this.page).toHaveTitle(homeAccessoriesTitle)
    await expect(this.lbl_accessoriesCaption).toContainText(homeAccessoriesCaption)
  }


  async clickOnFoxNotebook(){
    this.log('clickOnFoxNotebook')
    await this.img_foxNotebook.click()
    await expect(this.page).toHaveTitle(foxNotebookTitle)
    await expect(this.lbl_productCaption).toContainText(foxNotebookCaption)
  }
  

  async clickOnAdventureMug(){
    this.log('clickOnAdventureMug')
    await this.img_adventureMug.click()
    await expect(this.page).toHaveTitle(adventureMugTitle)
    await expect(this.lbl_productCaption).toContainText(adventureMugCaption)
  }


  async clickOnCustobizableMug(){
    this.log('clickOnCustomizableMug')
    await this.img_customizableMug.click()
    await expect(this.page).toHaveTitle(customizableMugTitle)
    await expect(this.lbl_productCaption).toContainText(customizableMugCaption)
  }


  async previewMug(){
    this.log('previwMug')
    await this.img_adventureMug.hover()
    await this.page.waitForTimeout(2000)
    await this.img_adventureMugPreview.click()
    await this.btn_closePreview.click()
    await this.page.reload()
  }


  async checkNumOfDisplayedProducts(){
    this.log('checkNumOfDisplayedProducts')

    let x = await this.lbl_numOfProducts.innerText()  
    let y = Number(x.slice(10, -9))
    let count = await this.articles.count()

    if(y != count){
      throw new Error('checkNumOfDisplayedProducts() -> FALSE')
    }
  }

}
