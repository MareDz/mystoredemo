import { expect, Locator, Page } from "@playwright/test"
import { BasePage } from "../pages/BasePage"
import { availabilityCaption, shoppingCartCaption } from "../utils/Strings"


export class ProductDetailsPage extends BasePage {

  readonly page: Page
  readonly btn_addToCart: Locator
  readonly btn_continueShopping: Locator
  readonly btn_proceedShopping: Locator
  readonly btn_saveCustomization: Locator
  readonly lbl_price: Locator
  readonly lbl_priceCheck: Locator
  readonly lbl_addedToCart: Locator
  readonly lbl_productDetails: Locator
  readonly lbl_stockQuantity: Locator
  readonly lbl_productAvailability: Locator
  readonly lbl_yourCustomization: Locator
  readonly inp_quantityInput: Locator
  readonly inp_customizationMessage: Locator
  readonly drop_paperType: Locator
  stockQuantity

  constructor(page: Page){
    super(page)
    this.page = page
    this.btn_addToCart = page.locator("[data-button-action]")
    this.btn_continueShopping = page.locator(".btn.btn-secondary")
    this.btn_proceedShopping = page.locator(".cart-content-btn .btn-primary")
    this.btn_saveCustomization = page.locator("[name='submitCustomizedData']")
    this.lbl_price = page.locator("[itemprop='price']")
    this.lbl_addedToCart = page.locator("#myModalLabel")
    this.lbl_productDetails = page.locator("//li[2]/a[@role='tab']")
    this.lbl_stockQuantity = page.locator("[data-stock]")
    this.lbl_productAvailability = page.locator("#product-availability")
    this.lbl_yourCustomization = page.locator(".customization-message label")
    this.inp_quantityInput = page.locator("#quantity_wanted")
    this.inp_customizationMessage = page.locator("textarea[name='textField1']")
    this.drop_paperType = page.locator("//*[@id='group_4']")
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
      await this.increaseQuantityGUI(quantity)
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

    
    async clickAddToCart(){
      this.log('clickAddToCart')
      this.btn_addToCart.click()
    }


    async checkIfOutOfStockProductDetails(){
      this.log('checkIfOutOfStockProductDetails')
      await this.btn_addToCart.isDisabled()
      await expect(this.lbl_productAvailability).toContainText(availabilityCaption)
    }


    async checkInStockQuantity(){
      this.log('checkInStockQuantity')
      await this.lbl_productDetails.click()

      let quantity = this.lbl_stockQuantity.innerText()
      this.stockQuantity = (await quantity)?.slice(0, -6)

      return this.stockQuantity
    }


    async enterCustomization(customization: string){
      this.log('enterCustomization')
      await this.inp_customizationMessage.fill(customization)  
      await this.btn_saveCustomization.click()

      BasePage.yourCustomizationProductDetails = (await this.lbl_yourCustomization.innerText()).trim()
      console.log('Product details custom from API-> ' + BasePage.yourCustomizationProductDetails)
    }



}
