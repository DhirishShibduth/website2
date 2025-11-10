/**
 * Select Component Stories
 *
 * Storybook stories demonstrating select dropdown with reactive forms integration
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent, SelectOptionComponent } from './select.component';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

const meta: Meta<SelectComponent> = {
  title: 'Form/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
  },
  args: {
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

/**
 * Default select dropdown
 */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-select placeholder="Select an option..." [disabled]="disabled">
        <ui-select-option value="option1">Option 1</ui-select-option>
        <ui-select-option value="option2">Option 2</ui-select-option>
        <ui-select-option value="option3">Option 3</ui-select-option>
      </ui-select>
    `,
  }),
};

/**
 * Select with label
 */
export const WithLabel: Story = {
  render: () => ({
    template: `
      <div class="space-y-2 max-w-xs">
        <label class="text-sm font-medium">Country</label>
        <ui-select placeholder="Select a country...">
          <ui-select-option value="us">United States</ui-select-option>
          <ui-select-option value="uk">United Kingdom</ui-select-option>
          <ui-select-option value="ca">Canada</ui-select-option>
          <ui-select-option value="au">Australia</ui-select-option>
        </ui-select>
      </div>
    `,
  }),
};

/**
 * Select with description
 */
export const WithDescription: Story = {
  render: () => ({
    template: `
      <div class="space-y-2 max-w-xs">
        <label class="text-sm font-medium">Timezone</label>
        <ui-select placeholder="Select your timezone...">
          <ui-select-option value="pst">Pacific Standard Time (PST)</ui-select-option>
          <ui-select-option value="mst">Mountain Standard Time (MST)</ui-select-option>
          <ui-select-option value="cst">Central Standard Time (CST)</ui-select-option>
          <ui-select-option value="est">Eastern Standard Time (EST)</ui-select-option>
        </ui-select>
        <p class="text-sm text-muted-foreground">
          Choose your preferred timezone for displaying dates and times.
        </p>
      </div>
    `,
  }),
};

/**
 * Disabled select
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-select placeholder="Cannot select..." [disabled]="disabled">
        <ui-select-option value="option1">Option 1</ui-select-option>
        <ui-select-option value="option2">Option 2</ui-select-option>
      </ui-select>
    `,
  }),
};

/**
 * Reactive Forms integration
 */
@Component({
  selector: 'select-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, SelectComponent, SelectOptionComponent],
  template: `
    <div class="space-y-4 max-w-md">
      <div class="space-y-2">
        <label class="text-sm font-medium">Select a Fruit</label>
        <ui-select [formControl]="fruitControl" placeholder="Choose a fruit...">
          <ui-select-option value="apple">Apple</ui-select-option>
          <ui-select-option value="banana">Banana</ui-select-option>
          <ui-select-option value="orange">Orange</ui-select-option>
          <ui-select-option value="grape">Grape</ui-select-option>
          <ui-select-option value="strawberry">Strawberry</ui-select-option>
        </ui-select>
      </div>
      <div class="text-sm text-muted-foreground">
        Selected: <strong>{{ fruitControl.value || 'None' }}</strong>
      </div>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        [disabled]="!fruitControl.value"
        (click)="onSubmit()"
      >
        Continue
      </button>
    </div>
  `,
})
class SelectReactiveFormComponent {
  fruitControl = new FormControl('apple');

  onSubmit() {
    alert('Selected fruit: ' + this.fruitControl.value);
  }
}

export const ReactiveForm: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: SelectReactiveFormComponent,
  }),
};

/**
 * Required select with validation
 */
