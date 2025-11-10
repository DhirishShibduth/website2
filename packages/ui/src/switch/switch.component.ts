/**
 * Switch Component
 *
 * A toggle switch component with reactive forms integration.
 * Alternative to checkbox for boolean values with a different visual style.
 *
 * @example
 * <label class="flex items-center gap-2">
 *   <button type="button" uiSwitch [formControl]="notificationsControl"></button>
 *   <span>Enable notifications</span>
 * </label>
 */

import {
  Component,
  Input,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { cn } from '../utils/cn';

@Component({
  selector: 'button[uiSwitch]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      [class]="thumbClasses"
      [attr.data-state]="checked ? 'checked' : 'unchecked'"
    ></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
})
export class SwitchComponent implements ControlValueAccessor {
  /**
   * Additional custom classes
   */
  @Input() class: string = '';

  /**
   * Whether the switch is disabled
   */
  @Input() disabled: boolean = false;

  /**
   * Current checked state
   */
  checked: boolean = false;

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
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
      'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:cursor-not-allowed disabled:opacity-50',
      this.checked
        ? 'bg-primary'
        : 'bg-input',
      this.class
    );
  }

  /**
   * Thumb element classes
   */
  get thumbClasses(): string {
    return cn(
      'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform',
      this.checked ? 'translate-x-5' : 'translate-x-0'
    );
  }

  /**
   * Binds the type attribute
   */
  @HostBinding('attr.type')
  get type(): string {
    return 'button';
  }

  /**
   * Binds the role attribute for accessibility
   */
  @HostBinding('attr.role')
  get role(): string {
    return 'switch';
  }

  /**
   * Binds the aria-checked attribute
   */
  @HostBinding('attr.aria-checked')
  get ariaChecked(): boolean {
    return this.checked;
  }

  /**
   * Binds the data-state attribute
   */
  @HostBinding('attr.data-state')
  get dataState(): string {
    return this.checked ? 'checked' : 'unchecked';
  }

  /**
   * Binds the disabled attribute
   */
  @HostBinding('attr.disabled')
  get disabledAttr(): boolean | null {
    return this.disabled ? true : null;
  }

  /**
   * Handles click events
   */
  @HostListener('click', ['$event'])
  handleClick(event: Event): void {
    if (!this.disabled) {
      event.preventDefault();
      this.toggle();
    }
  }

  /**
   * Toggles the switch state
   */
  private toggle(): void {
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouched();
  }

  // ControlValueAccessor implementation

  writeValue(value: boolean): void {
    this.checked = !!value;
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
