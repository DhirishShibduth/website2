#!/usr/bin/env node

/**
 * shadcn-ng CLI
 *
 * A CLI tool for adding shadcn-angular components to your Angular project.
 * Follows the copy-and-own philosophy - components are copied into your project
 * rather than installed as dependencies.
 *
 * Usage:
 *   npx shadcn-ng init          - Initialize shadcn-angular in your project
 *   npx shadcn-ng add <component> - Add a component to your project
 *   npx shadcn-ng add button input dialog - Add multiple components
 */

import { Command } from 'commander';
import { init } from './commands/init.js';
import { add } from './commands/add.js';
import { list } from './commands/list.js';

const program = new Command();

program
  .name('shadcn-ng')
  .description('Add shadcn-angular components to your Angular project')
  .version('0.1.0');

/**
 * Init command - Sets up the project with necessary configuration
 */
program
  .command('init')
  .description('Initialize shadcn-angular in your project')
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
