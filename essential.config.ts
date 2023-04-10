import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  timeout: 30000,     // number of mil. secs. for every test
  retries: 0,         // number of retries on failing test
  use: {
    //ignoreHTTPSErrors: true,     
    //viewport: {width 1280, height 720},   // dimensions of the browser windows
    headless: false,       // headless-true we will se the browser; headless-false we are not going to see the browser
    actionTimeout:35000,    // timeout for all pw functions e.g. click, type, wait for selector....
    video: "off",
    screenshot: "only-on-failure"
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