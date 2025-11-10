/**
 * @component-library/ui
 *
 * A modern component library for Angular with Tailwind CSS.
 * Provides headless, customizable components following the copy-and-own philosophy.
 *
 * @packageDocumentation
 */

// Utilities
export { cn } from './utils/cn';
export { cva } from './utils/cva';

// Button Component
export { ButtonComponent } from './button/button.component';
export type { ButtonVariant, ButtonSize } from './button/button.component';

// Input Component
export { InputComponent } from './input/input.component';

// Dialog Components
export {
  DialogComponent,
  DialogContentComponent,
  DialogHeaderComponent,
  DialogFooterComponent,
  DialogTitleComponent,
  DialogDescriptionComponent,
} from './dialog/dialog.component';

// Card Components
export {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent,
} from './card/card.component';

// Badge Component
export { BadgeComponent } from './badge/badge.component';
export type { BadgeVariant } from './badge/badge.component';

// Form Components
export { LabelComponent } from './label/label.component';
export { FormDescriptionComponent } from './form-description/form-description.component';
export { FormMessageComponent } from './form-message/form-message.component';

// Form Input Components
export { CheckboxComponent } from './checkbox/checkbox.component';
export { RadioComponent } from './radio/radio.component';
export { SwitchComponent } from './switch/switch.component';
export { TextareaComponent } from './textarea/textarea.component';

// Select Components
export {
  SelectComponent,
  SelectOptionComponent,
} from './select/select.component';
