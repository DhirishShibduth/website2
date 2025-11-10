#!/usr/bin/env node

/**
 * Component Library CLI
 *
 * A CLI tool for adding component library components to your Angular project.
 * Follows the copy-and-own philosophy - components are copied into your project
 * rather than installed as dependencies.
 *
 * Usage:
 *   npx component-library init          - Initialize component library in your project
 *   npx component-library add <component> - Add a component to your project
 *   npx component-library add button input dialog - Add multiple components
 */

import { Command } from 'commander';
import { init } from './commands/init.js';
import { add } from './commands/add.js';
import { list } from './commands/list.js';

const program = new Command();

program
  .name('component-library')
  .description('Add component library components to your Angular project')
  .version('0.1.0');

/**
 * Init command - Sets up the project with necessary configuration
 */
program
  .command('init')
  .description('Initialize component library in your project')
  .action(init);

/**
 * Add command - Adds one or more components to the project
 */
program
  .command('add')
  .description('Add components to your project')
  .argument('[components...]', 'Components to add (e.g., button input dialog)')
  .option('-a, --all', 'Add all available components')
  .action(add);

/**
 * List command - Shows all available components
 */
program
  .command('list')
  .description('List all available components')
  .action(list);

program.parse();
