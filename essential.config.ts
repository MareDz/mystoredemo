import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  timeout: 130000,     
  retries: 0,         
  use: {
    headless: true,       // change it to 'false' if you want to see the execution in browser
    actionTimeout: 80000,    
    video: "off",
    screenshot: "only-on-failure"
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