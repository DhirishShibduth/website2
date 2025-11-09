# Input Component

A styled input component that works seamlessly with Angular forms.

## Usage

```typescript
import { InputComponent } from '@shadcn-angular/ui/input';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [InputComponent, FormsModule],
  template: `
    <input uiInput type="text" [(ngModel)]="value" />
  `
})
export class MyComponent {
  value = '';
}
```

## Examples

### Basic Input

```html
<input uiInput type="text" placeholder="Enter your name..." />
```

### With ngModel (Template-driven)

```html
<input uiInput type="email" [(ngModel)]="email" placeholder="Email" />
```

### With FormControl (Reactive)

```typescript
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  template: `
    <input uiInput [formControl]="nameControl" />
  `
})
export class MyComponent {
  nameControl = new FormControl('');
}
```

### Different Types

```html
<!-- Text -->
<input uiInput type="text" placeholder="Text input" />

<!-- Email -->
<input uiInput type="email" placeholder="Email input" />

<!-- Password -->
<input uiInput type="password" placeholder="Password" />

<!-- Number -->
<input uiInput type="number" placeholder="Number" />

<!-- Date -->
<input uiInput type="date" />
```

### Textarea

```html
<textarea uiInput placeholder="Enter your message..."></textarea>
```

### Disabled State

```html
<input uiInput type="text" [disabled]="true" placeholder="Disabled" />
```

### Custom Classes

```html
<input uiInput class="max-w-md" type="text" />
```

### With Label

```html
<div class="grid w-full max-w-sm items-center gap-1.5">
  <label for="email" class="text-sm font-medium">Email</label>
  <input uiInput type="email" id="email" placeholder="Email" />
</div>
```

## API

### Inputs

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | HTML input type |
| `placeholder` | `string` | `''` | Placeholder text |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `class` | `string` | `''` | Additional CSS classes |

## Accessibility

- Supports all standard HTML input attributes
- Works with Angular forms (template-driven and reactive)
- Proper disabled state handling
- Focus-visible ring for keyboard navigation
- Compatible with labels using `for` attribute
