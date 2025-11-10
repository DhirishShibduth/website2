/**
 * Label Component
 *
 * A styled label component for form fields with proper accessibility.
 *
 * @example
 * <label uiLabel for="email">Email address</label>
 */

import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';
import { cn } from '../utils/cn';

@Component({
  selector: 'label[uiLabel]',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  /**
   * Additional custom classes
   */
  @Input() class: string = '';

  /**
   * Whether the label is for a disabled field
   */
  @Input() disabled: boolean = false;

  /**
   * Binds computed classes to the host element
   */
  @HostBinding('class')
  get classes(): string {
    return cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      this.disabled && 'cursor-not-allowed opacity-70',
      this.class
    );
  }
}
