# Button Component

A customizable button component with multiple variants and sizes.

## Usage

```typescript
import { ButtonComponent } from '@shadcn-angular/ui/button';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <button uiButton>Click me</button>
  `
})
export class MyComponent {}
```

## Examples

### Variants

```html
<!-- Default variant -->
<button uiButton variant="default">Default</button>

<!-- Destructive variant -->
<button uiButton variant="destructive">Destructive</button>

<!-- Outline variant -->
<button uiButton variant="outline">Outline</button>

<!-- Secondary variant -->
<button uiButton variant="secondary">Secondary</button>

<!-- Ghost variant -->
<button uiButton variant="ghost">Ghost</button>

<!-- Link variant -->
<button uiButton variant="link">Link</button>
```

### Sizes

```html
<!-- Small -->
<button uiButton size="sm">Small</button>

<!-- Default -->
<button uiButton size="default">Default</button>

<!-- Large -->
<button uiButton size="lg">Large</button>

<!-- Icon -->
<button uiButton size="icon">
  <svg>...</svg>
</button>
```

### With Icons

```html
<button uiButton>
  <svg class="mr-2 h-4 w-4">...</svg>
  Login
</button>
```

### Custom Classes

```html
<button uiButton class="w-full">
  Full Width Button
</button>
```

## API

### Inputs

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ButtonVariant` | `'default'` | The visual variant of the button |
| `size` | `ButtonSize` | `'default'` | The size of the button |
| `class` | `string` | `''` | Additional CSS classes |

### Types

```typescript
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';
```

## Accessibility

- Uses semantic `<button>` or `<a>` elements
- Supports all native button attributes
- Includes focus-visible styles for keyboard navigation
- Disabled state properly communicated to screen readers
