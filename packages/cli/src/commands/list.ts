/**
 * List Command
 *
 * Displays all available components with descriptions
 */

import chalk from 'chalk';

/**
 * Lists all available components
 */
export function list() {
  console.log(chalk.bold('\n📋 Available Components\n'));

  const components = [
    {
      name: 'button',
      displayName: 'Button',
      description: 'Customizable button with multiple variants and sizes',
    },
    {
      name: 'input',
      displayName: 'Input',
      description: 'Styled input component with form integration',
    },
    {
      name: 'dialog',
      displayName: 'Dialog',
      description: 'Modal dialog with overlay, header, and footer',
    },
    {
      name: 'card',
      displayName: 'Card',
      description: 'Versatile card component with header, content, and footer',
    },
    {
      name: 'badge',
      displayName: 'Badge',
      description: 'Small label for displaying status or categories',
    },
  ];

  components.forEach((component) => {
    console.log(chalk.cyan(`  ${component.displayName.padEnd(15)}`), component.description);
  });

  console.log(chalk.bold('\n📦 Usage:\n'));
  console.log(`  ${chalk.cyan('npx component-library add button')}     - Add a single component`);
  console.log(`  ${chalk.cyan('npx component-library add button input')} - Add multiple components`);
  console.log(`  ${chalk.cyan('npx component-library add --all')}       - Add all components\n`);
}
