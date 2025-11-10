/**
 * Tailwind Configuration for UI Package
 *
 * Extends the shared theme configuration
 */

const sharedConfig = require('../theme/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  content: [
    './src/**/*.{html,ts}',
    './.storybook/**/*.{html,ts,js,tsx}',
  ],
};
