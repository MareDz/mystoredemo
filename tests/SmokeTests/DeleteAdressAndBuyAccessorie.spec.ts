import {test, expect} from '@playwright/test'
import { BasePage} from '../../pages/BasePage'
import { LoginPage } from '../../pages/LoginPage'
import { AccessoriesPage } from '../../pages/AccessoriesPage'
import { ProductDetailsPage } from '../../pages/ProductDetailsPage'
import { ShoppingCartPage } from '../../pages/ShoppingCartPage'
import { OrderPage } from '../../pages/OrderPage'
import { invalidPassword, standardUserEmail, standardUserPassword} from '../../utils/Strings'
import { YourAccountPage } from '../../pages/YourAccountPage'

    let basePage: BasePage
    let loginPage: LoginPage
    let accessoriesPage: AccessoriesPage
    let productDetailsPage: ProductDetailsPage
    let shoppingCartPage: ShoppingCartPage
    let orderPage: OrderPage
    let yourAccountPage: YourAccountPage

    test.beforeEach(async ({page, context}) =>{
      basePage = new BasePage(page)
      loginPage = new LoginPage(page)
      accessoriesPage = new AccessoriesPage(page)
      productDetailsPage = new ProductDetailsPage(page)
      shoppingCartPage = new ShoppingCartPage(page)
      orderPage = new OrderPage(page)

      const newTab = await context.newPage()
      yourAccountPage = new YourAccountPage(newTab)
    })

    test('DeleteAdressAndBuyAccessorie', async () => {
      await loginPage.setUpStore(standardUserEmail, invalidPassword) // set up negative
      await loginPage.loginToStore(standardUserEmail, standardUserPassword)
      await accessoriesPage.clickAccessoriesPage()
      await accessoriesPage.clickStationery() 
      await accessoriesPage.clickOnFoxNotebook()
      await productDetailsPage.addNotebookToCartGUI('Doted', 5)
      await productDetailsPage.clickContinueShoppingButton()
      await productDetailsPage.clickShoppingCartPage()
      await shoppingCartPage.clickProceedToCheckoutButton()
      await orderPage.enterDataOrderPage()
      await orderPage.clickOrderAndPay(standardUserEmail)
      await yourAccountPage.verifyOrderReference()
    })






