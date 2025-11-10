/**
 * FormMessage Component Stories
 *
 * Storybook stories demonstrating form validation messages
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { FormMessageComponent } from './form-message.component';

const meta: Meta<FormMessageComponent> = {
  title: 'Form/FormMessage',
  component: FormMessageComponent,
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
      description: 'Whether to display as error (red) or info (muted)',
    },
  },
  args: {
    error: true,
  },
};

export default meta;
type Story = StoryObj<FormMessageComponent>;

/**
 * Default error message
 */
export const Error: Story = {
  render: (args) => ({
    props: args,
    template: `<p uiFormMessage [error]="error">This field is required.</p>`,
  }),
};

/**
 * Info message (non-error)
 */
export const Info: Story = {
  args: {
    error: false,
  },
  render: (args) => ({
    props: args,
    template: `<p uiFormMessage [error]="error">Field successfully validated.</p>`,
  }),
};

/**
 * Required field error
 */
export const RequiredError: Story = {
  render: () => ({
    template: `
      <div class="space-y-2">
        <label class="text-sm font-medium">Email Address</label>
        <input
          type="email"
          class="flex h-10 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm"
          placeholder="user@example.com"
        />
        <p uiFormMessage [error]="true">Email address is required.</p>
      </div>
    `,
  }),
};

/**
 * Email validation error
 */
export const EmailValidationError: Story = {
  render: () => ({
    template: `
      <div class="space-y-2">
        <label class="text-sm font-medium">Email Address</label>
        <input
          type="email"
          class="flex h-10 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm"
          value="invalid-email"
        />
        <p uiFormMessage [error]="true">Please enter a valid email address.</p>
      </div>
    `,
  }),
};

/**
 * Password strength error
 */
export const PasswordError: Story = {
  render: () => ({
    template: `
      <div class="space-y-2">
        <label class="text-sm font-medium">Password</label>
        <input
          type="password"
          class="flex h-10 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm"
        />
        <p uiFormMessage [error]="true">Password must be at least 8 characters long.</p>
      </div>
    `,
  }),
};

/**
 * Multiple validation messages
 */
export const MultipleErrors: Story = {
  render: () => ({
    template: `
      <div class="space-y-6 max-w-md">
        <div class="space-y-2">
          <label class="text-sm font-medium">Username</label>
          <input
            type="text"
            class="flex h-10 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm"
          />
          <p uiFormMessage [error]="true">Username is already taken.</p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Email</label>
          <input
            type="email"
            class="flex h-10 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm"
          />
          <p uiFormMessage [error]="true">Email format is invalid.</p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Password</label>
          <input
            type="password"
            class="flex h-10 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm"
          />
          <p uiFormMessage [error]="true">Password must contain at least one uppercase letter.</p>
        </div>
      </div>
    `,
  }),
};

/**
 * Success state
 */
export const Success: Story = {
  render: () => ({
    template: `
      <div class="space-y-2">
        <label class="text-sm font-medium">Email Address</label>
        <input
          type="email"
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value="user@example.com"
        />
        <p uiFormMessage [error]="false">Email address is valid.</p>
      </div>
    `,
  }),
};

/**
 * Complete form with mixed states
 */
export const MixedStates: Story = {
  render: () => ({
    template: `
      <div class="space-y-6 max-w-md">
        <div class="space-y-2">
          <label class="text-sm font-medium">Valid Field</label>
          <input
            type="text"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value="Valid value"
          />
          <p uiFormMessage [error]="false">This field is valid.</p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Invalid Field</label>
          <input
            type="text"
            class="flex h-10 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm"
          />
          <p uiFormMessage [error]="true">This field has an error.</p>
        </div>
      </div>
    `,
  }),
};
