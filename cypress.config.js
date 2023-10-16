const { defineConfig } = require("cypress");

module.exports = defineConfig({
 
  viewportHeight: 1024,
  viewportWidth: 1366,
  e2e: {
    experimentalStudio: true,
    baseUrl: "https://isotopedemo.loc/en",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
