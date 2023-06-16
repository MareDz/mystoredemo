import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = { 

  testDir: './tests/',
  testMatch: ["**.spec.ts"],  // this is only for demo 
  fullyParallel: !true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: process.env.CI ? 'github' : [ ['json', { outputFile: 'report/results.xml' }] ],
  timeout: 130000,     
  reportSlowTests: null,
  use: {
    headless: process.env.CI ? true : true,   
    actionTimeout: 80000,    
    video: "off",
    screenshot: process.env.CI ? "only-on-failure" : "only-on-failure"
  },
  expect: {
    timeout: 20000,
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