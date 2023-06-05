import { test } from '@playwright/test'
import { BasePage } from '../../pages/BasePage'
import { LoginPage } from '../../pages/LoginPage'
import { ProductDetailsPage } from '../../pages/ProductDetailsPage'
import { AccessoriesPage } from '../../pages/AccessoriesPage'
import { ShoppingCartPage } from '../../pages/ShoppingCartPage'
import { invalidPassword, standardUserEmail, standardUserPassword } from '../../utils/Strings'

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

    test('TS005 - Not enough products in stock', async () => {
        await loginPage.setUpStore(standardUserEmail, standardUserPassword)
        await loginPage.searchForProduct('Fox')
        await accessoriesPage.clickOnFoxNotebook()
        await productDetailsPage.checkInStockQuantity()
        await productDetailsPage.setQuantityInp(productDetailsPage.stockQuantity+1)
        await productDetailsPage.checkIfOutOfStockProductDetails()
        await productDetailsPage.setQuantityInp(productDetailsPage.stockQuantity)
        await productDetailsPage.clickAddToCart()
        await productDetailsPage.clickProceedButton()
        await shoppingCartPage.increaseQuantityGUI(12)
        await shoppingCartPage.checkIfOutOfStockCart()
        await shoppingCartPage.decreseQuantityGUI(15)
        await shoppingCartPage.checkIfProceedIsEnabled()
        await shoppingCartPage.removeItemsFromCart()
    })