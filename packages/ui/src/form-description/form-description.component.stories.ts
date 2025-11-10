/**
 * FormDescription Component Stories
 *
 * Storybook stories demonstrating form description/helper text use cases
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { FormDescriptionComponent } from './form-description.component';

const meta: Meta<FormDescriptionComponent> = {
  title: 'Form/FormDescription',
  component: FormDescriptionComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<FormDescriptionComponent>;

/**
 * Default form description text
 */
export const Default: Story = {
  render: () => ({
    template: `<p uiFormDescription>This is a helper text for the form field.</p>`,
  }),
};

/**
 * Description with form field
 */
export const WithInput: Story = {
  render: () => ({
    template: `
      <div class="space-y-2">
        <label class="text-sm font-medium">Username</label>
        <input
          type="text"
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="johndoe"
        />
        <p uiFormDescription>This will be your public display name.</p>
      </div>
    `,
  }),
};

/**
 * Description for password requirements
 */
export const PasswordRequirements: Story = {
  render: () => ({
    template: `
      <div class="space-y-2">
        <label class="text-sm font-medium">Password</label>
        <input
          type="password"
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <p uiFormDescription>Must be at least 8 characters with one uppercase, lowercase, and number.</p>
      </div>
    `,
  }),
};

/**
 * Description for email field
 */
export const EmailInfo: Story = {
  render: () => ({
    template: `
      <div class="space-y-2">
        <label class="text-sm font-medium">Email Address</label>
        <input
          type="email"
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="user@example.com"
        />
        <p uiFormDescription>We'll never share your email with anyone else.</p>
      </div>
    `,
  }),
};

/**
 * Multiple form fields with descriptions
 */
export const CompleteForm: Story = {
  render: () => ({
    template: `
      <div class="space-y-6 max-w-md">
        <div class="space-y-2">
          <label class="text-sm font-medium">Username</label>
          <input
            type="text"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <p uiFormDescription>Choose a unique username for your account.</p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Email</label>
          <input
            type="email"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <p uiFormDescription>We'll send a confirmation link to this address.</p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Bio</label>
          <textarea
            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          ></textarea>
          <p uiFormDescription>Tell us a little about yourself (optional).</p>
        </div>
      </div>
    `,
  }),
};
