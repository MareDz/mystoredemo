import { Locator, Page, expect } from '@playwright/test'
import { accessoriesTitle, cartTitle, homeAccessoriesTitle, searchCaption, seatchTitle, shoppingCartCaption, urlMyStore } from '../utils/Strings'
import { accessoriesCaption } from "../utils/Strings"


export class BasePage{

  static yourCustomizationShopingCart: string
  static yourCustomizationProductDetails: string
  static index = 0

  readonly page: Page
  readonly btn_accesories: Locator
  readonly btn_homeAccessoriesHover: Locator
  readonly btn_shoppingCart: Locator
  readonly btn_signIn: Locator
  readonly btn_signOut: Locator
  readonly btn_save: Locator
  readonly btn_userAccount: Locator
  readonly btn_zoomIn: Locator
  readonly btn_zoomOut: Locator
  readonly btn_quantityPlus: Locator
  readonly btn_quantityMinus: Locator
  readonly lbl_accessoriesCaption: Locator
  readonly lbl_searchCaption: Locator
  readonly lbl_shoppingCart: Locator
  readonly inp_birthDate: Locator
  readonly inp_email: Locator
  readonly inp_password: Locator
  readonly inp_firstName: Locator
  readonly inp_lastName: Locator
  readonly inp_search: Locator
  readonly cb_termsAndConditions: Locator
  readonly cb_newsLetter: Locator
  toNumber: number
  orderReference = ''

  constructor(page: Page){
    this.page = page 
    this.btn_accesories = page.locator("//*[@id='top-menu']/li[2]")
    this.btn_homeAccessoriesHover = page.locator("//*[@id='category-6']/div[1]/ul/li[2]/a")
    this.btn_signIn = page.locator("//*[@title='Log in to your customer account']")
    this.btn_shoppingCart = page.locator("#_desktop_cart")
    this.btn_save = page.locator(" .form-footer button")
    this.btn_signOut = page.locator(".logout")
    this.btn_userAccount = page.locator("[title='View my customer account']")
    this.btn_zoomIn = page.locator(".zoom-in")
    this.btn_zoomOut = page.locator("#product-modal")
    this.btn_quantityPlus = page.locator(".touchspin-up")
    this.btn_quantityMinus = page.locator(".touchspin-down")
    this.lbl_accessoriesCaption = page.locator(".h1")
    this.lbl_shoppingCart = page.locator(".h1")
    this.lbl_searchCaption = page.locator("#js-product-list-header")
    this.inp_birthDate = page.locator("[name='birthday']")
    this.inp_email = page.locator("section input[name='email']") 
    this.inp_password = page.locator("[name='password']")
    this.inp_firstName = page.locator("[name='firstname']")
    this.inp_lastName = page.locator("[name='lastname']")
    this.inp_search = page.locator("[name='s']")
    this.cb_termsAndConditions = page.locator("[name='psgdpr']")
    this.cb_newsLetter = page.locator("[name='newsletter']")
  }


// Generate a step for every method/function log
log(text: string){
  BasePage.index++
  console.log('STEP [' + BasePage.index + ']    ' + text + '()')
}


async openApp(){
  this.log('openApp')
  await this.page.goto(urlMyStore)
 }


async clickSignIn(){
  this.log('clickSignIn')
  await this.btn_signIn.click()
 }


async clickSignOut(){
  this.log('clickSignOut')
  await this.btn_signOut.click({timeout: 10000})
}


async clickUserAccount(){
  this.log('clickUserAccount')
  await this.btn_userAccount.click()
}


 async clickAccessoriesPage(){
  this.log('clickAccessoriesPage')
  await this.btn_accesories.click()
  await expect(this.page).toHaveTitle(accessoriesTitle)
  await expect(this.lbl_accessoriesCaption).toContainText(accessoriesCaption)
 }

 
 async clickHomeAccessoriesHover(){
  this.log('clickHomeAccessoriesHover')
  await this.btn_accesories.hover()
  await this.btn_homeAccessoriesHover.click()
  await expect(this.page).toHaveTitle(homeAccessoriesTitle)
 }


