import { test } from '@playwright/test'
import { BasePage} from '../../pages/BasePage'
import { LoginPage } from '../../pages/LoginPage'
import { AccessoriesPage } from '../../pages/AccessoriesPage'
import { ProductDetailsPage } from '../../pages/ProductDetailsPage'
import { ShoppingCartPage } from '../../pages/ShoppingCartPage'
import { standardUserEmail, standardUserPassword} from '../../utils/Strings'

    let basePage: BasePage
    let loginPage: LoginPage
    let accessoriesPage: AccessoriesPage
    let productDetailsPage: ProductDetailsPage
    let shoppingCartPage: ShoppingCartPage

    test.beforeEach(async ({page}) =>{
      basePage = new BasePage(page)
      loginPage = new LoginPage(page)
      accessoriesPage = new AccessoriesPage(page)
      productDetailsPage = new ProductDetailsPage(page)
      shoppingCartPage = new ShoppingCartPage(page)
    })

    test('TS001 - Verify Calculation and Delete Items', async ()=>{
      await loginPage.setUpStore(standardUserEmail, standardUserPassword)
      await accessoriesPage.clickAccessoriesPage()
      await accessoriesPage.clickStationery() 
      await accessoriesPage.clickOnFoxNotebook()
      await productDetailsPage.addNotebookToCartGUI('Ruled', 12)
      await productDetailsPage.clickProceedButton()
      await shoppingCartPage.clickContinueShopping()
      await shoppingCartPage.clickAccessoriesPage()
      await accessoriesPage.clickHomeAccessories()
      await accessoriesPage.clickOnAdventureMug()
      await productDetailsPage.addMugToCartInput('2')
      await productDetailsPage.clickProceedButton()
      await shoppingCartPage.verifyCalculation()
      await shoppingCartPage.removeItemsFromCart()
    })

    





