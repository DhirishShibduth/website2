# component-library

A **modern** component library for **Angular 18+** that combines the power of **TailwindCSS** with the flexibility of the **copy-and-own** philosophy.

## 🎯 Philosophy

Unlike traditional component libraries installed via npm, component-library follows the **copy-and-own** model:

- **Own Your Components**: Components are copied directly into your project
- **Full Control**: Modify, customize, and extend components as needed
- **No Lock-in**: No dependency on external packages for components
- **TypeScript First**: Built with TypeScript and Angular 18+ standalone components
- **Tailwind Powered**: Styled with TailwindCSS using design tokens

## ✨ Features

- 🎨 **Beautiful Components** - Clean, modern design with dark mode support
- 🔧 **Fully Customizable** - Modify components directly in your codebase
- 📦 **CLI Tool** - Easy installation with `npx component-library add [component]`
- 🎭 **Headless Architecture** - Logic separated from styling
- 🌗 **Dark Mode** - Built-in dark mode support with CSS variables
- 📚 **Storybook** - Interactive component documentation
- ⚡ **Angular 18+** - Uses latest Angular features (standalone components)
- 🎯 **Type Safe** - Full TypeScript support

## 📦 Components

- **Button** - Customizable button with multiple variants (default, outline, ghost, etc.)
- **Input** - Styled input with form integration
- **Dialog** - Modal dialog with overlay and animations
- **Card** - Versatile card with header, content, and footer sections
- **Badge** - Small labels for status and categories

## 🛠️ Development Setup

If you're contributing or want to run this project locally:

```bash
# Clone the repository
git clone <repository-url>
cd component-library

# Install dependencies
npm install

# Build the CLI (required before using component-library commands)
npm run build:cli

# Now you can use the CLI locally
npm run component-library init

# Or run Storybook
npm run storybook

# Or run the demo app
npm run demo
```

## 🚀 Quick Start (For End Users)

### Prerequisites

- Node.js 18+
- Angular CLI 18+
- An Angular project

### Step 1: Initialize component-library

Run the initialization command in your Angular project:

```bash
npx component-library init
```

This will:
- Create a `components` directory structure
- Set up utility functions (cn, cva)
- Configure TailwindCSS (optional)
- Add global styles with design tokens

### Step 2: Add Components

Add components to your project:

```bash
# Add a single component
npx component-library add button

# Add multiple components
npx component-library add button input dialog

# Add all components
npx component-library add --all
```

### Step 3: Use Components

Import and use components in your Angular application:

```typescript
import { Component } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <button uiButton variant="default">Click me</button>
  `
})
export class AppComponent {}
```

## 📖 Documentation

### Button Component

```html
<!-- Variants -->
<button uiButton variant="default">Default</button>
<button uiButton variant="destructive">Destructive</button>
<button uiButton variant="outline">Outline</button>
<button uiButton variant="secondary">Secondary</button>
<button uiButton variant="ghost">Ghost</button>
<button uiButton variant="link">Link</button>

<!-- Sizes -->
<button uiButton size="sm">Small</button>
<button uiButton size="default">Default</button>
<button uiButton size="lg">Large</button>
<button uiButton size="icon">Icon</button>
```

### Input Component

```html
<!-- Basic Input -->
<input uiInput type="text" placeholder="Enter text..." />

<!-- With ngModel -->
<input uiInput type="email" [(ngModel)]="email" />

<!-- Textarea -->
<textarea uiInput placeholder="Message..."></textarea>
```

### Dialog Component

```typescript
import {
  DialogComponent,
  DialogContentComponent,
  DialogHeaderComponent,
  DialogFooterComponent,
  DialogTitleComponent,
  DialogDescriptionComponent
} from './components/dialog/dialog.component';
```

```html
<button uiButton (click)="isOpen = true">Open Dialog</button>

<ui-dialog [open]="isOpen" (openChange)="isOpen = $event">
  <ui-dialog-content>
    <ui-dialog-header>
      <ui-dialog-title>Dialog Title</ui-dialog-title>
      <ui-dialog-description>
        Dialog description goes here.
      </ui-dialog-description>
    </ui-dialog-header>
    <div>Dialog content</div>
    <ui-dialog-footer>
      <button uiButton (click)="isOpen = false">Close</button>
    </ui-dialog-footer>
  </ui-dialog-content>
