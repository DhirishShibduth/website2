/**
 * Radio Component Stories
 *
 * Storybook stories demonstrating radio buttons with reactive forms integration
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { RadioComponent } from './radio.component';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

const meta: Meta<RadioComponent> = {
  title: 'Form/Radio',
  component: RadioComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled',
    },
  },
  args: {
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<RadioComponent>;

/**
 * Default radio group
 */
export const Default: Story = {
  render: () => ({
    template: `
      <div class="space-y-3">
        <div class="flex items-center space-x-2">
          <input type="radio" uiRadio id="option1" name="default" value="option1" />
          <label for="option1" class="text-sm font-medium cursor-pointer">
            Option 1
          </label>
        </div>
        <div class="flex items-center space-x-2">
          <input type="radio" uiRadio id="option2" name="default" value="option2" />
          <label for="option2" class="text-sm font-medium cursor-pointer">
            Option 2
          </label>
        </div>
        <div class="flex items-center space-x-2">
          <input type="radio" uiRadio id="option3" name="default" value="option3" />
          <label for="option3" class="text-sm font-medium cursor-pointer">
            Option 3
          </label>
        </div>
      </div>
    `,
  }),
};

/**
 * Pre-selected radio button
 */
export const PreSelected: Story = {
  render: () => ({
    template: `
      <div class="space-y-3">
        <div class="flex items-center space-x-2">
          <input type="radio" uiRadio id="pre1" name="preselected" value="option1" />
          <label for="pre1" class="text-sm font-medium cursor-pointer">
            Option 1
          </label>
        </div>
        <div class="flex items-center space-x-2">
          <input type="radio" uiRadio id="pre2" name="preselected" value="option2" checked />
          <label for="pre2" class="text-sm font-medium cursor-pointer">
            Option 2 (Selected)
          </label>
        </div>
        <div class="flex items-center space-x-2">
          <input type="radio" uiRadio id="pre3" name="preselected" value="option3" />
          <label for="pre3" class="text-sm font-medium cursor-pointer">
            Option 3
          </label>
        </div>
      </div>
    `,
  }),
};

/**
 * Disabled radio button
 */
export const Disabled: Story = {
  render: () => ({
    template: `
      <div class="space-y-3">
        <div class="flex items-center space-x-2">
          <input type="radio" uiRadio id="dis1" name="disabled" value="option1" />
          <label for="dis1" class="text-sm font-medium cursor-pointer">
            Option 1
          </label>
        </div>
        <div class="flex items-center space-x-2">
          <input type="radio" uiRadio id="dis2" name="disabled" value="option2" disabled />
          <label for="dis2" class="text-sm font-medium opacity-70">
            Option 2 (Disabled)
          </label>
        </div>
        <div class="flex items-center space-x-2">
          <input type="radio" uiRadio id="dis3" name="disabled" value="option3" />
          <label for="dis3" class="text-sm font-medium cursor-pointer">
            Option 3
          </label>
        </div>
      </div>
    `,
  }),
};

/**
 * Radio buttons with descriptions
 */
export const WithDescriptions: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <div class="flex items-start space-x-2">
          <input type="radio" uiRadio id="desc1" name="descriptions" value="free" class="mt-1" />
          <div class="grid gap-1.5 leading-none">
            <label for="desc1" class="text-sm font-medium cursor-pointer">
              Free Plan
            </label>
            <p class="text-sm text-muted-foreground">
              Basic features for individuals and small teams.
            </p>
          </div>
        </div>
        <div class="flex items-start space-x-2">
          <input type="radio" uiRadio id="desc2" name="descriptions" value="pro" class="mt-1" />
          <div class="grid gap-1.5 leading-none">
            <label for="desc2" class="text-sm font-medium cursor-pointer">
              Pro Plan
            </label>
            <p class="text-sm text-muted-foreground">
              Advanced features for growing businesses.
            </p>
          </div>
        </div>
        <div class="flex items-start space-x-2">
          <input type="radio" uiRadio id="desc3" name="descriptions" value="enterprise" class="mt-1" />
          <div class="grid gap-1.5 leading-none">
            <label for="desc3" class="text-sm font-medium cursor-pointer">
              Enterprise Plan
            </label>
            <p class="text-sm text-muted-foreground">
              Custom solutions for large organizations.
            </p>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Reactive Forms integration
 */
