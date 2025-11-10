# Quick Start Guide

Get up and running with component-library in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- An Angular 18+ project
- Basic knowledge of Angular and TailwindCSS

## Step-by-Step Installation

### 1. Initialize Your Project

Run this command in your Angular project root:

```bash
npx component-library init
```

You'll be prompted for:
- **Components path** (default: `src/app/components`) - Where to store copied components
- **Utils path** (default: `src/app/lib/utils`) - Where to store utility functions
- **Setup Tailwind** (default: `yes`) - Automatically configure TailwindCSS

This creates:
```
your-project/
├── src/
│   ├── app/
│   │   ├── components/     # (empty, ready for components)
│   │   └── lib/
│   │       └── utils/
│   │           ├── cn.ts   # Class name utility
│   │           └── cva.ts  # Class variance authority
│   └── styles.css          # Updated with design tokens
├── tailwind.config.js      # Tailwind configuration
└── component-library.json          # component-library configuration
```

### 2. Add Your First Component

Add the button component:

```bash
npx component-library add button
```

This copies the button component to `src/app/components/button/`.

### 3. Use the Component

**app.component.ts**
```typescript
import { Component } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">My App</h1>
      <button uiButton variant="default">Click me!</button>
    </div>
  `
})
export class AppComponent {}
```

### 4. Run Your App

```bash
ng serve
```

Visit http://localhost:4200 and you should see your styled button!

## Next Steps

### Add More Components

```bash
# Add individual components
npx component-library add input
npx component-library add dialog
npx component-library add card

# Or add all at once
npx component-library add --all
```

### View Available Components

```bash
npx component-library list
```

### Enable Dark Mode

**app.component.ts**
```typescript
export class AppComponent {
  darkMode = false;

  toggleTheme() {
    this.darkMode = !this.darkMode;
    document.documentElement.classList.toggle('dark', this.darkMode);
  }
}
```

**app.component.html**
```html
<button uiButton (click)="toggleTheme()">
  {{ darkMode ? '☀️' : '🌙' }} Toggle Theme
</button>
```

### Customize Components

Since components are in your project, you can modify them:

**src/app/components/button/button.component.ts**
```typescript
// Add a new variant
const buttonVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: '...',
        // Add your custom variant
        success: 'bg-green-500 text-white hover:bg-green-600',
      }
    }
  }
);
```

Use it:
```html
<button uiButton variant="success">Success!</button>
```

## Common Use Cases

### Form with Input and Button

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ButtonComponent, InputComponent],
  template: `
    <div class="max-w-md mx-auto p-8">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form (submit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input uiInput type="email" [(ngModel)]="email" name="email" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input uiInput type="password" [(ngModel)]="password" name="password" />
        </div>
        <button uiButton type="submit" class="w-full">Sign In</button>
      </form>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';

  onSubmit() {
    console.log('Login:', this.email, this.password);
  }
}
```

### Dialog with Form

```typescript
import { Component } from '@angular/core';
import {
  DialogComponent,
  DialogContentComponent,
  DialogHeaderComponent,
  DialogFooterComponent,
  DialogTitleComponent,
  DialogDescriptionComponent
} from './components/dialog/dialog.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    DialogComponent,
    DialogContentComponent,
    DialogHeaderComponent,
    DialogFooterComponent,
    DialogTitleComponent,
    DialogDescriptionComponent,
    ButtonComponent,
    InputComponent,
  ],
  template: `
    <button uiButton (click)="open = true">Edit Profile</button>

    <ui-dialog [open]="open" (openChange)="open = $event">
      <ui-dialog-content>
        <ui-dialog-header>
          <ui-dialog-title>Edit Profile</ui-dialog-title>
          <ui-dialog-description>
            Update your profile information
          </ui-dialog-description>
        </ui-dialog-header>
        <div class="space-y-4 py-4">
          <input uiInput placeholder="Name" [(ngModel)]="name" />
          <input uiInput type="email" placeholder="Email" [(ngModel)]="email" />
        </div>
        <ui-dialog-footer>
          <button uiButton variant="outline" (click)="open = false">Cancel</button>
          <button uiButton (click)="save()">Save</button>
        </ui-dialog-footer>
      </ui-dialog-content>
    </ui-dialog>
  `
})
export class ProfileComponent {
  open = false;
  name = '';
  email = '';

  save() {
    console.log('Saved:', this.name, this.email);
    this.open = false;
  }
}
```

### Card Grid

```typescript
import { Component } from '@angular/core';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent
} from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';
import { BadgeComponent } from './components/badge/badge.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    CardFooterComponent,
    ButtonComponent,
    BadgeComponent,
  ],
  template: `
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-8">
      <ui-card>
        <ui-card-header>
          <div class="flex justify-between items-start">
            <ui-card-title>Product 1</ui-card-title>
            <span uiBadge variant="default">New</span>
          </div>
          <ui-card-description>
            Description of product 1
          </ui-card-description>
        </ui-card-header>
        <ui-card-content>
          <p class="text-2xl font-bold">$99.99</p>
        </ui-card-content>
        <ui-card-footer>
          <button uiButton class="w-full">Add to Cart</button>
        </ui-card-footer>
      </ui-card>
      <!-- More cards... -->
    </div>
  `
})
export class ProductsComponent {}
```

## Troubleshooting

### Components not styling correctly?

Make sure TailwindCSS is configured:

1. Check `tailwind.config.js` exists
2. Check `src/styles.css` has the design tokens
3. Verify `@tailwind` directives are present
4. Restart `ng serve`

### Import errors?

Check the import paths match your configuration:

```typescript
// If components are in src/app/components/button/
import { ButtonComponent } from './components/button/button.component';

// If you moved them, adjust the path
import { ButtonComponent } from '../shared/ui/button/button.component';
```

### Dark mode not working?

Ensure you have the dark class on the document:

```typescript
document.documentElement.classList.add('dark');
```

And that CSS variables are defined for `.dark` in `src/styles.css`.

## Learning Resources

- **Storybook**: Run the demo app to see all components
- **Component READMEs**: Each component has documentation
- **Source Code**: Components are in your project - read and learn!

## Need Help?

- Check the [main README](./README.md)
- Review [CONTRIBUTING.md](./CONTRIBUTING.md)
- Look at the [demo app](./examples/demo-app)
- Check component README files

Happy coding! 🚀
