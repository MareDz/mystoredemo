import { expect, Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"
import { standardUserAdress, standardUserCity, confimedOrderCaption, standardUserCountry, dummyText, standardUserState, standardUserZIP } from "../utils/Strings"


export class OrderPage extends BasePage {

  readonly page: Page
  readonly btn_editAdress: Locator
  readonly btn_deleteAdress: Locator
  readonly btn_continueAdress: Locator  
  readonly btn_continueShipping: Locator
  readonly btn_order: Locator
  readonly lbl_orderReference: Locator
  readonly lbl_confirmedEmail: Locator
  readonly lbl_confirmed: Locator
  readonly lbl_shippingSectionTitle: Locator
  readonly inp_shipping: Locator
  readonly inp_adress: Locator
  readonly inp_city: Locator
  readonly inp_zipCode: Locator
  readonly inp_phone: Locator
  readonly cb_termsOfService: Locator
  readonly cb_sameAdress: Locator
  readonly radio_payCheck: Locator
  readonly radio_payWire: Locator
  readonly drop_state: Locator
  readonly drop_country: Locator

  constructor(page: Page){
    super(page)
    this.page = page
    this.btn_editAdress = page.locator(".edit-address.text-muted")
    this.btn_deleteAdress = page.locator("[class='delete-address text-muted']") //article:nth-of-type(1)  .delete-address.text-muted
    this.btn_continueAdress = page.locator("[name='confirm-addresses']")
    this.btn_continueShipping = page.locator("[name='confirmDeliveryOption']")
    this.btn_order = page.locator("//*[@id='payment-confirmation']//button")
    this.lbl_orderReference = page.locator("#order-details ul li:nth-of-type(1)")
    this.lbl_confirmed = page.locator('.h1')
    this.lbl_confirmedEmail = page.locator("#content-hook_order_confirmation p")
    this.lbl_shippingSectionTitle = page.locator('#checkout-delivery-step .step-title')
    this.inp_city = page.locator("[name='city']")
    this.inp_phone = page.locator("[name='phone']")
    this.inp_zipCode = page.locator("[name='postcode']")
    this.inp_adress = page.locator("[name='address1']")
    this.inp_shipping = page.locator("#delivery_message")
    this.cb_termsOfService = page.locator("[id='conditions_to_approve[terms-and-conditions]']")
    this.cb_sameAdress = page.locator("#use_same_address")
    this.radio_payCheck = page.locator("[id='payment-option-1']")
    this.radio_payWire = page.locator("[id='payment-option-2']")
    this.drop_country = page.locator("[name='id_country']")
    this.drop_state = page.locator("[name='id_state']")
  }


  async fillInOrderPage(comment: string){
    this.log('fillInOrderPage')
    const count = await this.btn_deleteAdress.count()

    // Delete button handle -> 3 Possible scenarios, every scenario depends on last user session in aplication
    switch (count){  
      case 0:  // 1 address is displayed
        console.log('Switch case 0') 
        await this.enterAdressDetails()  
        break;
      case 1:  // 2 addresses are displayed
        console.log('Switch case 1')
        await this.btn_deleteAdress.click() 
        await this.enterAdressDetails()
        break;
      default:  // More than 2 addresses are displayed
        console.log('Switch case 2')  
        await this.clickOnAllElementsOneByOne(this.btn_deleteAdress)
        await this.enterAdressDetails()
        break;
    }

    await this.shippingMethod(comment)
    await this.payByWire()
  }


  // Currently we are testing only with "Standard User", that's why values are pre-populated
  async enterAdressDetails(){ 
    this.log('enterAdressDetails')
    
    await this.inp_adress.fill(standardUserAdress)
    await this.inp_city.fill(standardUserCity)
    await this.inp_zipCode.fill(standardUserZIP)

    await this.drop_state.selectOption({label: standardUserState})
    await this.drop_country.selectOption({label: standardUserCountry})

    const checkIfChecked = await this.cb_sameAdress.isChecked()
    if(!checkIfChecked){
      this.log('Use this address for invoice - > Was not checked')
      await this.cb_sameAdress.click()
    }
    else{
      this.log('Use this address for invoice -> Was checked')
    }
    await this.btn_continueAdress.click()
  }


  async clickOrderAndPay(email: string){
    this.log('clickOrderAndPay')
    await this.cb_termsOfService.click()
    await this.btn_order.click()
    
    await expect(this.lbl_confirmed).toContainText(confimedOrderCaption)
    await expect(this.lbl_confirmedEmail).toContainText(email)
    
    this.orderReference = (await this.lbl_orderReference.innerText()).slice(17)
    console.log('Order Reference is: ' + this.orderReference) 
  }

  
  async payByWire(){
    this.log('payByWire')
    await this.radio_payWire.click()
  }


  async payByCheck(){
    this.log('payByCheck')
    await this.radio_payCheck.click()
  }

  
// This section had some loading issues on the front
  async shippingMethod(comment: string){
    this.log('shippingMethod')
    await this.page.waitForTimeout(2000) // This API is a bit slower

    if (await this.lbl_shippingSectionTitle.isEnabled()) {
      await this.page.waitForTimeout(2000)
      await this.inp_shipping.clear()
      await this.inp_shipping.fill(comment)
      await this.btn_continueShipping.click()
    } 
    else {
      console.log('Page Reloaded')
      await this.page.reload()
      await this.inp_shipping.fill(dummyText, {timeout: 10000})
      await this.btn_continueShipping.click()
    }
  }

}

