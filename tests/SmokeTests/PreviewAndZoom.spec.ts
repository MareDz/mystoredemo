import { test } from '@playwright/test'
import { BasePage } from '../../pages/BasePage'
import { LoginPage } from '../../pages/LoginPage'
import { ProductDetailsPage } from '../../pages/ProductDetailsPage'
import { AccessoriesPage } from '../../pages/AccessoriesPage'
import { standardUserEmail, standardUserPassword } from '../../utils/Strings'

    let basePage: BasePage
    let loginPage: LoginPage
    let accessoriesPage: AccessoriesPage
    let productDetailsPage: ProductDetailsPage


    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page)
        loginPage = new LoginPage(page)
        accessoriesPage = new AccessoriesPage(page)
        productDetailsPage = new ProductDetailsPage(page)
    })

    test('TS004 - Preview and Zoom an Item', async () => {
        await loginPage.setUpStore(standardUserEmail, standardUserPassword)
        await accessoriesPage.clickHomeAccessoriesHover()
        await accessoriesPage.previewMug()
        await accessoriesPage.clickOnAdventureMug()
        await productDetailsPage.zoomTheProduct()
    })