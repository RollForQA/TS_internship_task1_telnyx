const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "e5kjfu",
  e2e: {
    baseUrl: "https://telnyx.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: false,
      json: true,
    },
    setupNodeEvents(on, config) {
      // @cypress/grep plugin for spec-level filtering by tag
      const { plugin } = require("@cypress/grep/plugin");
      plugin(config);
      return config;
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});
