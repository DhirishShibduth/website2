/**
 * Checkbox Component
 *
 * A styled checkbox component with reactive forms integration.
 * Implements ControlValueAccessor for seamless form integration.
 *
 * @example
 * <label class="flex items-center gap-2">
 *   <input type="checkbox" uiCheckbox [formControl]="agreeControl" />
 *   <span>I agree to the terms</span>
 * </label>
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
  selector: 'input[type="checkbox"][uiCheckbox]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  /**
   * Additional custom classes
   */
  @Input() class: string = '';

  /**
   * Whether the checkbox is disabled
   */
  @Input() disabled: boolean = false;

  /**
   * Current checked state
   */
  private _checked: boolean = false;

  /**
   * Callback for value changes
   */
  private onChange: (value: boolean) => void = () => {};

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
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      this.class
    );
  }

  /**
   * Binds the checked attribute
   */
  @HostBinding('checked')
  get checked(): boolean {
    return this._checked;
  }

  /**
   * Binds the disabled attribute
   */
  @HostBinding('attr.disabled')
  get disabledAttr(): boolean | null {
    return this.disabled ? true : null;
  }

  /**
   * Binds the data-state attribute for styling
   */
  @HostBinding('attr.data-state')
  get dataState(): string {
    return this._checked ? 'checked' : 'unchecked';
  }

  /**
   * Handles change events
   */
  @HostBinding('change')
  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this._checked = target.checked;
    this.onChange(this._checked);
    this.onTouched();
  }

  // ControlValueAccessor implementation

  writeValue(value: boolean): void {
    this._checked = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
