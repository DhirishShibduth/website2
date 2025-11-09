/**
 * Dialog Component Stories
 *
 * Storybook stories demonstrating dialog component usage
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import {
  DialogComponent,
  DialogContentComponent,
  DialogHeaderComponent,
  DialogFooterComponent,
  DialogTitleComponent,
  DialogDescriptionComponent,
} from './dialog.component';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';

/**
 * Wrapper component for dialog stories
 */
@Component({
  selector: 'dialog-story-wrapper',
  standalone: true,
  imports: [
    DialogComponent,
    DialogContentComponent,
    DialogHeaderComponent,
    DialogFooterComponent,
    DialogTitleComponent,
    DialogDescriptionComponent,
    ButtonComponent,
    InputComponent,
  ],
  template: `
    <button uiButton (click)="isOpen = true">Open Dialog</button>

    <ui-dialog [open]="isOpen" (openChange)="isOpen = $event">
      <ui-dialog-content>
        <ng-content></ng-content>
      </ui-dialog-content>
    </ui-dialog>
  `,
})
class DialogStoryWrapperComponent {
  isOpen = false;
}

const meta: Meta<DialogComponent> = {
  title: 'Components/Dialog',
  component: DialogComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DialogComponent>;

/**
 * Basic dialog example
 */
export const Default: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [
        DialogStoryWrapperComponent,
        DialogHeaderComponent,
        DialogTitleComponent,
        DialogDescriptionComponent,
      ],
    },
    template: `
      <dialog-story-wrapper>
        <ui-dialog-header>
          <ui-dialog-title>Dialog Title</ui-dialog-title>
          <ui-dialog-description>
            This is a basic dialog example. Click outside or press Escape to close.
          </ui-dialog-description>
        </ui-dialog-header>
      </dialog-story-wrapper>
    `,
  }),
};

/**
 * Dialog with form
 */
export const WithForm: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [
        DialogStoryWrapperComponent,
        DialogHeaderComponent,
        DialogFooterComponent,
        DialogTitleComponent,
        DialogDescriptionComponent,
        ButtonComponent,
        InputComponent,
      ],
    },
    template: `
      <dialog-story-wrapper>
        <ui-dialog-header>
          <ui-dialog-title>Edit Profile</ui-dialog-title>
          <ui-dialog-description>
            Make changes to your profile here. Click save when you're done.
          </ui-dialog-description>
        </ui-dialog-header>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="name" class="text-right text-sm font-medium">Name</label>
            <input uiInput id="name" value="John Doe" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="username" class="text-right text-sm font-medium">Username</label>
            <input uiInput id="username" value="@johndoe" class="col-span-3" />
          </div>
        </div>
        <ui-dialog-footer>
          <button uiButton type="submit">Save changes</button>
        </ui-dialog-footer>
      </dialog-story-wrapper>
    `,
  }),
};

/**
 * Confirmation dialog
 */
export const Confirmation: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [
        DialogStoryWrapperComponent,
        DialogHeaderComponent,
        DialogFooterComponent,
        DialogTitleComponent,
        DialogDescriptionComponent,
        ButtonComponent,
      ],
    },
    template: `
      <dialog-story-wrapper>
        <ui-dialog-header>
          <ui-dialog-title>Are you absolutely sure?</ui-dialog-title>
          <ui-dialog-description>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </ui-dialog-description>
        </ui-dialog-header>
        <ui-dialog-footer>
          <button uiButton variant="outline">Cancel</button>
          <button uiButton variant="destructive">Delete Account</button>
        </ui-dialog-footer>
      </dialog-story-wrapper>
    `,
  }),
};
