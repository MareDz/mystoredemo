import {expect, Locator, Page} from "@playwright/test"
import { BasePage } from "../pages/BasePage"
import { shoppingCartCaption } from "../utils/Strings"


export class ProductDetailsPage extends BasePage {

  readonly page: Page
  readonly btn_addToCart: Locator
  readonly btn_quantityPlus: Locator
  readonly btn_quantityMinus: Locator
  readonly btn_continueShopping: Locator
  readonly btn_proceedShopping: Locator
  readonly lbl_price: Locator
  readonly lbl_priceCheck: Locator
  readonly lbl_addedToCart: Locator
  readonly inp_quantityInput: Locator
  readonly drop_paperType: Locator

  constructor(page: Page){
    super(page)
    this.page = page
    this.btn_addToCart = page.locator("[data-button-action]")
    this.btn_quantityPlus = page.locator(".touchspin-up")
    this.btn_quantityMinus = page.locator(".touchspin-down")
    this.btn_continueShopping = page.locator(".btn.btn-secondary")
    this.btn_proceedShopping = page.locator(".cart-content-btn .btn-primary")
    this.lbl_price = page.locator("[itemprop='price']")
    this.lbl_addedToCart = page.locator("#myModalLabel")
    this.inp_quantityInput = page.locator("#quantity_wanted")
    this.drop_paperType = page.locator("//*[@id='group_4']")
    }

   
    async setQuantityGUI(quantity: number){
      this.log('setQuantityGUI')
        for (let i=0; i<quantity; i++ ){
          await this.btn_quantityPlus.click()
    }
    await this.btn_quantityMinus.click()
  }


    async setQuantityInp(quantity: string){
      this.log('setQuantityInp')
      await this.inp_quantityInput.clear()
      await this.inp_quantityInput.fill(quantity)
    }


    async setPaperType(paper: string){
       this.log('setPaperType')
       await this.drop_paperType.selectOption({label: paper}) 
    }


    async addNotebookToCartGUI(paper: string, quantity: number){
      this.log('addNotebookToCartGUI')
      await this.setQuantityGUI(quantity)
      await this.setPaperType(paper)
      await this.btn_addToCart.click()
    }


    async addMugToCartInput(quantity: string){
      this.log('addMugToCartInput')
      await this.setQuantityInp(quantity)
      await this.btn_addToCart.click()
    }


    async clickProceedButton(){
      this.log('clickProceedButton')
      await this.btn_proceedShopping.click()
      await expect(this.lbl_shoppingCart).toContainText(shoppingCartCaption)
    }


    async clickContinueShoppingButton(){
      this.log('clickContinueShoppingButton')
      await this.btn_continueShopping.click()
    }

}
