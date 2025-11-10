/**
 * Checkbox Component Stories
 *
 * Storybook stories demonstrating checkbox with reactive forms integration
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

const meta: Meta<CheckboxComponent> = {
  title: 'Form/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
  },
  args: {
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

/**
 * Default checkbox
 */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center space-x-2">
        <input type="checkbox" uiCheckbox id="default" [disabled]="disabled" />
        <label for="default" class="text-sm font-medium leading-none cursor-pointer">
          Accept terms and conditions
        </label>
      </div>
    `,
  }),
};

/**
 * Checked state
 */
export const Checked: Story = {
  render: () => ({
    template: `
      <div class="flex items-center space-x-2">
        <input type="checkbox" uiCheckbox id="checked" checked />
        <label for="checked" class="text-sm font-medium leading-none cursor-pointer">
          Already accepted
        </label>
      </div>
    `,
  }),
};

/**
 * Disabled checkbox
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center space-x-2">
        <input type="checkbox" uiCheckbox id="disabled" [disabled]="disabled" />
        <label for="disabled" class="text-sm font-medium leading-none opacity-70">
          Cannot be changed
        </label>
      </div>
    `,
  }),
};

/**
 * Disabled and checked
 */
export const DisabledChecked: Story = {
  render: () => ({
    template: `
      <div class="flex items-center space-x-2">
        <input type="checkbox" uiCheckbox id="disabled-checked" disabled checked />
        <label for="disabled-checked" class="text-sm font-medium leading-none opacity-70">
          Permanently enabled
        </label>
      </div>
    `,
  }),
};

/**
 * Checkbox with description
 */
export const WithDescription: Story = {
  render: () => ({
    template: `
      <div class="flex items-start space-x-2">
        <input type="checkbox" uiCheckbox id="with-description" class="mt-1" />
        <div class="grid gap-1.5 leading-none">
          <label for="with-description" class="text-sm font-medium cursor-pointer">
            Marketing emails
          </label>
          <p class="text-sm text-muted-foreground">
            Receive emails about new products, features, and updates.
          </p>
        </div>
      </div>
    `,
  }),
};

/**
 * Reactive Forms integration
 */
@Component({
  selector: 'checkbox-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, CheckboxComponent],
  template: `
    <div class="space-y-4 max-w-md">
      <div class="flex items-center space-x-2">
        <input type="checkbox" uiCheckbox id="terms" [formControl]="termsControl" />
        <label for="terms" class="text-sm font-medium cursor-pointer">
          I agree to the terms and conditions
        </label>
      </div>
      <div class="text-sm text-muted-foreground">
        Value: <strong>{{ termsControl.value }}</strong>
      </div>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        [disabled]="!termsControl.value"
        (click)="onSubmit()"
      >
        Continue
      </button>
    </div>
  `,
})
class CheckboxReactiveFormComponent {
  termsControl = new FormControl(false);

  onSubmit() {
    alert('Form submitted! Terms accepted: ' + this.termsControl.value);
  }
}

export const ReactiveForm: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: CheckboxReactiveFormComponent,
  }),
};

/**
 * Required checkbox with validation
 */
@Component({
  selector: 'checkbox-required-form',
  standalone: true,
  imports: [ReactiveFormsModule, CheckboxComponent],
  template: `
    <div class="space-y-4 max-w-md">
      <div class="space-y-2">
        <div class="flex items-center space-x-2">
          <input type="checkbox" uiCheckbox id="required" [formControl]="acceptControl" />
          <label for="required" class="text-sm font-medium cursor-pointer">
            I accept the terms and conditions
            <span class="text-destructive">*</span>
          </label>
        </div>
        <p class="text-sm text-destructive font-medium" *ngIf="acceptControl.invalid && acceptControl.touched">
          You must accept the terms and conditions
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        (click)="onSubmit()"
      >
        Submit
      </button>
    </div>
  `,
})
class CheckboxRequiredFormComponent {
  acceptControl = new FormControl(false, Validators.requiredTrue);

  onSubmit() {
    this.acceptControl.markAsTouched();
    if (this.acceptControl.valid) {
      alert('Form submitted successfully!');
    }
  }
}

export const RequiredValidation: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: CheckboxRequiredFormComponent,
  }),
};

/**
 * Multiple checkboxes
 */
@Component({
  selector: 'checkbox-multiple-form',
  standalone: true,
  imports: [ReactiveFormsModule, CheckboxComponent],
  template: `
    <form [formGroup]="form" class="space-y-4 max-w-md">
      <div class="space-y-3">
        <div class="flex items-center space-x-2">
          <input type="checkbox" uiCheckbox id="feature1" formControlName="feature1" />
          <label for="feature1" class="text-sm font-medium cursor-pointer">
            Email notifications
          </label>
        </div>
        <div class="flex items-center space-x-2">
          <input type="checkbox" uiCheckbox id="feature2" formControlName="feature2" />
          <label for="feature2" class="text-sm font-medium cursor-pointer">
            Push notifications
          </label>
        </div>
        <div class="flex items-center space-x-2">
          <input type="checkbox" uiCheckbox id="feature3" formControlName="feature3" />
          <label for="feature3" class="text-sm font-medium cursor-pointer">
            SMS notifications
          </label>
        </div>
      </div>
      <div class="text-sm text-muted-foreground">
        <strong>Form Value:</strong>
        <pre class="mt-2 p-2 bg-muted rounded-md">{{ form.value | json }}</pre>
      </div>
    </form>
  `,
})
class CheckboxMultipleFormComponent {
  form = new FormGroup({
    feature1: new FormControl(true),
    feature2: new FormControl(false),
    feature3: new FormControl(false),
  });
}

export const MultipleCheckboxes: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: CheckboxMultipleFormComponent,
  }),
};
