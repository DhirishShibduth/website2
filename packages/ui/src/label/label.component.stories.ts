/**
 * Label Component Stories
 *
 * Storybook stories demonstrating label variants and use cases
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { LabelComponent } from './label.component';

const meta: Meta<LabelComponent> = {
  title: 'Form/Label',
  component: LabelComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the label is disabled',
    },
  },
  args: {
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<LabelComponent>;

/**
 * Default label for form fields
 */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<label uiLabel [disabled]="disabled">Email Address</label>`,
  }),
};

/**
 * Disabled label state
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `<label uiLabel [disabled]="disabled">Email Address</label>`,
  }),
};

/**
 * Label with form field
 */
export const WithInput: Story = {
  render: () => ({
    template: `
      <div class="space-y-2">
        <label uiLabel for="email">Email Address</label>
        <input
          id="email"
          type="email"
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Enter your email"
        />
      </div>
    `,
  }),
};

/**
 * Label with disabled input
 */
export const WithDisabledInput: Story = {
  render: () => ({
    template: `
      <div class="space-y-2">
        <label uiLabel [disabled]="true" for="disabled-input">Disabled Field</label>
        <input
          id="disabled-input"
          type="text"
          disabled
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm opacity-50"
          value="Cannot edit"
        />
      </div>
    `,
  }),
};

/**
 * Required field with asterisk
 */
export const Required: Story = {
  render: () => ({
    template: `
      <label uiLabel for="required-field">
        Full Name
        <span class="text-destructive ml-1">*</span>
      </label>
    `,
  }),
};

/**
 * Multiple labels in a form layout
 */
export const FormLayout: Story = {
  render: () => ({
    template: `
      <div class="space-y-6 max-w-md">
        <div class="space-y-2">
          <label uiLabel for="name">Full Name</label>
          <input
            id="name"
            type="text"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <div class="space-y-2">
          <label uiLabel for="email">Email</label>
          <input
            id="email"
            type="email"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <div class="space-y-2">
          <label uiLabel [disabled]="true" for="disabled">Disabled Field</label>
          <input
            id="disabled"
            type="text"
            disabled
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm opacity-50"
          />
        </div>
      </div>
    `,
  }),
};