@Component({
  selector: 'radio-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, RadioComponent],
  template: `
    <div class="space-y-4 max-w-md">
      <div class="space-y-3">
        <div class="flex items-center space-x-2">
          <input type="radio" uiRadio id="react1" [formControl]="planControl" value="free" />
          <label for="react1" class="text-sm font-medium cursor-pointer">
            Free Plan
          </label>
        </div>
        <div class="flex items-center space-x-2">
          <input type="radio" uiRadio id="react2" [formControl]="planControl" value="pro" />
          <label for="react2" class="text-sm font-medium cursor-pointer">
            Pro Plan ($29/month)
          </label>
        </div>
        <div class="flex items-center space-x-2">
          <input type="radio" uiRadio id="react3" [formControl]="planControl" value="enterprise" />
          <label for="react3" class="text-sm font-medium cursor-pointer">
            Enterprise Plan (Contact us)
          </label>
        </div>
      </div>
      <div class="text-sm text-muted-foreground">
        Selected Plan: <strong>{{ planControl.value || 'None' }}</strong>
      </div>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        [disabled]="!planControl.value"
        (click)="onSubmit()"
      >
        Continue
      </button>
    </div>
  `,
})
class RadioReactiveFormComponent {
  planControl = new FormControl('pro');

  onSubmit() {
    alert('Selected plan: ' + this.planControl.value);
  }
}

export const ReactiveForm: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: RadioReactiveFormComponent,
  }),
};

/**
 * Required radio group with validation
 */
@Component({
  selector: 'radio-required-form',
  standalone: true,
  imports: [ReactiveFormsModule, RadioComponent],
  template: `
    <div class="space-y-4 max-w-md">
      <div class="space-y-2">
        <label class="text-sm font-medium">
          Select a payment method
          <span class="text-destructive">*</span>
        </label>
        <div class="space-y-3">
          <div class="flex items-center space-x-2">
            <input type="radio" uiRadio id="req1" [formControl]="paymentControl" value="card" />
            <label for="req1" class="text-sm font-medium cursor-pointer">
              Credit Card
            </label>
          </div>
          <div class="flex items-center space-x-2">
            <input type="radio" uiRadio id="req2" [formControl]="paymentControl" value="paypal" />
            <label for="req2" class="text-sm font-medium cursor-pointer">
              PayPal
            </label>
          </div>
          <div class="flex items-center space-x-2">
            <input type="radio" uiRadio id="req3" [formControl]="paymentControl" value="bank" />
            <label for="req3" class="text-sm font-medium cursor-pointer">
              Bank Transfer
            </label>
          </div>
        </div>
        <p class="text-sm text-destructive font-medium" *ngIf="paymentControl.invalid && paymentControl.touched">
          Please select a payment method
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        (click)="onSubmit()"
      >
        Proceed to Payment
      </button>
    </div>
  `,
})
class RadioRequiredFormComponent {
  paymentControl = new FormControl('', Validators.required);

  onSubmit() {
    this.paymentControl.markAsTouched();
    if (this.paymentControl.valid) {
      alert('Payment method: ' + this.paymentControl.value);
    }
  }
}

export const RequiredValidation: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: RadioRequiredFormComponent,
  }),
};

/**
 * Multiple radio groups in a form
 */
@Component({
  selector: 'radio-multiple-groups',
  standalone: true,
  imports: [ReactiveFormsModule, RadioComponent],
  template: `
    <form [formGroup]="form" class="space-y-6 max-w-md">
      <div class="space-y-2">
        <label class="text-sm font-medium">Notification Preference</label>
        <div class="space-y-2">
          <div class="flex items-center space-x-2">
            <input type="radio" uiRadio id="noti1" formControlName="notification" value="all" />
            <label for="noti1" class="text-sm cursor-pointer">All notifications</label>
          </div>
          <div class="flex items-center space-x-2">
            <input type="radio" uiRadio id="noti2" formControlName="notification" value="important" />
            <label for="noti2" class="text-sm cursor-pointer">Important only</label>
          </div>
          <div class="flex items-center space-x-2">
            <input type="radio" uiRadio id="noti3" formControlName="notification" value="none" />
            <label for="noti3" class="text-sm cursor-pointer">None</label>
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium">Language</label>
        <div class="space-y-2">
          <div class="flex items-center space-x-2">
            <input type="radio" uiRadio id="lang1" formControlName="language" value="en" />
            <label for="lang1" class="text-sm cursor-pointer">English</label>
          </div>
          <div class="flex items-center space-x-2">
            <input type="radio" uiRadio id="lang2" formControlName="language" value="es" />
            <label for="lang2" class="text-sm cursor-pointer">Spanish</label>
          </div>
          <div class="flex items-center space-x-2">
            <input type="radio" uiRadio id="lang3" formControlName="language" value="fr" />
            <label for="lang3" class="text-sm cursor-pointer">French</label>
          </div>
        </div>
      </div>

      <div class="text-sm text-muted-foreground">
        <strong>Form Value:</strong>
        <pre class="mt-2 p-2 bg-muted rounded-md">{{ form.value | json }}</pre>
      </div>
    </form>
  `,
})
class RadioMultipleGroupsComponent {
  form = new FormGroup({
    notification: new FormControl('important'),
    language: new FormControl('en'),
  });
}

export const MultipleGroups: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: RadioMultipleGroupsComponent,
  }),
};