 async clickShoppingCartPage(){
  this.log('clickShoppingCartPage')
  await this.btn_shoppingCart.click()
  await expect(this.page).toHaveTitle(cartTitle)
  await expect(this.lbl_shoppingCart).toContainText(shoppingCartCaption)
 }

 
 async zoomTheProduct(){
  this.log('zoomTheProduct')
  await this.btn_zoomIn.click()
  await this.btn_zoomOut.click()
 }
 

// Regular searchbar
 async searchForProduct(name){
  this.log('searchForProduct')
  await this.inp_search.clear()
  await this.inp_search.click()
  await this.inp_search.fill(name)
  await this.page.keyboard.press('Enter')
  await expect(this.page).toHaveTitle(seatchTitle)
  await expect(this.lbl_searchCaption).toContainText(searchCaption)
 }


 async increaseQuantityGUI(quantity: number){
  this.log('increaseQuantityGUI')
    for (let i=0; i<quantity; i++ ){
      await this.btn_quantityPlus.click()
    }
    await this.btn_quantityMinus.click()
  }


async decreseQuantityGUI(quantity: number){
  this.log('decreseQuantityGUI')
  for (let i=0; i<quantity; i++ ){
    await this.btn_quantityMinus.click()
}
await this.btn_quantityPlus.click()
}


// Logic -> Gets the Parent locator, check the type of nth(1) to determine type of all child locators,
//          depends of type, perform following formating and conversion, put it into array and return 
//          the sum of all elements
async sumOfElementsFormat(locator: Locator){
  this.log('sumOfElementsFormat')

  let priceArray: number[] = []
  const count = await locator.count()
  const tagName = await this.getTagName(locator.nth(1))  // get tipe

  if(tagName != "INPUT"){
    for(let i=0; i < count; i++){
      let element = await locator.nth(i).innerText()
      this.toNumber = Number(element?.slice(1))
      priceArray.push(this.toNumber)
    }
  }
   else{
      for(let i=0; i < count; i++){
      let element = await locator.nth(i).inputValue()
      this.toNumber = Number(element)
      priceArray.push(this.toNumber);
    }
    }

  const sum = Number(priceArray.reduce((a, b) => a + b, 0).toFixed(2))
  console.log('Sum Of Elements is: ' + sum)

  return sum
}


// Remove $ sign from price element and format it to Number
async priceElementFormat(locator: Locator){
  this.log('priceElementFormat')
  let element = await locator.innerText()
  let price = Number(element?.slice(1))
  return price
}


// Click on all elements with same locator at the same time
async clickOnAllElements(locator: Locator){
  this.log('clickOnAllElements')
  let count = await locator.count()

  for (let i = 0; i < count; i++) {
    await locator.nth(i).click();
  }
}


// Click on all elements with same locator one by one at the time
async clickOnAllElementsOneByOne(locator: Locator){
  this.log('clickOnAllElementsOneByOne')
  let elementCount = await locator.count()

  while(elementCount>0){
    await locator.first().click()
    await elementCount--
  }
}


// Returns the HTML tag name
async getTagName(locator: Locator): Promise<string> {
    
  const handle = await locator.evaluateHandle((element) => element.tagName);
  const tagName = await handle.jsonValue() as string;
  await handle.dispose();

  return tagName;
}



// Verifies if the product custom text is the same on Product page where user entered it and on Shopping cart page to check if it's accepted
async verifyCustomization(){ 
  this.log('verifyCustomization')

  if(BasePage.yourCustomizationProductDetails != BasePage.yourCustomizationShopingCart ){
    console.log(BasePage.yourCustomizationProductDetails)
    console.log(BasePage.yourCustomizationShopingCart)
    throw new Error('verifyCustomization() -> FALSE')
  }
}



}