/**
 * Init Command
 *
 * Initializes component library in an Angular project by:
 * 1. Creating components directory structure
 * 2. Copying utility functions (cn, cva)
 * 3. Setting up Tailwind configuration
 * 4. Creating global CSS with design tokens
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
 * Initializes the project with component library configuration
 */
export async function init() {
  console.log(chalk.bold('\n🎨 Component Library initialization\n'));

  // Prompt for configuration
  const response = await prompts([
    {
      type: 'text',
      name: 'componentsPath',
      message: 'Where would you like to store your components?',
      initial: 'src/app/components',
    },
    {
      type: 'text',
      name: 'utilsPath',
      message: 'Where would you like to store utility functions?',
      initial: 'src/app/lib/utils',
    },
    {
      type: 'confirm',
      name: 'setupTailwind',
      message: 'Would you like to set up Tailwind CSS?',
      initial: true,
    },
  ]);

  if (!response.componentsPath || !response.utilsPath) {
    console.log(chalk.red('\n❌ Initialization cancelled\n'));
    process.exit(0);
  }

  const spinner = ora('Initializing component library...').start();

  try {
    // Create directories
    const componentsDir = path.join(process.cwd(), response.componentsPath);
    const utilsDir = path.join(process.cwd(), response.utilsPath);

    fs.mkdirSync(componentsDir, { recursive: true });
    fs.mkdirSync(utilsDir, { recursive: true });

    // Copy utility files
    const sourceUtilsDir = path.join(__dirname, '../../../ui/src/utils');
    const cnSource = path.join(sourceUtilsDir, 'cn.ts');
    const cvaSource = path.join(sourceUtilsDir, 'cva.ts');

    if (fs.existsSync(cnSource)) {
      fs.copyFileSync(cnSource, path.join(utilsDir, 'cn.ts'));
    } else {
      // Create cn.ts if source doesn't exist
      createCnUtil(path.join(utilsDir, 'cn.ts'));
    }

    if (fs.existsSync(cvaSource)) {
      fs.copyFileSync(cvaSource, path.join(utilsDir, 'cva.ts'));
    } else {
      // Create cva.ts if source doesn't exist
      createCvaUtil(path.join(utilsDir, 'cva.ts'));
    }

    // Set up Tailwind if requested
    if (response.setupTailwind) {
      setupTailwindConfig();
      createGlobalStyles();
    }

    // Create config file
    const config = {
      componentsPath: response.componentsPath,
      utilsPath: response.utilsPath,
    };

    fs.writeFileSync(
      path.join(process.cwd(), 'component-library.json'),
      JSON.stringify(config, null, 2)
    );

    spinner.succeed(chalk.green('✅ Initialization complete!'));

    console.log(chalk.bold('\n📦 What\'s next?\n'));
    console.log(`  ${chalk.cyan('npx component-library add button')} - Add the button component`);
    console.log(`  ${chalk.cyan('npx component-library list')} - View all available components`);
    console.log(`  ${chalk.cyan('npx component-library add --all')} - Add all components\n`);
  } catch (error) {
    spinner.fail(chalk.red('Initialization failed'));
    console.error(error);
    process.exit(1);
  }
}

/**
 * Creates the cn utility function
 */
function createCnUtil(filePath: string) {
  const content = `/**
 * Class Name Utility (cn)
 *
 * A simple utility for conditionally joining class names.
 */

type ClassValue =
  | ClassValue[]
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: boolean };

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(' ');
}
`;

  fs.writeFileSync(filePath, content);
}

/**
 * Creates the cva utility function
 */
function createCvaUtil(filePath: string) {
  const content = `/**
 * Class Variance Authority (CVA)
 *
 * A utility for managing component variants with type safety.
 */

import { cn } from './cn';

type VariantConfig<T extends Record<string, Record<string, string>>> = {
  variants: T;
  defaultVariants?: Partial<{ [K in keyof T]: keyof T[K] }>;
  compoundVariants?: Array<
    Partial<{ [K in keyof T]: keyof T[K] }> & { class: string }
  >;
};

type VariantProps<T extends Record<string, Record<string, string>>> = Partial<{
  [K in keyof T]: keyof T[K];
}>;

export function cva<T extends Record<string, Record<string, string>>>(
  base: string,
  config?: VariantConfig<T>
) {
  return (props?: VariantProps<T>): string => {
    if (!config) return base;

    const classes: string[] = [base];
    const mergedProps = {
      ...config.defaultVariants,
      ...props,
    } as VariantProps<T>;

    for (const [variantKey, variantValue] of Object.entries(mergedProps)) {
      if (variantValue && config.variants[variantKey]) {
        const variantClass = config.variants[variantKey][variantValue as string];
        if (variantClass) {
          classes.push(variantClass);
        }
      }
    }

    if (config.compoundVariants) {
      for (const compound of config.compoundVariants) {
        const { class: compoundClass, ...compoundProps } = compound;
        const matches = Object.entries(compoundProps).every(
          ([key, value]) => mergedProps[key as keyof typeof mergedProps] === value
        );
        if (matches) {
          classes.push(compoundClass);
        }
      }
    }

    return cn(...classes);
  };
}
`;

  fs.writeFileSync(filePath, content);
}

/**
 * Sets up Tailwind configuration
 */
function setupTailwindConfig() {
  const tailwindConfigPath = path.join(process.cwd(), 'tailwind.config.js');

  const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
`;

  fs.writeFileSync(tailwindConfigPath, config);
}

/**
 * Creates global styles with CSS variables
 */
function createGlobalStyles() {
  const stylesPath = path.join(process.cwd(), 'src/styles.css');
  let existingStyles = '';

  if (fs.existsSync(stylesPath)) {
    existingStyles = fs.readFileSync(stylesPath, 'utf-8');
  }

  const globalStyles = `
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;

  if (!existingStyles.includes('@tailwind base')) {
    fs.writeFileSync(stylesPath, globalStyles + '\n' + existingStyles);
  }
}