@Component({
  selector: 'select-required-form',
  standalone: true,
  imports: [ReactiveFormsModule, SelectComponent, SelectOptionComponent],
  template: `
    <div class="space-y-4 max-w-md">
      <div class="space-y-2">
        <label class="text-sm font-medium">
          Department
          <span class="text-destructive">*</span>
        </label>
        <ui-select [formControl]="departmentControl" placeholder="Select a department...">
          <ui-select-option value="engineering">Engineering</ui-select-option>
          <ui-select-option value="design">Design</ui-select-option>
          <ui-select-option value="marketing">Marketing</ui-select-option>
          <ui-select-option value="sales">Sales</ui-select-option>
          <ui-select-option value="support">Support</ui-select-option>
        </ui-select>
        <p class="text-sm text-destructive font-medium" *ngIf="departmentControl.invalid && departmentControl.touched">
          Please select a department
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
class SelectRequiredFormComponent {
  departmentControl = new FormControl('', Validators.required);

  onSubmit() {
    this.departmentControl.markAsTouched();
    if (this.departmentControl.valid) {
      alert('Department selected: ' + this.departmentControl.value);
    }
  }
}

export const RequiredValidation: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: SelectRequiredFormComponent,
  }),
};

/**
 * Multiple selects in a form
 */
@Component({
  selector: 'select-multiple-form',
  standalone: true,
  imports: [ReactiveFormsModule, SelectComponent, SelectOptionComponent],
  template: `
    <form [formGroup]="form" class="space-y-6 max-w-md">
      <div class="space-y-2">
        <label class="text-sm font-medium">Country</label>
        <ui-select formControlName="country" placeholder="Select country...">
          <ui-select-option value="us">United States</ui-select-option>
          <ui-select-option value="uk">United Kingdom</ui-select-option>
          <ui-select-option value="ca">Canada</ui-select-option>
          <ui-select-option value="au">Australia</ui-select-option>
        </ui-select>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium">Language</label>
        <ui-select formControlName="language" placeholder="Select language...">
          <ui-select-option value="en">English</ui-select-option>
          <ui-select-option value="es">Spanish</ui-select-option>
          <ui-select-option value="fr">French</ui-select-option>
          <ui-select-option value="de">German</ui-select-option>
        </ui-select>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium">Currency</label>
        <ui-select formControlName="currency" placeholder="Select currency...">
          <ui-select-option value="usd">USD - US Dollar</ui-select-option>
          <ui-select-option value="eur">EUR - Euro</ui-select-option>
          <ui-select-option value="gbp">GBP - British Pound</ui-select-option>
          <ui-select-option value="jpy">JPY - Japanese Yen</ui-select-option>
        </ui-select>
      </div>

      <div class="text-sm text-muted-foreground">
        <strong>Form Value:</strong>
        <pre class="mt-2 p-2 bg-muted rounded-md">{{ form.value | json }}</pre>
      </div>

      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        (click)="onSave()"
      >
        Save Preferences
      </button>
    </form>
  `,
})
class SelectMultipleFormComponent {
  form = new FormGroup({
    country: new FormControl('us'),
    language: new FormControl('en'),
    currency: new FormControl('usd'),
  });

  onSave() {
    alert('Preferences saved:\n' + JSON.stringify(this.form.value, null, 2));
  }
}

export const MultipleSelects: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: SelectMultipleFormComponent,
  }),
};

/**
 * Dynamic options based on another select
 */
@Component({
  selector: 'select-dependent-form',
  standalone: true,
  imports: [ReactiveFormsModule, SelectComponent, SelectOptionComponent],
  template: `
    <div class="space-y-6 max-w-md">
      <div class="space-y-2">
        <label class="text-sm font-medium">Category</label>
        <ui-select [formControl]="categoryControl" placeholder="Select category...">
          <ui-select-option value="electronics">Electronics</ui-select-option>
          <ui-select-option value="clothing">Clothing</ui-select-option>
          <ui-select-option value="books">Books</ui-select-option>
        </ui-select>
      </div>

      <div class="space-y-2" *ngIf="categoryControl.value">
        <label class="text-sm font-medium">Subcategory</label>
        <ui-select [formControl]="subcategoryControl" placeholder="Select subcategory...">
          <ng-container *ngIf="categoryControl.value === 'electronics'">
            <ui-select-option value="phones">Phones</ui-select-option>
            <ui-select-option value="laptops">Laptops</ui-select-option>
            <ui-select-option value="tablets">Tablets</ui-select-option>
          </ng-container>
          <ng-container *ngIf="categoryControl.value === 'clothing'">
            <ui-select-option value="shirts">Shirts</ui-select-option>
            <ui-select-option value="pants">Pants</ui-select-option>
            <ui-select-option value="shoes">Shoes</ui-select-option>
          </ng-container>
          <ng-container *ngIf="categoryControl.value === 'books'">
            <ui-select-option value="fiction">Fiction</ui-select-option>
            <ui-select-option value="non-fiction">Non-Fiction</ui-select-option>
            <ui-select-option value="textbooks">Textbooks</ui-select-option>
          </ng-container>
        </ui-select>
      </div>

      <div class="text-sm text-muted-foreground" *ngIf="categoryControl.value">
        <strong>Selection:</strong>
        <div class="mt-2">
          Category: {{ categoryControl.value }}<br>
          Subcategory: {{ subcategoryControl.value || 'Not selected' }}
        </div>
      </div>
    </div>
  `,
})
class SelectDependentFormComponent {
  categoryControl = new FormControl('');
  subcategoryControl = new FormControl('');

  constructor() {
    this.categoryControl.valueChanges.subscribe(() => {
      this.subcategoryControl.setValue('');
    });
  }
}

export const DependentSelects: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: SelectDependentFormComponent,
  }),
};

/**
 * Select with many options
 */
export const ManyOptions: Story = {
  render: () => ({
    template: `
      <div class="space-y-2 max-w-xs">
        <label class="text-sm font-medium">Select a number</label>
        <ui-select placeholder="Choose a number...">
          <ui-select-option *ngFor="let n of [].constructor(50); let i = index" [value]="i + 1">
            Number {{ i + 1 }}
          </ui-select-option>
        </ui-select>
      </div>
    `,
  }),
};
