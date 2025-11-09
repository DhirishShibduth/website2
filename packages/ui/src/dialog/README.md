# Dialog Component

A modal dialog component with backdrop and animation support.

## Usage

```typescript
import {
  DialogComponent,
  DialogContentComponent,
  DialogHeaderComponent,
  DialogFooterComponent,
  DialogTitleComponent,
  DialogDescriptionComponent
} from '@shadcn-angular/ui/dialog';
import { ButtonComponent } from '@shadcn-angular/ui/button';

@Component({
  standalone: true,
  imports: [
    DialogComponent,
    DialogContentComponent,
    DialogHeaderComponent,
    DialogFooterComponent,
    DialogTitleComponent,
    DialogDescriptionComponent,
    ButtonComponent
  ],
  template: `
    <button uiButton (click)="isOpen = true">Open Dialog</button>

    <ui-dialog [open]="isOpen" (openChange)="isOpen = $event">
      <ui-dialog-content>
        <ui-dialog-header>
          <ui-dialog-title>Dialog Title</ui-dialog-title>
          <ui-dialog-description>
            This is a description of the dialog.
          </ui-dialog-description>
        </ui-dialog-header>
        <div>
          <p>Your dialog content goes here.</p>
        </div>
        <ui-dialog-footer>
          <button uiButton variant="outline" (click)="isOpen = false">
            Cancel
          </button>
          <button uiButton (click)="confirm()">Confirm</button>
        </ui-dialog-footer>
      </ui-dialog-content>
    </ui-dialog>
  `
})
export class MyComponent {
  isOpen = false;

  confirm() {
    console.log('Confirmed!');
    this.isOpen = false;
  }
}
```

## Examples

### Basic Dialog

```html
<button uiButton (click)="showDialog = true">Open</button>

<ui-dialog [open]="showDialog" (openChange)="showDialog = $event">
  <ui-dialog-content>
    <ui-dialog-header>
      <ui-dialog-title>Are you sure?</ui-dialog-title>
      <ui-dialog-description>
        This action cannot be undone.
      </ui-dialog-description>
    </ui-dialog-header>
  </ui-dialog-content>
</ui-dialog>
```

### With Form

```html
<ui-dialog [open]="isOpen" (openChange)="isOpen = $event">
  <ui-dialog-content>
    <ui-dialog-header>
      <ui-dialog-title>Edit Profile</ui-dialog-title>
      <ui-dialog-description>
        Make changes to your profile here.
      </ui-dialog-description>
    </ui-dialog-header>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <label for="name" class="text-right">Name</label>
        <input uiInput id="name" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <label for="username" class="text-right">Username</label>
        <input uiInput id="username" class="col-span-3" />
      </div>
    </div>
    <ui-dialog-footer>
      <button uiButton type="submit">Save changes</button>
    </ui-dialog-footer>
  </ui-dialog-content>
</ui-dialog>
```

### Prevent Overlay Close

```html
<ui-dialog
  [open]="isOpen"
  (openChange)="isOpen = $event"
  [closeOnOverlayClick]="false"
>
  <ui-dialog-content>
    <ui-dialog-header>
      <ui-dialog-title>Important Action</ui-dialog-title>
    </ui-dialog-header>
    <p>You must explicitly choose an option.</p>
    <ui-dialog-footer>
      <button uiButton (click)="isOpen = false">Close</button>
    </ui-dialog-footer>
  </ui-dialog-content>
</ui-dialog>
```

## Components

### ui-dialog

The main dialog container.

**Inputs:**
- `open: boolean` - Controls dialog visibility
- `closeOnOverlayClick: boolean` - Whether clicking overlay closes dialog (default: true)

**Outputs:**
- `openChange: EventEmitter<boolean>` - Emits when dialog open state changes

### ui-dialog-content

The dialog content container with styling.

**Inputs:**
- `class: string` - Additional CSS classes

### ui-dialog-header

Container for dialog title and description.

**Inputs:**
- `class: string` - Additional CSS classes

### ui-dialog-footer

Container for dialog actions (buttons).

**Inputs:**
- `class: string` - Additional CSS classes

### ui-dialog-title

Styled heading for the dialog.

**Inputs:**
- `class: string` - Additional CSS classes

### ui-dialog-description

Styled description text for the dialog.

**Inputs:**
- `class: string` - Additional CSS classes

## Accessibility

- Uses `role="dialog"` and `aria-modal="true"`
- Traps focus within the dialog when open
- Closes on Escape key press
- Backdrop prevents interaction with underlying content
- Supports keyboard navigation
