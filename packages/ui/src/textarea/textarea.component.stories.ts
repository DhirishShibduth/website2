/**
 * Textarea Component Stories
 *
 * Storybook stories demonstrating textarea with reactive forms and validation
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { TextareaComponent } from './textarea.component';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

const meta: Meta<TextareaComponent> = {
  title: 'Form/Textarea',
  component: TextareaComponent,
  tags: ['autodocs'],
  argTypes: {
    rows: {
      control: 'number',
      description: 'Number of visible text lines',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
  },
  args: {
    rows: 3,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<TextareaComponent>;

/**
 * Default textarea
 */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<textarea uiTextarea [rows]="rows" [disabled]="disabled" placeholder="Type your message here..."></textarea>`,
  }),
};

/**
 * Textarea with label
 */
export const WithLabel: Story = {
  render: () => ({
    template: `
      <div class="space-y-2">
        <label class="text-sm font-medium">Your Message</label>
        <textarea uiTextarea placeholder="Type your message here..."></textarea>
      </div>
    `,
  }),
};

/**
 * Textarea with description
 */
export const WithDescription: Story = {
  render: () => ({
    template: `
      <div class="space-y-2">
        <label class="text-sm font-medium">Bio</label>
        <textarea uiTextarea rows="4" placeholder="Tell us about yourself..."></textarea>
        <p class="text-sm text-muted-foreground">
          Brief description for your profile. Max 500 characters.
        </p>
      </div>
    `,
  }),
};

/**
 * Disabled textarea
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `<textarea uiTextarea [disabled]="disabled" placeholder="This field is disabled"></textarea>`,
  }),
};

/**
 * Large textarea
 */
export const Large: Story = {
  args: {
    rows: 10,
  },
  render: (args) => ({
    props: args,
    template: `<textarea uiTextarea [rows]="rows" placeholder="Write a longer message..."></textarea>`,
  }),
};

/**
 * Reactive Forms integration
 */
@Component({
  selector: 'textarea-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, TextareaComponent],
  template: `
    <div class="space-y-4 max-w-md">
      <div class="space-y-2">
        <label class="text-sm font-medium">Comment</label>
        <textarea
          uiTextarea
          [formControl]="commentControl"
          placeholder="Share your thoughts..."
          rows="4"
        ></textarea>
        <p class="text-sm text-muted-foreground">
          {{ commentControl.value?.length || 0 }} characters
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        [disabled]="!commentControl.value"
        (click)="onSubmit()"
      >
        Post Comment
      </button>
    </div>
  `,
})
class TextareaReactiveFormComponent {
  commentControl = new FormControl('');

  onSubmit() {
    alert('Comment posted:\n\n' + this.commentControl.value);
  }
}

export const ReactiveForm: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: TextareaReactiveFormComponent,
  }),
};

/**
 * Required field with validation
 */
@Component({
  selector: 'textarea-required-form',
  standalone: true,
  imports: [ReactiveFormsModule, TextareaComponent],
  template: `
    <div class="space-y-4 max-w-md">
      <div class="space-y-2">
        <label class="text-sm font-medium">
          Feedback
          <span class="text-destructive">*</span>
        </label>
        <textarea
          uiTextarea
          [formControl]="feedbackControl"
          [class.border-destructive]="feedbackControl.invalid && feedbackControl.touched"
          placeholder="Your feedback is important to us..."
          rows="4"
        ></textarea>
        <p class="text-sm text-destructive font-medium" *ngIf="feedbackControl.hasError('required') && feedbackControl.touched">
          Feedback is required
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        (click)="onSubmit()"
      >
        Submit Feedback
      </button>
    </div>
  `,
})
class TextareaRequiredFormComponent {
  feedbackControl = new FormControl('', Validators.required);

  onSubmit() {
    this.feedbackControl.markAsTouched();
    if (this.feedbackControl.valid) {
      alert('Feedback submitted successfully!');
    }
  }
}

export const RequiredValidation: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: TextareaRequiredFormComponent,
  }),
};

/**
 * Textarea with minimum length validation
 */
@Component({
  selector: 'textarea-minlength-form',
  standalone: true,
  imports: [ReactiveFormsModule, TextareaComponent],
  template: `
    <div class="space-y-4 max-w-md">
      <div class="space-y-2">
        <label class="text-sm font-medium">Product Review</label>
        <textarea
          uiTextarea
          [formControl]="reviewControl"
          [class.border-destructive]="reviewControl.invalid && reviewControl.touched"
          placeholder="Write your review (minimum 20 characters)..."
          rows="5"
        ></textarea>
        <div class="flex justify-between text-sm">
          <div>
            <p class="text-destructive font-medium" *ngIf="reviewControl.hasError('minlength') && reviewControl.touched">
              Review must be at least 20 characters
            </p>
            <p class="text-muted-foreground" *ngIf="!reviewControl.hasError('minlength')">
              Minimum 20 characters required
            </p>
          </div>
          <p class="text-muted-foreground">
            {{ reviewControl.value?.length || 0 }}/20
          </p>
        </div>
      </div>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        [disabled]="reviewControl.invalid"
        (click)="onSubmit()"
      >
        Submit Review
      </button>
    </div>
  `,
})
class TextareaMinLengthFormComponent {
  reviewControl = new FormControl('', [Validators.required, Validators.minLength(20)]);

  onSubmit() {
    this.reviewControl.markAsTouched();
    if (this.reviewControl.valid) {
      alert('Review submitted!');
    }
  }
}

export const MinLengthValidation: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: TextareaMinLengthFormComponent,
  }),
};

/**
 * Textarea with maximum length validation
 */
@Component({
  selector: 'textarea-maxlength-form',
  standalone: true,
  imports: [ReactiveFormsModule, TextareaComponent],
  template: `
    <div class="space-y-4 max-w-md">
      <div class="space-y-2">
        <label class="text-sm font-medium">Short Bio</label>
        <textarea
          uiTextarea
          [formControl]="bioControl"
          [class.border-destructive]="bioControl.invalid && bioControl.touched"
          placeholder="Write a brief bio (max 100 characters)..."
          rows="3"
        ></textarea>
        <div class="flex justify-between text-sm">
          <p class="text-muted-foreground">Keep it short and sweet</p>
          <p [class]="(bioControl.value?.length || 0) > 100 ? 'text-destructive font-medium' : 'text-muted-foreground'">
            {{ bioControl.value?.length || 0 }}/100
          </p>
        </div>
        <p class="text-sm text-destructive font-medium" *ngIf="bioControl.hasError('maxlength') && bioControl.touched">
          Bio cannot exceed 100 characters
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        [disabled]="bioControl.invalid"
        (click)="onSubmit()"
      >
        Save Bio
      </button>
    </div>
  `,
})
class TextareaMaxLengthFormComponent {
  bioControl = new FormControl('', [Validators.maxLength(100)]);

  onSubmit() {
    this.bioControl.markAsTouched();
    if (this.bioControl.valid) {
      alert('Bio saved!');
    }
  }
}

export const MaxLengthValidation: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: TextareaMaxLengthFormComponent,
  }),
};

/**
 * Complete form with textarea
 */
@Component({
  selector: 'textarea-complete-form',
  standalone: true,
  imports: [ReactiveFormsModule, TextareaComponent],
  template: `
    <div class="space-y-6 max-w-md">
      <div class="space-y-2">
        <label class="text-sm font-medium">Subject</label>
        <input
          type="text"
          [formControl]="subjectControl"
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Enter subject..."
        />
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium">
          Message
          <span class="text-destructive">*</span>
        </label>
        <textarea
          uiTextarea
          [formControl]="messageControl"
          [class.border-destructive]="messageControl.invalid && messageControl.touched"
          placeholder="Type your message here..."
          rows="6"
        ></textarea>
        <p class="text-sm text-muted-foreground">
          {{ messageControl.value?.length || 0 }}/500 characters
        </p>
        <p class="text-sm text-destructive font-medium" *ngIf="messageControl.hasError('required') && messageControl.touched">
          Message is required
        </p>
        <p class="text-sm text-destructive font-medium" *ngIf="messageControl.hasError('minlength') && messageControl.touched">
          Message must be at least 10 characters
        </p>
        <p class="text-sm text-destructive font-medium" *ngIf="messageControl.hasError('maxlength') && messageControl.touched">
          Message cannot exceed 500 characters
        </p>
      </div>

      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        (click)="onSubmit()"
      >
        Send Message
      </button>
    </div>
  `,
})
class TextareaCompleteFormComponent {
  subjectControl = new FormControl('');
  messageControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(500),
  ]);

  onSubmit() {
    this.messageControl.markAsTouched();
    if (this.messageControl.valid) {
      alert('Message sent!\n\nSubject: ' + (this.subjectControl.value || 'No subject') + '\nMessage: ' + this.messageControl.value);
    }
  }
}

export const CompleteForm: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    component: TextareaCompleteFormComponent,
  }),
};
