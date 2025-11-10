# Contributing to component-library

Thank you for your interest in contributing to component-library! This guide will help you get started.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- Angular CLI 18+

### Setup Development Environment

1. **Fork and Clone**

```bash
git clone https://github.com/your-username/component-library.git
cd component-library
```

2. **Install Dependencies**

```bash
npm install
```

3. **Build Packages**

```bash
npm run build
```

## 📦 Project Structure

```
component-library/
├── packages/
│   ├── ui/          # Component library
│   ├── theme/       # Tailwind configuration
│   ├── cli/         # CLI tool
│   └── utils/       # Shared utilities
└── examples/
    └── demo-app/    # Demo application
```

## 🛠️ Development Workflow

### Adding a New Component

1. **Create Component Directory**

```bash
cd packages/ui/src
mkdir my-component
```

2. **Create Component Files**

Create the following files:
- `my-component.component.ts` - Main component
- `my-component.component.spec.ts` - Tests
- `my-component.component.stories.ts` - Storybook stories
- `README.md` - Component documentation

3. **Component Template**

```typescript
/**
 * MyComponent Component
 *
 * Description of what this component does
 */

import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';
import { cva } from '../utils/cva';

const myComponentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'variant-classes',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'ui-my-component',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponentComponent {
  @Input() variant: 'default' = 'default';
  @Input() class: string = '';

  @HostBinding('class')
  get classes(): string {
    return myComponentVariants({ variant: this.variant }) + ' ' + this.class;
  }
}
```

4. **Export from Index**

Add to `packages/ui/src/index.ts`:

```typescript
export { MyComponentComponent } from './my-component/my-component.component';
```

5. **Update CLI**

Add to `packages/cli/src/commands/add.ts`:

```typescript
const COMPONENTS_MAP = {
  // ... existing components
  'my-component': {
    name: 'MyComponent',
    files: ['my-component.component.ts'],
    dependencies: [],
    description: 'Description of component',
  },
};
```

### Testing Components

Run component tests:

```bash
cd packages/ui
npm test
```

### Preview in Storybook

```bash
cd packages/ui
npm run storybook
```

Visit http://localhost:6006

### Test in Demo App

```bash
cd examples/demo-app
npm start
```

Visit http://localhost:4200

## 📝 Code Style

### TypeScript

- Use TypeScript strict mode
- Add JSDoc comments for all public APIs
- Use meaningful variable names
- Follow Angular style guide

### Angular

- Use standalone components
- Use OnPush change detection
- Keep components focused and small
- Use HostBinding for class management

### TailwindCSS

- Use design tokens (CSS variables)
- Prefer utility classes over custom CSS
- Group related utilities
- Use the `cn()` utility for conditional classes

### Example

```typescript
@Component({
  selector: 'ui-button',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'default';

  @HostBinding('class')
  get classes(): string {
    return cn(
      'base-class',
      variantClasses[this.variant]
    );
  }
}
```

## 🧪 Testing Guidelines

### Unit Tests

- Test all component variants
- Test input/output behavior
- Test edge cases
- Aim for >80% coverage

### Example Test

```typescript
describe('MyComponent', () => {
  it('should apply variant classes', () => {
    component.variant = 'outline';
    fixture.detectChanges();
    expect(compiled.className).toContain('border');
  });
});
```

## 📖 Documentation

### Component Documentation

Each component should have:

1. **README.md** with:
   - Overview
   - Usage examples
   - API reference
   - Accessibility notes

2. **JSDoc comments** with:
   - Component description
   - @example tags
   - @Input/@Output descriptions

3. **Storybook stories** with:
   - Default story
   - Variant stories
   - Interactive controls

## 🔄 Pull Request Process

1. **Create a Branch**

```bash
git checkout -b feature/my-new-component
```

2. **Make Changes**

- Write clean, documented code
- Add tests
- Update documentation
- Add Storybook stories

3. **Test Everything**

```bash
npm run build
npm test
```

4. **Commit Changes**

Use conventional commits:

```bash
git commit -m "feat: add new component"
git commit -m "fix: resolve button styling issue"
git commit -m "docs: update README"
```

Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (formatting)
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

5. **Push and Create PR**

```bash
git push origin feature/my-new-component
```

Then create a Pull Request on GitHub.

## 🎨 Design Principles

### Component Philosophy

1. **Copy-and-Own**: Users should own their components
2. **Customizable**: Easy to modify and extend
3. **Accessible**: Follow WCAG guidelines
4. **Type-Safe**: Full TypeScript support
5. **Standalone**: Use Angular standalone APIs

### Styling Principles

1. **Tailwind First**: Use Tailwind utilities
2. **Design Tokens**: Use CSS variables
3. **Dark Mode**: Support dark mode
4. **Responsive**: Mobile-first design
5. **Consistent**: Follow design system

## 🐛 Bug Reports

### Before Submitting

- Check existing issues
- Test in latest version
- Gather reproduction steps

### Bug Report Template

```markdown
**Description**
Clear description of the bug

**To Reproduce**
1. Step 1
2. Step 2
3. See error

**Expected Behavior**
What should happen

**Environment**
- Angular version:
- component-library version:
- Browser:
```

## 💡 Feature Requests

### Before Submitting

- Check existing requests
- Consider if it fits the project philosophy
- Provide use cases

### Feature Request Template

```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why is this needed?

**Proposed Solution**
How could it work?

**Alternatives**
Other approaches considered
```

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You

Your contributions make component-library better for everyone!
