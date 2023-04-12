import {Locator, Page, expect} from "@playwright/test"
import {BasePage} from "./BasePage"
import { emptyCart } from "../utils/Strings"

export class ShoppingCartPage extends BasePage {

  readonly page: Page
  readonly btn_proccedToCheckout: Locator
  readonly btn_deleteAllItems: Locator
  readonly lbl_shoppingCart: Locator
  readonly lbl_noItems: Locator
  readonly lbl_pricePerLot: Locator
  readonly lbl_continueShopping: Locator
  readonly lbl_checkTotalWTaxes: Locator
  readonly lbl_checkShipping: Locator
  readonly lbl_checkItemsTotal: Locator
  readonly lbl_checkTaxes: Locator
  readonly lbl_checkQuanty: Locator
  readonly inp_quantity: Locator
  checkQuantity: number
  checkItemsTotal: number
  checkShipping: number
  checkTaxes: number
  checkTotalWTaxes: number

  constructor(page: Page){
    super(page)
    this.page = page
    this.btn_proccedToCheckout = page.locator(".cart-detailed-actions .btn-primary")
    this.btn_deleteAllItems = page.locator(".remove-from-cart")
    this.lbl_checkTotalWTaxes = page.locator(".cart-total .value")
    this.lbl_checkTaxes = page.locator(".value.sub")
    this.lbl_checkItemsTotal = page.locator("#cart-subtotal-products .value")
    this.lbl_checkShipping = page.locator("//*[@id='cart-subtotal-shipping']/span[2]")
    this.lbl_checkQuanty = page.locator(".js-subtotal")
    this.lbl_noItems = page.locator(".no-items")
    this.lbl_pricePerLot = page.locator(".product-price strong") // Parent class
    this.lbl_continueShopping = page.locator(".label i")
    this.inp_quantity = page.locator("[name='product-quantity-spin']") // Parent class
  }

  async clickProceedToCheckoutButton(){
    console.log('clickProceedToCheckoutButton()')
    await this.btn_proccedToCheckout.click()
  }

  async clickContinueShopping(){
    console.log('clickContinueShopping()')
    await this.lbl_continueShopping.click()
  }
  
  // This is working but need to be refactored to look nicer
  async verifyCalculation(){
    console.log('verifyCalculation()')
    this.getValuesFromCheck()   
    this.quantityCheckElementFormat()

    let sumOfLotPrices = await this.sumOfElemetsFormat(this.lbl_pricePerLot)
    let sumOfItemQuantity = await this.sumOfIntputsFormat(this.inp_quantity)
    let referenceValues =  (this.checkShipping + this.checkItemsTotal + this.checkTaxes)

    sumOfLotPrices == this.checkItemsTotal? console.log('Lot SUM = Items Total in Check'): console.log('ERROR');
    sumOfItemQuantity == this.checkQuantity? console.log('Quantity SUM = Quantity in Check'): console.log('ERROR');
    referenceValues == this.checkTotalWTaxes? console.log('Calculation is OK'): console.log('ERROR');
  }
  
  // Values from Check section, necessary for validation 
  async getValuesFromCheck(){
    console.log('getValuesFromCheck()')
    this.checkShipping = await this.priceElementFormat(this.lbl_checkShipping)
    this.checkItemsTotal = await this.priceElementFormat(this.lbl_checkItemsTotal)
    this.checkTaxes = await this.priceElementFormat(this.lbl_checkTaxes)
    this.checkTotalWTaxes = await this.priceElementFormat(this.lbl_checkTotalWTaxes)
  }

  // Quantity requiers different method of formating/slicing -> This is unique scenario, only used here
  async quantityCheckElementFormat(){
    console.log('quantityCheckElementFormat()')
    let quanty = await this.lbl_checkQuanty.innerText()
    this.checkQuantity = Number(quanty?.slice(0, -6))
    console.log('Check quantity is: ' +this.checkQuantity)
  }

  async removeItemsFromCart(){
    console.log('removeItemsFromCart')
    this.clickAllElements(this.btn_deleteAllItems)
    await expect(this.lbl_noItems).toContainText(emptyCart)
    await expect(this.lbl_checkTotalWTaxes).toContainText('$0.00')
  }


}