</ui-dialog>
```

### Card Component

```html
<ui-card>
  <ui-card-header>
    <ui-card-title>Card Title</ui-card-title>
    <ui-card-description>Card description</ui-card-description>
  </ui-card-header>
  <ui-card-content>
    <p>Card content goes here</p>
  </ui-card-content>
  <ui-card-footer>
    <button uiButton>Action</button>
  </ui-card-footer>
</ui-card>
```

### Badge Component

```html
<span uiBadge variant="default">Default</span>
<span uiBadge variant="secondary">Secondary</span>
<span uiBadge variant="destructive">Destructive</span>
<span uiBadge variant="outline">Outline</span>
```

## 🎨 Theming

### CSS Variables

The theme uses HSL color values defined as CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  /* ... more variables */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... dark mode variables */
}
```

### Dark Mode

Enable dark mode by adding the `dark` class to the document element:

```typescript
// Toggle dark mode
toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
}
```

### Customization

Since components are copied to your project, you can customize them freely:

1. **Modify Colors**: Update CSS variables in `src/styles.css`
2. **Change Variants**: Edit component variant configurations
3. **Add New Variants**: Extend the `cva` configuration
4. **Custom Styling**: Add your own Tailwind classes

## 🏗️ Project Structure

```
component-library/
├── packages/
│   ├── ui/                   # Component library
│   │   ├── src/
│   │   │   ├── button/       # Button component
│   │   │   ├── input/        # Input component
│   │   │   ├── dialog/       # Dialog component
│   │   │   ├── card/         # Card component
│   │   │   ├── badge/        # Badge component
│   │   │   └── utils/        # Utility functions (cn, cva)
│   │   ├── .storybook/       # Storybook configuration
│   │   └── package.json
│   ├── theme/                # Tailwind theme configuration
│   │   ├── tailwind.config.js
│   │   ├── globals.css
│   │   └── tokens.json
│   ├── cli/                  # CLI tool
│   │   ├── src/
│   │   │   ├── commands/     # CLI commands
│   │   │   └── index.ts
│   │   └── package.json
│   └── utils/                # Shared utilities
└── examples/
    └── demo-app/             # Demo application
```

## 🛠️ Development

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd component-library

# Install dependencies
npm install

# Build packages
npm run build
```

### Run Storybook

```bash
cd packages/ui
npm install
npm run storybook
```

Visit http://localhost:6006 to view the component documentation.

### Run Demo App

```bash
cd examples/demo-app
npm install
npm start
```

Visit http://localhost:4200 to see the demo application.

### Build CLI

```bash
cd packages/cli
npm install
npm run build
```

## 📝 CLI Commands

### `init`

Initialize component-library in your project:

```bash
npx component-library init
```

Options:
- Components path (default: `src/app/components`)
- Utils path (default: `src/app/lib/utils`)
- Setup Tailwind (default: `yes`)

### `add`

Add components to your project:

```bash
# Interactive selection
npx component-library add

# Specific components
npx component-library add button input

# All components
npx component-library add --all
```

### `list`

List all available components:

```bash
npx component-library list
```

## 🎯 Design Tokens

Design tokens are defined in `packages/theme/tokens.json` and can be customized:

```json
{
  "colors": {
    "light": {
      "primary": "240 5.9% 10%",
      "background": "0 0% 100%",
      ...
    },
    "dark": {
      "primary": "0 0% 98%",
      "background": "240 10% 3.9%",
      ...
    }
  }
}
```

## 🔧 Utilities

### `cn` - Class Name Utility

Conditionally join class names:

```typescript
import { cn } from './lib/utils/cn';

const className = cn(
  'base-class',
  condition && 'conditional-class',
  { 'object-class': true }
);
```

### `cva` - Class Variance Authority

Create variant-based components:

```typescript
import { cva } from './lib/utils/cva';

const buttonVariants = cva('base-class', {
  variants: {
    variant: {
      default: 'bg-primary text-white',
      outline: 'border border-primary'
    },
    size: {
      sm: 'px-2 py-1',
      lg: 'px-4 py-2'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm'
  }
});
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this in your projects!

## 🙏 Acknowledgments

- Inspired by [shadcn/ui](https://ui.shadcn.com/) for React
- Built with [Angular](https://angular.dev/)
- Styled with [TailwindCSS](https://tailwindcss.com/)

## 📞 Support

- 📖 [Documentation](./docs)
- 🐛 [Issue Tracker](https://github.com/your-repo/issues)
- 💬 [Discussions](https://github.com/your-repo/discussions)

---

**Made with ❤️ for the Angular community**
