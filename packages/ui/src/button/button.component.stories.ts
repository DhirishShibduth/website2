/**
 * Button Component Stories
 *
 * Storybook stories demonstrating all button variants and use cases
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual variant of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

/**
 * Default button style with primary colors
 */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<button uiButton [variant]="variant" [size]="size">Button</button>`,
  }),
};

/**
 * Destructive variant for dangerous actions
 */
export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  render: (args) => ({
    props: args,
    template: `<button uiButton [variant]="variant" [size]="size">Delete</button>`,
  }),
};

/**
 * Outline variant with border
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => ({
    props: args,
    template: `<button uiButton [variant]="variant" [size]="size">Outline</button>`,
  }),
};

/**
 * Secondary variant with muted colors
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    props: args,
    template: `<button uiButton [variant]="variant" [size]="size">Secondary</button>`,
  }),
};

/**
 * Ghost variant with subtle hover effect
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
  render: (args) => ({
    props: args,
    template: `<button uiButton [variant]="variant" [size]="size">Ghost</button>`,
  }),
};

/**
 * Link variant styled as a hyperlink
 */
export const Link: Story = {
  args: {
    variant: 'link',
  },
  render: (args) => ({
    props: args,
    template: `<button uiButton [variant]="variant" [size]="size">Link</button>`,
  }),
};

/**
 * Small button size
 */
export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => ({
    props: args,
    template: `<button uiButton [variant]="variant" [size]="size">Small</button>`,
  }),
};

/**
 * Large button size
 */
export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `<button uiButton [variant]="variant" [size]="size">Large</button>`,
  }),
};

/**
 * Icon-only button (square)
 */
export const Icon: Story = {
  args: {
    size: 'icon',
  },
  render: (args) => ({
    props: args,
    template: `
      <button uiButton [variant]="variant" [size]="size">
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
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    `,
  }),
};

/**
 * All variants displayed together
 */
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-4">
        <button uiButton variant="default">Default</button>
        <button uiButton variant="destructive">Destructive</button>
        <button uiButton variant="outline">Outline</button>
        <button uiButton variant="secondary">Secondary</button>
        <button uiButton variant="ghost">Ghost</button>
        <button uiButton variant="link">Link</button>
      </div>
    `,
  }),
};

/**
 * All sizes displayed together
 */
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <button uiButton size="sm">Small</button>
        <button uiButton size="default">Default</button>
        <button uiButton size="lg">Large</button>
      </div>
    `,
  }),
};

/**
 * Button with icon and text
 */
export const WithIcon: Story = {
  render: () => ({
    template: `
      <button uiButton>
        <svg
          class="mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
        Continue
      </button>
    `,
  }),
};

/**
 * Disabled button state
 */
export const Disabled: Story = {
  render: () => ({
    template: `<button uiButton disabled>Disabled</button>`,
  }),
};
