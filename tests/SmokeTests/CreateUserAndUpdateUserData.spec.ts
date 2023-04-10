import {test, expect} from '@playwright/test'
import { BasePage} from '../../pages/BasePage'
import { LoginPage } from '../../pages/LoginPage'
import { AccessoriesPage } from '../../pages/AccessoriesPage'
import { ProductDetailsPage } from '../../pages/ProductDetailsPage'
import { ShoppingCartPage } from '../../pages/ShoppingCartPage'
import { OrderPage } from '../../pages/OrderPage'
import { getCredentialsFromAPI, validEmailMarko, validPasswordMarko } from '../../utils/Strings'

    let basePage: BasePage
    let loginPage: LoginPage
    let accessoriesPage: AccessoriesPage
    let productDetailsPage: ProductDetailsPage
    let shoppingCartPage: ShoppingCartPage
    let orderPage: OrderPage

    test.beforeEach(async ({page}) => {
      basePage = new BasePage(page)
      loginPage = new LoginPage(page)
      accessoriesPage = new AccessoriesPage(page)
      productDetailsPage = new ProductDetailsPage(page)
      shoppingCartPage = new ShoppingCartPage(page)
      orderPage = new OrderPage(page)
    })

    test('CreateUserAndUpdateUserData', async ({page}) => {
      const credentials = await getCredentialsFromAPI()
      await loginPage.setUpStore(credentials.email, credentials.password)
      await page.pause()
      // POIIPOIPOI
    })

  





