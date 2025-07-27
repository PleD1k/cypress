const { defineConfig } = require('cypress');

module.exports = defineConfig({
  pageLoadTimeout: 10000,
  defaultCommandTimeout: 10000,
  video: true,
  screenshotOnRunFailure: true,

  e2e: {
    baseUrl: 'https://www.drive2.ru',
    specPattern: 'cypress/e2e/**/*.js',
    supportFile: 'cypress/support/e2e.js',
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
    },
  },
});
