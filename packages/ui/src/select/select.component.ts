/**
 * Select Component
 *
 * A custom select dropdown component with reactive forms integration.
 * Provides a styled alternative to native select with better customization.
 *
 * @example
 * <ui-select [formControl]="countryControl" placeholder="Select a country">
 *   <ui-select-option value="us">United States</ui-select-option>
 *   <ui-select-option value="uk">United Kingdom</ui-select-option>
 *   <ui-select-option value="ca">Canada</ui-select-option>
 * </ui-select>
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy,
  forwardRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { cn } from '../utils/cn';

/**
 * Select Option Component
 */
@Component({
  selector: 'ui-select-option',
  standalone: true,
  template: `
    <div
      [class]="classes"
      (click)="onSelect()"
      [attr.data-selected]="selected"
    >
      <ng-content></ng-content>
      <span
        *ngIf="selected"
        class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    </div>
  `,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOptionComponent {
  @Input() value: any;
  @Input() disabled: boolean = false;
  @Output() optionSelected = new EventEmitter<any>();

  selected: boolean = false;

  get classes(): string {
    return cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
      'focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground',
      this.disabled && 'pointer-events-none opacity-50',
      'data-[selected=true]:bg-accent'
    );
  }

  onSelect(): void {
    if (!this.disabled) {
      this.optionSelected.emit(this.value);
    }
  }
}

/**
 * Select Trigger Component
 */
@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [class]="triggerClasses"
      [attr.aria-expanded]="open"
      [attr.disabled]="disabled || null"
      (click)="toggle()"
    >
      <span>{{ displayValue || placeholder }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4 opacity-50"
      >
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
      </svg>
    </button>

    <div *ngIf="open" [class]="dropdownClasses">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, AfterContentInit {
  @Input() class: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() disabled: boolean = false;

  @ContentChildren(SelectOptionComponent) options!: QueryList<SelectOptionComponent>;

  open: boolean = false;
  selectedValue: any;
  displayValue: string = '';

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  get triggerClasses(): string {
    return cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input',
      'bg-background px-3 py-2 text-sm ring-offset-background',
      'placeholder:text-muted-foreground',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      this.class
    );
  }

  get dropdownClasses(): string {
    return cn(
      'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
      'animate-in fade-in-0 zoom-in-95'
    );
  }

  ngAfterContentInit(): void {
    this.options.forEach((option) => {
      option.optionSelected.subscribe((value) => {
        this.selectOption(value, option);
      });
    });
  }

  toggle(): void {
    if (!this.disabled) {
      this.open = !this.open;
      if (!this.open) {
        this.onTouched();
      }
    }
  }

  selectOption(value: any, option: SelectOptionComponent): void {
    this.selectedValue = value;
    this.displayValue = option.value;
    this.open = false;

    // Update selected state for all options
    this.options.forEach((opt) => {
      opt.selected = opt === option;
    });

    this.onChange(value);
    this.onTouched();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('ui-select')) {
      this.open = false;
    }
  }

  // ControlValueAccessor implementation

  writeValue(value: any): void {
    this.selectedValue = value;
    // Update selected option
    if (this.options) {
      this.options.forEach((opt) => {
        opt.selected = opt.value === value;
        if (opt.selected) {
          this.displayValue = opt.value;
        }
      });
    }
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
