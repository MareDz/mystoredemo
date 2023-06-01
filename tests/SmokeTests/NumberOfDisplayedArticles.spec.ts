import { test } from '@playwright/test'
import { BasePage } from '../../pages/BasePage'
import { LoginPage } from '../../pages/LoginPage'
import { AccessoriesPage } from '../../pages/AccessoriesPage'
import { standardUserEmail, standardUserPassword } from '../../utils/Strings'

    let basePage: BasePage
    let loginPage: LoginPage
    let accessoriesPage: AccessoriesPage


    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page)
        loginPage = new LoginPage(page)
        accessoriesPage = new AccessoriesPage(page)
       
    })

    test('TS006 - Number of displayed articles', async ({page}) => {
        await loginPage.setUpStore(standardUserEmail, standardUserPassword)
        await accessoriesPage.clickHomeAccessoriesHover()
        await accessoriesPage.checkNumOfDisplayedProducts()
        await page.reload() 
        await accessoriesPage.clickAccessoriesPage()
        await accessoriesPage.checkNumOfDisplayedProducts()
        await page.reload()
        await accessoriesPage.clickStationery()
        await accessoriesPage.checkNumOfDisplayedProducts()
    })