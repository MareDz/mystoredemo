// Links
export let urlMyStore = 'http://teststore.automationtesting.co.uk/'

// GET from API
export let dummyText = 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.'

// GET from API
export let birthDate = ''

// GET from API
let emailFromAPI = ''
let passwordFromAPI = ''
export async function getCredentialsFromAPI() { // KESING 
  if (!emailFromAPI || !passwordFromAPI) {
    const response = await fetch('https://randomuser.me/api')
    const data = await response.json()
    emailFromAPI = data.results[0].email
    passwordFromAPI = data.results[0].login.password
  }
  return {
    email: emailFromAPI,
    password: passwordFromAPI,
  }
}

// Credentials for admin user -> MARKO
export let validEmailMarko = 'marko@mail.com'
export let validPasswordMarko = 'mare123'
export let invalidPassword = 'invalidpassword'
export let firstName = 'Marko'
export let lastName = 'Dz'
export let adress = 'Belgrade'
export let city = 'Belgrade'
export let state = 'Alaska'
export let zip = '12312'
export let country = 'United States'
export let phone = '000111222'

// Captions
export let alertFailed = 'Authentication failed.'
export let accessoriesCaption = 'Accessories'
export let stationeryCaptoion = 'Stationery'
export let homeAccessoriesCaption = 'Home Accessories'
export let shoppingCartCaption = 'Shopping Cart'
export let confimedOrderCaption = 'Your order is confirmed'
export let foxNotebookCaption = 'Mountain fox notebook'
export let adventureMugCaption = 'Mug The adventure begins'
export let emptyCart = 'There are no more items in your cart'

