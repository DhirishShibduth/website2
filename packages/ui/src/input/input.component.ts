/**
 * Input Component
 *
 * A styled input component that integrates with Angular forms.
 * Supports both template-driven and reactive forms.
 *
 * @example
 * <input uiInput type="text" placeholder="Enter text..." />
 * <input uiInput type="email" [(ngModel)]="email" />
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

/**
 * Base input classes using Tailwind
 */
const inputClasses = cn(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
  'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
  'placeholder:text-muted-foreground',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  'disabled:cursor-not-allowed disabled:opacity-50'
);

@Component({
  selector: 'input[uiInput], textarea[uiInput]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  /**
   * Additional custom classes to apply
   */
  @Input() class: string = '';

  /**
   * Input type (text, email, password, etc.)
   */
  @Input() type: string = 'text';

  /**
   * Placeholder text
   */
  @Input() placeholder: string = '';

  /**
   * Whether the input is disabled
   */
  @Input() disabled: boolean = false;

  /**
   * Current value of the input
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
    return inputClasses + ' ' + this.class;
  }

  /**
   * Binds the type attribute
   */
  @HostBinding('attr.type')
  get typeAttr(): string {
    return this.type;
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
