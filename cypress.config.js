import { defineConfig } from "cypress";
import codeCoverageTask from "@cypress/code-coverage/task.js";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
});
