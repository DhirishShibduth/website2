/**
 * Input Component Stories
 *
 * Storybook stories demonstrating input component usage
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'HTML input type',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
  },
  args: {
    type: 'text',
    placeholder: 'Enter text...',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

/**
 * Default text input
 */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<input uiInput [type]="type" [placeholder]="placeholder" [disabled]="disabled" />`,
  }),
};

/**
 * Email input
 */
export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Email',
  },
  render: (args) => ({
    props: args,
    template: `<input uiInput [type]="type" [placeholder]="placeholder" />`,
  }),
};

/**
 * Password input
 */
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Password',
  },
  render: (args) => ({
    props: args,
    template: `<input uiInput [type]="type" [placeholder]="placeholder" />`,
  }),
};

/**
 * Disabled input
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
  render: (args) => ({
    props: args,
    template: `<input uiInput [type]="type" [placeholder]="placeholder" [disabled]="disabled" />`,
  }),
};

/**
 * Input with label
 */
export const WithLabel: Story = {
  render: () => ({
    template: `
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <label for="email" class="text-sm font-medium">Email</label>
        <input uiInput type="email" id="email" placeholder="Email" />
      </div>
    `,
  }),
};

/**
 * Input with helper text
 */
export const WithHelperText: Story = {
  render: () => ({
    template: `
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <label for="email-2" class="text-sm font-medium">Email</label>
        <input uiInput type="email" id="email-2" placeholder="Email" />
        <p class="text-sm text-muted-foreground">Enter your email address.</p>
      </div>
    `,
  }),
};

/**
 * File input
 */
export const File: Story = {
  render: () => ({
    template: `
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <label for="picture" class="text-sm font-medium">Picture</label>
        <input uiInput id="picture" type="file" />
      </div>
    `,
  }),
};

/**
 * Textarea variant
 */
export const Textarea: Story = {
  render: () => ({
    template: `
      <div class="grid w-full gap-1.5">
        <label for="message" class="text-sm font-medium">Your message</label>
        <textarea uiInput placeholder="Type your message here." id="message"></textarea>
      </div>
    `,
  }),
};
