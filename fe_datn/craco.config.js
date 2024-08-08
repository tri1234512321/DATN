/** @format */

// craco.config.js
const path = require("path");

module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `@import "@/styles/_variables.scss";`,
      },
    },
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
