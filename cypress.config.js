const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const logger = require('./cypress/utils/logger');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Allure integration
      allureWriter(on, config);

      // Winston logger integration
      on('task', {
        log(message) {
          logger.info(message);
          return null;
        },
        error(message) {
          logger.error(message);
          return null;
        },
      });

      return config;
    },
    baseUrl: 'https://www.drive2.ru',
    video: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos'
  },
});
