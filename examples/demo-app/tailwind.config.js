/**
 * Tailwind Configuration for Demo App
 *
 * Uses the shared theme configuration from the theme package
 */

const sharedConfig = require('../../packages/theme/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  content: [
    './src/**/*.{html,ts}',
    '../../packages/ui/src/**/*.{html,ts}',
  ],
};
