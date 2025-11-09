/**
 * Badge Component
 *
 * A small label component for displaying status, categories, or tags.
 *
 * @example
 * <span uiBadge>Default</span>
 * <span uiBadge variant="destructive">Error</span>
 * <span uiBadge variant="outline">Outline</span>
 */

import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';
import { cva } from '../utils/cva';

/**
 * Badge variant configuration
 */
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

@Component({
  selector: 'span[uiBadge], div[uiBadge]',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  /**
   * The visual variant of the badge
   * @default 'default'
   */
  @Input() variant: BadgeVariant = 'default';

  /**
   * Additional custom classes
   */
  @Input() class: string = '';

  /**
   * Binds computed classes to the host element
   */
  @HostBinding('class')
  get classes(): string {
    return badgeVariants({ variant: this.variant }) + ' ' + this.class;
  }
}
