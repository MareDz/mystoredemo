import { PlaywrightTestConfig } from "@playwright/test";
import { devices } from '@playwright/test';


const config: PlaywrightTestConfig = { 

  testDir: './tests/SmokeTests',
  testMatch: [ 
  'SmokeTests/CreateUserAndUpdateUserData.spec.ts',
  'SmokeTests/DeleteAdressAndBuyAccessorie.spec.ts',
  'SmokeTests/VerifyCalculationAndDeleteItems.spec.ts'
  ],
  /*
  testMatch: ["**.test.ts"],   -> this will run all test in this
  */
  fullyParallel: !true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: process.env.CI ? 'github' : 'list',
  timeout: 130000,     
  use: {
    headless: process.env.CI ? true : false,       // change it to 'false' if you want to see the execution in browser
    actionTimeout: 80000,    
    video: "off",
    screenshot: process.env.CI ? "off" : "only-on-failure"
  },
  expect: {
    timeout: 15000,
  },
  projects: [
    {
      name: "Chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "Firefox",
      use: { browserName: "firefox" },
    },
	{
      name: "Webkit",
      use: { browserName: "webkit" },
    }
  ]
}
export default config;