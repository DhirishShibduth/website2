/**
 * Radio Component
 *
 * A styled radio button component with reactive forms integration.
 * Works with FormControl and radio groups.
 *
 * @example
 * <div>
 *   <label class="flex items-center gap-2">
 *     <input type="radio" uiRadio name="plan" value="free" [formControl]="planControl" />
 *     <span>Free</span>
 *   </label>
 *   <label class="flex items-center gap-2">
 *     <input type="radio" uiRadio name="plan" value="pro" [formControl]="planControl" />
 *     <span>Pro</span>
 *   </label>
 * </div>
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
  selector: 'input[type="radio"][uiRadio]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent implements ControlValueAccessor {
  /**
   * Additional custom classes
   */
  @Input() class: string = '';

  /**
   * Whether the radio is disabled
   */
  @Input() disabled: boolean = false;

  /**
   * The value of this radio button
   */
  @Input() value: any;

  /**
   * Current selected value
   */
  private _selectedValue: any;

  /**
   * Callback for value changes
   */
  private onChange: (value: any) => void = () => {};

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
      'peer h-4 w-4 rounded-full border border-primary text-primary ring-offset-background',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      this.class
    );
  }

  /**
   * Binds the checked state
   */
  @HostBinding('checked')
  get checked(): boolean {
    return this._selectedValue === this.value;
  }

  /**
   * Binds the disabled attribute
   */
  @HostBinding('attr.disabled')
  get disabledAttr(): boolean | null {
    return this.disabled ? true : null;
  }

  /**
   * Handles change events
   */
  @HostBinding('change')
  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this._selectedValue = this.value;
      this.onChange(this.value);
      this.onTouched();
    }
  }

  // ControlValueAccessor implementation

  writeValue(value: any): void {
    this._selectedValue = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
