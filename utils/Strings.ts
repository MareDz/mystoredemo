// GET from API - 
let emailFromAPI = ''
let passwordFromAPI = ''
let firstNameFromAPI = ''
let lastNameFromAPI = ''

export async function getCredentialsFromAPI() { 
  if (!emailFromAPI || !passwordFromAPI || !firstNameFromAPI || !lastNameFromAPI) {
    const response = await fetch('https://randomuser.me/api/?password=6-10')
    const data = await response.json()
    emailFromAPI = data.results[0].email
    passwordFromAPI = data.results[0].login.password
    firstNameFromAPI = data.results[0].name.first
    lastNameFromAPI = data.results[0].name.last
  }
  return {
    email: emailFromAPI,
    password: passwordFromAPI,
    firstName: firstNameFromAPI,
    lastName: lastNameFromAPI,
  }
}

// Lorem Ipsum
export let dummyText = 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.'

// Links
export let urlMyStore = 'http://teststore.automationtesting.co.uk/'

// Credentials for Admin/Standard user
export let standardUserEmail = 'marko@mail.com'
export let standardUserPassword = 'mare123'
export let invalidPassword = 'invalidpassword'
export let standardUserFirstName = 'Marko'
export let standardUserLastName = 'Dz'
export let standardUserAdress = 'Belgrade'
export let standardUserCity = 'Belgrade'
export let standardUserState = 'Alaska'
export let standardUserZIP = '12312'
export let standardUserCountry = 'United States'
export let standardUserPhone = '000111222'

// Captions
export let failedLoginCaption = 'Authentication failed.'
export let accessoriesCaption = 'Accessories'
export let stationeryCaptoion = 'Stationery'
export let homeAccessoriesCaption = 'Home Accessories'
export let shoppingCartCaption = 'Shopping Cart'
export let confimedOrderCaption = 'Your order is confirmed'
export let foxNotebookCaption = 'Mountain fox notebook'
export let adventureMugCaption = 'Mug The adventure begins'
export let emptyCart = 'There are no more items in your cart'

