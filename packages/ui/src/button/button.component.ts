/**
 * Button Component
 *
 * A highly customizable button component with multiple variants, sizes, and states.
 * Follows the headless component architecture with Tailwind styling.
 *
 * @example
 * <button uiButton variant="default" size="md">Click me</button>
 * <button uiButton variant="outline">Outline Button</button>
 * <button uiButton variant="ghost" size="sm">Small Ghost</button>
 */

import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';
import { cva } from '../utils/cva';

/**
 * Button variant configuration using CVA (Class Variance Authority)
 * Defines all possible button styles based on variant, size, and combinations
 */
const buttonVariants = cva(
  // Base styles applied to all buttons
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

@Component({
  selector: 'button[uiButton], a[uiButton]',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  /**
   * The visual variant of the button
   * @default 'default'
   */
  @Input() variant: ButtonVariant = 'default';

  /**
   * The size of the button
   * @default 'default'
   */
  @Input() size: ButtonSize = 'default';

  /**
   * Additional custom classes to apply
   */
  @Input() class: string = '';

  /**
   * Binds computed classes to the host element
   */
  @HostBinding('class')
  get classes(): string {
    return buttonVariants({ variant: this.variant, size: this.size }) + ' ' + this.class;
  }
}
