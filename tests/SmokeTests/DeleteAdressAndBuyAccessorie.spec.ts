import { test } from '@playwright/test'
import { BasePage} from '../../pages/BasePage'
import { LoginPage } from '../../pages/LoginPage'
import { AccessoriesPage } from '../../pages/AccessoriesPage'
import { ProductDetailsPage } from '../../pages/ProductDetailsPage'
import { ShoppingCartPage } from '../../pages/ShoppingCartPage'
import { OrderPage } from '../../pages/OrderPage'
import { standardUserEmail, standardUserPassword } from '../../utils/Strings'
import { YourAccountPage } from '../../pages/YourAccountPage'
import { getCommentsFromAPI } from '../../utils/API'

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

    test('TS002 - Delete Adress and Buy Accessorie', async () => {
      const apiData = await getCommentsFromAPI()

      await loginPage.setUpStore(standardUserEmail, standardUserPassword)
      await accessoriesPage.clickAccessoriesPage()
      await accessoriesPage.clickStationery()
      await accessoriesPage.clickOnFoxNotebook()
      await productDetailsPage.addNotebookToCartGUI('Doted', 5)
      await productDetailsPage.clickContinueShoppingButton()
      await productDetailsPage.clickShoppingCartPage()
      await shoppingCartPage.clickProceedToCheckoutButton()
      await orderPage.fillInOrderPage(apiData.comment)
      await orderPage.clickOrderAndPay(standardUserEmail)
      await yourAccountPage.verifyOrderReference()
    })






