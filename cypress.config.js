const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.greyhound.com',
    setupNodeEvents(on, config) {
    },
    viewportWidth: 1280,
    viewportHeight: 720
  },
});
