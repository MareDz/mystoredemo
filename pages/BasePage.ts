import {Locator, Page, expect} from '@playwright/test'
import { accessoriesTitle, cartTitle, shoppingCartCaption, urlMyStore } from '../utils/Strings'
import {accessoriesCaption} from "../utils/Strings"


export class BasePage{

  readonly page: Page
  readonly btn_accesories: Locator
  readonly btn_shoppingCart: Locator
  readonly btn_signIn: Locator
  readonly btn_signOut: Locator
  readonly btn_save: Locator
  readonly btn_userAccount: Locator
  readonly lbl_accessoriesCaption: Locator
  readonly lbl_shoppingCart: Locator
  readonly inp_birthDate: Locator
  readonly inp_email: Locator
  readonly inp_password: Locator
  readonly inp_firstName: Locator
  readonly inp_lastName: Locator
  readonly cb_termsAndConditions: Locator
  readonly cb_newsLetter: Locator
  toNumber: number
  orderReference = ''
  static index = 0

  constructor(page: Page){
    this.page = page 
    this.btn_accesories = page.locator("//*[@id='top-menu']/li[2]")
    this.btn_signIn = page.locator("//*[@title='Log in to your customer account']")
    this.btn_shoppingCart = page.locator("#_desktop_cart")
    this.btn_save = page.locator(" .form-footer button")
    this.btn_signOut = page.locator(".logout")
    this.btn_userAccount = page.locator("[title='View my customer account']")
    this.lbl_accessoriesCaption = page.locator(".h1")
    this.lbl_shoppingCart = page.locator(".h1")
    this.inp_birthDate = page.locator("[name='birthday']")
    this.inp_email = page.locator("section input[name='email']") 
    this.inp_password = page.locator("[name='password']")
    this.inp_firstName = page.locator("[name='firstname']")
    this.inp_lastName = page.locator("[name='lastname']")
    this.cb_termsAndConditions = page.locator("[name='psgdpr']")
    this.cb_newsLetter = page.locator("[name='newsletter']")
  }


// Generate a step for every method/function log
log(text: string){
  BasePage.index++
  console.log('STEP [' + BasePage.index + ']    ' + text + '()')
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


 async clickShoppingCartPage(){
  this.log('clickShoppingCartPage')
  await this.btn_shoppingCart.click()
  await expect(this.page).toHaveTitle(cartTitle)
  await expect(this.lbl_shoppingCart).toContainText(shoppingCartCaption)
 }


 async openApp(){
  this.log('openApp')
  await this.page.goto(urlMyStore)
 }


// Get all desired String elements, format them to a Number, SUM them and round them to 2 decimal places
 async sumOfElementsFormat(locator: Locator){
  this.log('sumOfElementsFormat')

  let priceArray: number[] = []
  const count = await locator.count()
  
  for(let i=0; i < count; i++){
    let element = await locator.nth(i).innerText()
    this.toNumber = Number(element?.slice(1))
    priceArray.push(this.toNumber)
  }

  const sum = Number(priceArray.reduce((a, b) => a + b, 0).toFixed(2))
  console.log('Sum Of Elements is: ' + sum)

  return sum
}


// Get all desired INPUT elements, SUM them and round them to 2 decimal places 
async sumOfInputsFormat(locator: Locator){
  this.log('sumOfInputsFormat')

  let quantityArray: number[] = []
  const count = await locator.count()

  for(let i=0; i < count; i++){
    let element = await locator.nth(i).inputValue()
    this.toNumber = Number(element)
    quantityArray.push(this.toNumber);
  }

  const sum = Number(quantityArray.reduce((a, b) => a + b, 0).toFixed(2))
  console.log('Sum Of Input Elements is: ' + sum)

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
  let elements = locator
  let count = await elements.count()

  for (let i = 0; i < count; i++) {
    await elements.nth(i).click();
  }
}


// Click on all elements with same locator one by one at the time
async clickOnAllElementsOneByOne(locator: Locator){
  this.log('clickOnAllElementsOneByOne')
  let elements = locator
  let elementCount = await elements.count()

  while(elementCount>0){
    await elements.first().click()
    await elementCount--
  }
}



}