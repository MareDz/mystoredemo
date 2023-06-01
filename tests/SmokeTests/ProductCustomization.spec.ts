import { test } from '@playwright/test'
import { BasePage } from '../../pages/BasePage'
import { LoginPage } from '../../pages/LoginPage'
import { ProductDetailsPage } from '../../pages/ProductDetailsPage'
import { AccessoriesPage } from '../../pages/AccessoriesPage'
import { standardUserEmail, standardUserPassword } from '../../utils/Strings'
import { ShoppingCartPage } from '../../pages/ShoppingCartPage'
import { getCommentsFromAPI } from '../../utils/API'


   let basePage: BasePage
   let loginPage: LoginPage
   let accessoriesPage: AccessoriesPage
   let productDetailsPage: ProductDetailsPage
   let shoppingCartPage: ShoppingCartPage

   test.beforeEach(async ({page}) => {
      basePage = new BasePage(page)
      loginPage = new LoginPage(page)
      accessoriesPage = new AccessoriesPage(page)
      productDetailsPage = new ProductDetailsPage(page)
      shoppingCartPage = new ShoppingCartPage(page)
   })

   test('TS007 - ProductCustomization', async () => {
       const apiData = await getCommentsFromAPI()

        await loginPage.setUpStore(standardUserEmail, standardUserPassword) 
        await loginPage.searchForProduct('Mug')
        await accessoriesPage.clickOnCustobizableMug()
        await productDetailsPage.enterCustomization(apiData.comment)
        await productDetailsPage.clickAddToCart()
        await productDetailsPage.clickProceedButton()
        await shoppingCartPage.getCustomization()
        await shoppingCartPage.verifyCustomization() 
        await shoppingCartPage.removeItemsFromCart()
   })