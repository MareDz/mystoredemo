import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = { 

  testDir: './tests/',
  testMatch: ["**.spec.ts"],  
  fullyParallel: !true,
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: process.env.CI ? [['html', { open: 'never' }]] : 'line',
  timeout: 130000,     
  reportSlowTests: null,
  
  use: {
    headless: process.env.CI ? true : true, 

    actionTimeout: 1000 * 50,    
    video: "off",
    screenshot: process.env.CI ? "only-on-failure" : "only-on-failure"
  },
  expect: {
    timeout: 1000 * 50,
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