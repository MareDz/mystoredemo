// Random credentials, with password 6-10 chars length. Response is in Json
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



// Random text, with 1 paragraph and 2 sentences. Response is in Text format
let commentAPI = ''

export async function getCommentsFromAPI() {
  if (!commentAPI){
    const response = await fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1&sentences=2&format=text')
    const data = await response.text()
    commentAPI = data
  }
  return{
    comment: commentAPI
  }  
}


