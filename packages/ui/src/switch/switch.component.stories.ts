/**
 * Switch Component Stories
 *
 * Storybook stories demonstrating switch/toggle with reactive forms integration
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { SwitchComponent } from './switch.component';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

const meta: Meta<SwitchComponent> = {
  title: 'Form/Switch',
  component: SwitchComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
  },
  args: {
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<SwitchComponent>;

/**
 * Default switch (unchecked)
 */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center space-x-2">
        <button type="button" uiSwitch id="default" [disabled]="disabled"></button>
        <label for="default" class="text-sm font-medium cursor-pointer">
          Airplane Mode
        </label>
      </div>
    `,
  }),
};

/**
 * Checked switch
 */
export const Checked: Story = {
  render: () => ({
    template: `
      <div class="flex items-center space-x-2">
        <button type="button" uiSwitch id="checked" [checked]="true"></button>
        <label for="checked" class="text-sm font-medium cursor-pointer">
          Enabled
        </label>
      </div>
    `,
  }),
};

/**
 * Disabled switch
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center space-x-2">
        <button type="button" uiSwitch id="disabled" [disabled]="disabled"></button>
        <label for="disabled" class="text-sm font-medium opacity-70">
          Cannot toggle
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
        <button type="button" uiSwitch id="disabled-checked" disabled [checked]="true"></button>
        <label for="disabled-checked" class="text-sm font-medium opacity-70">
          Always On
        </label>
      </div>
    `,
  }),
};

/**
 * Switch with description
 */
export const WithDescription: Story = {
  render: () => ({
    template: `
      <div class="flex items-start space-x-2">
        <button type="button" uiSwitch id="with-description" class="mt-1"></button>
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
  selector: 'switch-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, SwitchComponent],
  template: `
    <div class="space-y-4 max-w-md">
      <div class="flex items-center space-x-2">
        <button type="button" uiSwitch id="notifications" [formControl]="notificationsControl"></button>
        <label for="notifications" class="text-sm font-medium cursor-pointer">
          Enable Notifications
        </label>
      </div>
      <div class="text-sm text-muted-foreground">
        Notifications: <strong>{{ notificationsControl.value ? 'Enabled' : 'Disabled' }}</strong>
      </div>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        (click)="onSave()"
      >
        Save Settings
      </button>
    </div>
  `,
})
class SwitchReactiveFormComponent {
  notificationsControl = new FormControl(false);

  onSave() {
    alert('Notifications ' + (this.notificationsControl.value ? 'enabled' : 'disabled'));
  }
}

export const ReactiveForm: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: SwitchReactiveFormComponent,
  }),
};

/**
 * Multiple switches in settings form
 */
@Component({
  selector: 'switch-settings-form',
  standalone: true,
  imports: [ReactiveFormsModule, SwitchComponent],
  template: `
    <form [formGroup]="form" class="space-y-6 max-w-md">
      <div class="space-y-4">
        <div class="flex items-start space-x-2">
          <button type="button" uiSwitch id="email-noti" formControlName="emailNotifications" class="mt-1"></button>
          <div class="grid gap-1.5 leading-none">
            <label for="email-noti" class="text-sm font-medium cursor-pointer">
              Email Notifications
            </label>
            <p class="text-sm text-muted-foreground">
              Receive notifications via email
            </p>
          </div>
        </div>

        <div class="flex items-start space-x-2">
          <button type="button" uiSwitch id="push-noti" formControlName="pushNotifications" class="mt-1"></button>
          <div class="grid gap-1.5 leading-none">
            <label for="push-noti" class="text-sm font-medium cursor-pointer">
              Push Notifications
            </label>
            <p class="text-sm text-muted-foreground">
              Receive push notifications on your device
            </p>
          </div>
        </div>

        <div class="flex items-start space-x-2">
          <button type="button" uiSwitch id="sms-noti" formControlName="smsNotifications" class="mt-1"></button>
          <div class="grid gap-1.5 leading-none">
            <label for="sms-noti" class="text-sm font-medium cursor-pointer">
              SMS Notifications
            </label>
            <p class="text-sm text-muted-foreground">
              Receive SMS alerts for important updates
            </p>
          </div>
        </div>
      </div>

      <div class="text-sm text-muted-foreground">
        <strong>Settings:</strong>
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
class SwitchSettingsFormComponent {
  form = new FormGroup({
    emailNotifications: new FormControl(true),
    pushNotifications: new FormControl(false),
    smsNotifications: new FormControl(false),
  });

  onSave() {
    alert('Settings saved:\n' + JSON.stringify(this.form.value, null, 2));
  }
}

export const SettingsForm: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: SwitchSettingsFormComponent,
  }),
};

/**
 * Switch with dynamic disable state
 */
@Component({
  selector: 'switch-dynamic-disable',
  standalone: true,
  imports: [ReactiveFormsModule, SwitchComponent],
  template: `
    <div class="space-y-6 max-w-md">
      <div class="flex items-center space-x-2">
        <button type="button" uiSwitch id="master" [formControl]="masterControl"></button>
        <label for="master" class="text-sm font-medium cursor-pointer">
          Enable Advanced Features
        </label>
      </div>

      <div class="space-y-4 pl-6 border-l-2 border-muted">
        <div class="flex items-start space-x-2">
          <button
            type="button"
            uiSwitch
            id="feature1"
            [formControl]="feature1Control"
            class="mt-1"
          ></button>
          <div class="grid gap-1.5 leading-none">
            <label for="feature1" class="text-sm font-medium cursor-pointer" [class.opacity-70]="!masterControl.value">
              Feature 1
            </label>
            <p class="text-sm text-muted-foreground">
              Advanced feature that requires master switch
            </p>
          </div>
        </div>

        <div class="flex items-start space-x-2">
          <button
            type="button"
            uiSwitch
            id="feature2"
            [formControl]="feature2Control"
            class="mt-1"
          ></button>
          <div class="grid gap-1.5 leading-none">
            <label for="feature2" class="text-sm font-medium cursor-pointer" [class.opacity-70]="!masterControl.value">
              Feature 2
            </label>
            <p class="text-sm text-muted-foreground">
              Another advanced feature
            </p>
          </div>
        </div>
      </div>

      <div class="text-sm text-muted-foreground">
        <strong>Status:</strong> {{ masterControl.value ? 'Advanced features available' : 'Advanced features disabled' }}
      </div>
    </div>
  `,
})
class SwitchDynamicDisableComponent {
  masterControl = new FormControl(false);
  feature1Control = new FormControl(false);
  feature2Control = new FormControl(false);

  constructor() {
    this.masterControl.valueChanges.subscribe((enabled) => {
      if (enabled) {
        this.feature1Control.enable();
        this.feature2Control.enable();
      } else {
        this.feature1Control.disable();
        this.feature2Control.disable();
        this.feature1Control.setValue(false);
        this.feature2Control.setValue(false);
      }
    });

    // Initialize disabled
    this.feature1Control.disable();
    this.feature2Control.disable();
  }
}

export const DynamicDisable: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: SwitchDynamicDisableComponent,
  }),
};
