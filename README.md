# Introduction

- My Store is demo application and this project is used only for demonstration purpose.
- This project contains automation tests for My Store application.
- Automation will be done in TypeScript with Playwright.

- Focus of this project is to demonstrate my coding style, usage of POM, API, CI/CD and organization of test cases.



# Getting Started

1. Installation process 
- Before downloading this Git repo, have Node.js installed
- Run following command to install dependencies *‘npm install’*
- Run following command to install PW browsers *‘npx playwright install’*

2. API Reference
- API services used on this project are open-source and completely free to use, they are used only for demonstration purpose.
- Reference link *‘https://randomuser.me/'*

3. Test Cases
- Automation tests are based on scenarios displayed in *‘ExcelTestCases/MyTestStore - Test Cases Demo.xlsx’* file.
- To preview test cases please export .xlsx file outside of code editor, if you don’t have appropriate extension installed.



# General 

- Configuration for CI and for Local are located in *‘essential.config.ts’* file

- All tests for execution are located at *‘tests/SmokeTests’*

- All pages are located in *‘pages’*
  - Every page class contains locators and methods that are specific for that page.
  - BasePage is a file/class that is inherited by every other page/class. It contains methods and locators which are used multiple times to make our code easier to understand and maintain.

 - Because I wasn’t able to use some kind of ‘Vault’ services for this project, all Strings and APIs are located in *‘utils/Strings.ts’*

- For CI/CD we are using ‘Github Actions’
- .YML files are located in *‘.github/workflows’* 
- File *'main.yml'* is configuration file for manual triggering in Pipeline. Same file will be automatically executed on every pull and push request.
- File *‘schedule.yml’* is configuration file for scheduling jobs. By this config. jobs are going to be triggered every day at midnight. *‘TS003 - Create User and Update User Data’* is left out of that file on purpose because I don’t want to fill limited storage on demo site database. 
- All ‘workflows runs’ are available in ‘Actions’ section on my GitHub *‘https://github.com/MareDz/mystoredemo/actions'*
