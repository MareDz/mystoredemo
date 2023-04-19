import {test, expect} from '@playwright/test'
import { BasePage} from '../../pages/BasePage'
import { LoginPage } from '../../pages/LoginPage'
import { getCredentialsFromAPI} from '../../utils/Strings'
import { YourAccountPage } from '../../pages/YourAccountPage'

    let basePage: BasePage
    let loginPage: LoginPage
    let yourAccountPage: YourAccountPage

    test.beforeEach(async ({page}) => {
      basePage = new BasePage(page)
      loginPage = new LoginPage(page)
      yourAccountPage = new YourAccountPage(page)
    })

    test('TS003 - Create User and Update User Data', async () => {
      const credentials = await getCredentialsFromAPI()
      await loginPage.createUserAccountFromAPI(credentials.firstName, credentials.lastName, credentials.email, credentials.password)
      await loginPage.clickSignOut()
      await loginPage.clickSignIn()
      await loginPage.loginToStore(credentials.email, credentials.password)
      await yourAccountPage.editPersonalInfo(credentials.password)
    })

    

  





