import { test } from '@playwright/test'
import { BasePage } from '../../pages/BasePage'
import { LoginPage } from '../../pages/LoginPage'
import { YourAccountPage } from '../../pages/YourAccountPage'
import { invalidPassword, standardUserEmail, standardUserPassword } from '../../utils/Strings'

    let basePage: BasePage
    let loginPage: LoginPage
    let yourAccountPage: YourAccountPage


    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page)
        loginPage = new LoginPage(page)
        yourAccountPage = new YourAccountPage(page)
    })


    test('TS008 - Login Negative', async () => {
        await loginPage.setUpStore(standardUserEmail, invalidPassword) // set up negative
        await loginPage.loginErrorMessage()
        await loginPage.loginToStore(standardUserEmail, standardUserPassword)
        await yourAccountPage.clickSignOut()
    })