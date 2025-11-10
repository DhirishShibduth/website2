/**
 * Textarea Component
 *
 * A styled textarea component with reactive forms integration and validation support.
 *
 * @example
 * <textarea uiTextarea [formControl]="messageControl" placeholder="Your message..."></textarea>
 */

import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../utils/cn';

@Component({
  selector: 'textarea[uiTextarea]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor {
  /**
   * Additional custom classes
   */
  @Input() class: string = '';

  /**
   * Placeholder text
   */
  @Input() placeholder: string = '';

  /**
   * Whether the textarea is disabled
   */
  @Input() disabled: boolean = false;

  /**
   * Number of rows
   */
  @Input() rows: number = 3;

  /**
   * Current value
   */
  private _value: string = '';

  /**
   * Callback for value changes
   */
  private onChange: (value: string) => void = () => {};

  /**
   * Callback for touch events
   */
  private onTouched: () => void = () => {};

  /**
   * Binds computed classes to the host element
   */
  @HostBinding('class')
  get classes(): string {
    return cn(
      'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
      'ring-offset-background placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      this.class
    );
  }

  /**
   * Binds the placeholder attribute
   */
  @HostBinding('attr.placeholder')
  get placeholderAttr(): string {
    return this.placeholder;
  }

  /**
   * Binds the disabled attribute
   */
  @HostBinding('attr.disabled')
  get disabledAttr(): boolean | null {
    return this.disabled ? true : null;
  }

  /**
   * Binds the rows attribute
   */
  @HostBinding('attr.rows')
  get rowsAttr(): number {
    return this.rows;
  }

  // ControlValueAccessor implementation

  writeValue(value: string): void {
    this._value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
