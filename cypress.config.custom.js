const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "e5kjfu",
  e2e: {
    baseUrl: "https://telnyx.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});
