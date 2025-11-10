/**
 * Form Description Component
 *
 * Displays helper text or descriptions for form fields.
 *
 * @example
 * <p uiFormDescription>Enter your email address</p>
 */

import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';
import { cn } from '../utils/cn';

@Component({
  selector: '[uiFormDescription]',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDescriptionComponent {
  /**
   * Additional custom classes
   */
  @Input() class: string = '';

  /**
   * Binds computed classes to the host element
   */
  @HostBinding('class')
  get classes(): string {
    return cn('text-sm text-muted-foreground', this.class);
  }
}
