# Introduction

- [My Store](http://teststore.automationtesting.co.uk/) is demo application and this project is used only for demonstration purpose.
- This project contains automation tests for [My Store](http://teststore.automationtesting.co.uk/) application.
- Automation is done in TypeScript with Playwright.

- Focus of this project is to demonstrate my ***coding style, usage of POM, OOP, API, CI/CD, Static Methods, Multi Tabs, Variable Naming Conventions, Code Organization and Organization of Test Cases***.



# Getting Started

**1. Installation process**
- Before downloading [this Git repo](https://github.com/MareDz/mystoredemo) you should have [Node.js](https://nodejs.org/en/download) installed
- Run following command to install dependencies `npm install`
- Run following command to install PW browsers `npx playwright install`

**2. API Reference**
- API services used on this project are open-source and completely free to use, they are used only for demonstration purpose.
- API [reference](https://randomuser.me/)
- API [reference](https://baconipsum.com/json-api/)

**3. Test Cases**
- Automation tests are based on scenarios displayed in [ExcelTestCases](https://github.com/MareDz/mystoredemo/tree/main/ExcelTestCases) folder.
- To preview test cases please export `.xlsx` file outside of the code editor, if you don’t have appropriate extension installed.



# General 

- Configuration for CI and for Local are located in [essential.config.ts](https://github.com/MareDz/mystoredemo/blob/main/essential.config.ts) file
- To see the test execution in your local browser just change 'headless' argument to 'false'

- All tests for execution are located at [tests/SmokeTests](https://github.com/MareDz/mystoredemo/tree/main/tests/SmokeTests)

- All pages are located in [pages](https://github.com/MareDz/mystoredemo/tree/main/pages)
  - Every page class contains locators and methods that are specific for that page.
  - BasePage is a file/class that is inherited by every other page/class. It contains methods and locators which are used multiple times to make our code easier to understand and maintain.

 - Because I wasn’t able to use some kind of ‘Vault’ services for this project, all Strings are located in [utils/Strings.ts](https://github.com/MareDz/mystoredemo/blob/main/utils/Strings.ts)
 - All of the API GET Methods are located at [utils/API.ts](https://github.com/MareDz/mystoredemo/blob/main/utils/API.ts)

- For CI/CD we are using [Github Actions](https://docs.github.com/en/actions)
- .YML files are located in [github/workflows](https://github.com/MareDz/mystoredemo/tree/main/.github/workflows)
- File [main.yml](https://github.com/MareDz/mystoredemo/blob/main/.github/workflows/main.yml) is configuration file for manual triggering in Pipeline. Same file will be automatically executed on every pull  request.
- File [schedule.yml](https://github.com/MareDz/mystoredemo/blob/main/.github/workflows/schedule.yml) is configuration file for scheduling jobs. By this config. jobs are going to be triggered every day at midnight.
- All ‘workflows runs’ are available in my [GitHub Action](https://github.com/MareDz/mystoredemo/actions) section
- Whenever test Is executed in pipeline, message is sent to Slack channel, where we can see the status of the previous run, and open a HTML report

<img width="488" alt="Screenshot 2023-07-06 at 15 20 51" src="https://github.com/MareDz/mystoredemo/assets/123815122/6f685cc5-89c6-4aba-8218-dcbcbd40bd49"> 
<img width="559" alt="Screenshot 2023-07-06 at 15 21 36" src="https://github.com/MareDz/mystoredemo/assets/123815122/388aafa3-d905-4b7f-a295-b4eefae56b6d">



- To run desired test, please check *'scripts'* in [package.json](https://github.com/MareDz/mystoredemo/blob/main/package.json) file, (e.g. to run ts:001 execute following comand `npm run test:ts001`)
