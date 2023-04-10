import {Locator, Page, expect} from '@playwright/test'
import { shoppingCartCaption, urlMyStore } from '../utils/Strings'
import { accessoriesCaption} from "../utils/Strings"

export class BasePage{

  readonly page: Page
  readonly btn_clothes: Locator
  readonly btn_accesories: Locator
  readonly btn_shoppingCart: Locator
  readonly btn_signIn: Locator
  readonly lbl_myStore: Locator
  readonly lbl_accessoriesCaption: Locator
  readonly lbl_shoppingCart: Locator
  toNumber: number

  constructor(page: Page){
    this.page = page 
    this.btn_clothes = page.locator("//*[@id='top-menu']/li[1]")
    this.btn_accesories = page.locator("//*[@id='top-menu']/li[2]")
    this.btn_signIn = page.locator("//*[@title='Log in to your customer account']")
    this.btn_shoppingCart = page.locator("#_desktop_cart")
    this.lbl_myStore = page.locator("[alt='teststore']")
    this.lbl_accessoriesCaption = page.locator(".h1")
    this.lbl_shoppingCart = page.locator(".h1")
  }

async clickSignIn(){
  console.log('clickSignIn()')
  await this.btn_signIn.click()
 }

 async clickAccessoriesPage(){
  console.log('clickAccessoriesPage()')
  await this.btn_accesories.click()
  await expect(this.lbl_accessoriesCaption).toContainText(accessoriesCaption)
 }

 async clickShoppingCartPage(){
  console.log('clickShoppingCartPage()')
  await this.btn_shoppingCart.click()
  await expect(this.lbl_shoppingCart).toContainText(shoppingCartCaption)
 }

 async openApp(){
  console.log('openApp()')
  await this.page.goto(urlMyStore)
 }


// Get ALL of elements with same locator and returns the SUM of them with 2 decimals
async sumOfElemetsFormat(locator: Locator){
  console.log('sumOfElemetsFormat()')
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

// Get ALL of INPUT elements with same locator and returns the SUM of them with 2 decimals
async sumOfIntputsFormat(locator: Locator){
  console.log('sumOfIntputsFormat()')
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

// Remove $ from price element and format it to Number
async priceElementFormat(locator: Locator){
  console.log('priceElementFormat()')
  let element = await locator.innerText()
  let price = Number(element?.slice(1))
  return price
}

// Click on all elements with same locator
async clickAllElements(locator: Locator){
  console.log('clickAllElements()')
  let elements = locator
  let count = await elements.count()
  for (let i = 0; i < count; i++) {
    await elements.nth(i).click();
  }
}

// Click on all elements with same locator, slower method, better for some cases
async clickOnAllElementsType2(locator: Locator){
  console.log('clickOnAllElementsType2()')
  let elements = locator
  let elementCount = await elements.count()
  while(elementCount>0){
    await elements.first().click()
    await elementCount--
  }
}

}