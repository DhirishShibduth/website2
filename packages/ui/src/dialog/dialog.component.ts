/**
 * Dialog Component
 *
 * A modal dialog component with overlay and animation support.
 * Provides a flexible API for creating dialogs with custom content.
 *
 * @example
 * <ui-dialog [open]="isOpen" (openChange)="isOpen = $event">
 *   <ui-dialog-content>
 *     <ui-dialog-header>
 *       <ui-dialog-title>Dialog Title</ui-dialog-title>
 *       <ui-dialog-description>Dialog description</ui-dialog-description>
 *     </ui-dialog-header>
 *     <div>Dialog content goes here</div>
 *     <ui-dialog-footer>
 *       <button uiButton variant="outline" (click)="isOpen = false">Cancel</button>
 *       <button uiButton (click)="confirm()">Confirm</button>
 *     </ui-dialog-footer>
 *   </ui-dialog-content>
 * </ui-dialog>
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../utils/cn';

/**
 * Main Dialog Container Component
 */
@Component({
  selector: 'ui-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="open" class="relative z-50">
      <!-- Overlay -->
      <div
        class="fixed inset-0 bg-black/80 transition-opacity"
        [class.opacity-0]="!open"
        (click)="onOverlayClick()"
      ></div>

      <!-- Dialog Container -->
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  /**
   * Whether the dialog is open
   */
  @Input() open: boolean = false;

  /**
   * Emits when the open state changes
   */
  @Output() openChange = new EventEmitter<boolean>();

  /**
   * Whether clicking the overlay closes the dialog
   * @default true
   */
  @Input() closeOnOverlayClick: boolean = true;

  /**
   * Handles overlay click
   */
  onOverlayClick(): void {
    if (this.closeOnOverlayClick) {
      this.openChange.emit(false);
    }
  }

  /**
   * Handles escape key press
   */
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.open) {
      event.preventDefault();
      this.openChange.emit(false);
    }
  }
}

/**
 * Dialog Content Component
 */
@Component({
  selector: 'ui-dialog-content',
  standalone: true,
  template: `
    <div
      [class]="classes"
      role="dialog"
      aria-modal="true"
    >
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentComponent {
  /**
   * Additional custom classes
   */
  @Input() class: string = '';

  get classes(): string {
    return cn(
      'relative bg-background rounded-lg border shadow-lg',
      'w-full max-w-lg p-6',
      'animate-in fade-in-0 zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      this.class
    );
  }
}

/**
 * Dialog Header Component
 */
@Component({
  selector: 'ui-dialog-header',
  standalone: true,
  template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogHeaderComponent {
  @Input() class: string = '';

  get classes(): string {
    return cn('flex flex-col space-y-1.5 text-center sm:text-left', this.class);
  }
}

/**
 * Dialog Footer Component
 */
@Component({
  selector: 'ui-dialog-footer',
  standalone: true,
  template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFooterComponent {
  @Input() class: string = '';

  get classes(): string {
    return cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      this.class
    );
  }
}

/**
 * Dialog Title Component
 */
@Component({
  selector: 'ui-dialog-title',
  standalone: true,
  template: `
    <h2 [class]="classes">
      <ng-content></ng-content>
    </h2>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTitleComponent {
  @Input() class: string = '';

  get classes(): string {
    return cn(
      'text-lg font-semibold leading-none tracking-tight',
      this.class
    );
  }
}

/**
 * Dialog Description Component
 */
@Component({
  selector: 'ui-dialog-description',
  standalone: true,
  template: `
    <p [class]="classes">
      <ng-content></ng-content>
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDescriptionComponent {
  @Input() class: string = '';

  get classes(): string {
    return cn('text-sm text-muted-foreground', this.class);
  }
}
