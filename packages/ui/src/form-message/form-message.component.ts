/**
 * Form Message Component
 *
 * Displays validation error messages for form fields.
 *
 * @example
 * <p uiFormMessage *ngIf="emailControl.errors?.['required']">
 *   Email is required
 * </p>
 */

import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';
import { cn } from '../utils/cn';

@Component({
  selector: '[uiFormMessage]',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormMessageComponent {
  /**
   * Additional custom classes
   */
  @Input() class: string = '';

  /**
   * Error type (for semantic purposes)
   */
  @Input() error: boolean = true;

  /**
   * Binds computed classes to the host element
   */
  @HostBinding('class')
  get classes(): string {
    return cn(
      'text-sm font-medium',
      this.error ? 'text-destructive' : 'text-muted-foreground',
      this.class
    );
  }
}
