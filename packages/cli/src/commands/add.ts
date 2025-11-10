/**
 * Add Command
 *
 * Adds one or more components to the user's Angular project by copying
 * component files from the component library.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Available components with their dependencies
 */
const COMPONENTS_MAP = {
  button: {
    name: 'Button',
    files: ['button.component.ts'],
    dependencies: [],
    description: 'Customizable button with multiple variants',
  },
  input: {
    name: 'Input',
    files: ['input.component.ts'],
    dependencies: [],
    description: 'Styled input component for forms',
  },
  dialog: {
    name: 'Dialog',
    files: ['dialog.component.ts'],
    dependencies: [],
    description: 'Modal dialog with overlay and animations',
  },
  card: {
    name: 'Card',
    files: ['card.component.ts'],
    dependencies: [],
    description: 'Versatile card component with sections',
  },
  badge: {
    name: 'Badge',
    files: ['badge.component.ts'],
    dependencies: [],
    description: 'Small label for status or categories',
  },
  label: {
    name: 'Label',
    files: ['label.component.ts'],
    dependencies: [],
    description: 'Accessible form label component',
  },
  'form-description': {
    name: 'FormDescription',
    files: ['form-description.component.ts'],
    dependencies: [],
    description: 'Helper text for form fields',
  },
  'form-message': {
    name: 'FormMessage',
    files: ['form-message.component.ts'],
    dependencies: [],
    description: 'Validation error messages',
  },
  checkbox: {
    name: 'Checkbox',
    files: ['checkbox.component.ts'],
    dependencies: [],
    description: 'Checkbox with reactive forms support',
  },
  radio: {
    name: 'Radio',
    files: ['radio.component.ts'],
    dependencies: [],
    description: 'Radio button with reactive forms support',
  },
  switch: {
    name: 'Switch',
    files: ['switch.component.ts'],
    dependencies: [],
    description: 'Toggle switch with reactive forms support',
  },
  textarea: {
    name: 'Textarea',
    files: ['textarea.component.ts'],
    dependencies: [],
    description: 'Multi-line text input with validation',
  },
  select: {
    name: 'Select',
    files: ['select.component.ts'],
    dependencies: [],
    description: 'Custom select dropdown with reactive forms',
  },
};

/**
 * Reads the project configuration
 */
function getConfig() {
  const configPath = path.join(process.cwd(), 'component-library.json');

  if (!fs.existsSync(configPath)) {
    console.log(chalk.red('\n❌ Configuration file not found!'));
    console.log(chalk.yellow('Please run: npx component-library init\n'));
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

/**
 * Adds components to the project
 */
export async function add(
  components: string[],
  options: { all?: boolean }
) {
  console.log(chalk.bold('\n📦 Adding components to your project\n'));

  const config = getConfig();
  let selectedComponents = components;

  // If --all flag is used, add all components
  if (options.all) {
    selectedComponents = Object.keys(COMPONENTS_MAP);
  }

  // If no components specified, prompt user to select
  if (!selectedComponents || selectedComponents.length === 0) {
    const response = await prompts({
      type: 'multiselect',
      name: 'components',
      message: 'Which components would you like to add?',
      choices: Object.entries(COMPONENTS_MAP).map(([key, value]) => ({
        title: value.name,
        description: value.description,
        value: key,
      })),
    });

    if (!response.components || response.components.length === 0) {
      console.log(chalk.yellow('\n⚠️  No components selected\n'));
      process.exit(0);
    }

    selectedComponents = response.components;
  }

  // Validate components
  const invalidComponents = selectedComponents.filter(
    (c) => !COMPONENTS_MAP[c as keyof typeof COMPONENTS_MAP]
  );

  if (invalidComponents.length > 0) {
    console.log(chalk.red(`\n❌ Invalid components: ${invalidComponents.join(', ')}`));
    console.log(chalk.yellow('Run: npx component-library list to see available components\n'));
    process.exit(1);
  }

  const spinner = ora('Adding components...').start();

  try {
    const componentsDir = path.join(process.cwd(), config.componentsPath);
    fs.mkdirSync(componentsDir, { recursive: true });

    let addedCount = 0;

    for (const componentName of selectedComponents) {
      const component = COMPONENTS_MAP[componentName as keyof typeof COMPONENTS_MAP];
      const componentDir = path.join(componentsDir, componentName);

      fs.mkdirSync(componentDir, { recursive: true });

      // Copy component files
      for (const file of component.files) {
        const sourcePath = path.join(
          __dirname,
          '../../../ui/src',
          componentName,
          file
        );

        const destPath = path.join(componentDir, file);

        if (fs.existsSync(sourcePath)) {
          // Read the source file
          let content = fs.readFileSync(sourcePath, 'utf-8');

          // Update import paths
          content = updateImportPaths(content, config.utilsPath);

          fs.writeFileSync(destPath, content);
        } else {
          // Create component from template
          createComponentFromTemplate(componentName, destPath);
        }
      }

      addedCount++;
    }

    spinner.succeed(
      chalk.green(`✅ Successfully added ${addedCount} component(s)!`)
    );

    console.log(chalk.bold('\n📝 Next steps:\n'));
    console.log('  1. Import the components in your Angular modules or components');
    console.log('  2. Customize the components to fit your needs');
    console.log('  3. You own these files - modify them as you like!\n');

    // Show import examples
    console.log(chalk.bold('Import example:\n'));
    selectedComponents.forEach((componentName) => {
      const component = COMPONENTS_MAP[componentName as keyof typeof COMPONENTS_MAP];
      const componentPath = `${config.componentsPath}/${componentName}/${component.files[0].replace('.ts', '')}`;
      console.log(
        chalk.cyan(
          `  import { ${component.name}Component } from '${componentPath}';`
        )
      );
    });
    console.log();
  } catch (error) {
    spinner.fail(chalk.red('Failed to add components'));
    console.error(error);
    process.exit(1);
  }
}

/**
 * Updates import paths in component files to use the project's utils path
 */
function updateImportPaths(content: string, utilsPath: string): string {
  // Convert absolute path to relative import
  const relativeUtilsPath = '../' + utilsPath.split('/').slice(-2).join('/');

  // Update utility imports
  content = content.replace(
    /from ['"]\.\.\/utils\/(.*)['"]/g,
    `from '${relativeUtilsPath}/$1'`
  );

  return content;
}

/**
 * Creates a component from template if source doesn't exist
 */
function createComponentFromTemplate(componentName: string, destPath: string) {
  // This is a fallback - in practice, the source files should exist
  const templates: Record<string, string> = {
    button: `import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { cva } from '../../lib/utils/cva';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-input bg-background hover:bg-accent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

@Component({
  selector: 'button[uiButton]',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() variant: 'default' | 'outline' = 'default';
  @Input() size: 'default' | 'sm' | 'lg' = 'default';
  @Input() class: string = '';

  @HostBinding('class')
  get classes(): string {
    return buttonVariants({ variant: this.variant, size: this.size }) + ' ' + this.class;
  }
}
`,
  };

  const template = templates[componentName];
  if (template) {
    fs.writeFileSync(destPath, template);
  }
}
