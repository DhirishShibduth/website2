/**
 * Card Component
 *
 * A versatile card component with header, content, and footer sections.
 * Perfect for displaying grouped content with consistent styling.
 *
 * @example
 * <ui-card>
 *   <ui-card-header>
 *     <ui-card-title>Card Title</ui-card-title>
 *     <ui-card-description>Card description</ui-card-description>
 *   </ui-card-header>
 *   <ui-card-content>Card content</ui-card-content>
 *   <ui-card-footer>Card footer</ui-card-footer>
 * </ui-card>
 */

import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { cn } from '../utils/cn';

/**
 * Main Card Container
 */
@Component({
  selector: 'ui-card',
  standalone: true,
  template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() class: string = '';

  get classes(): string {
    return cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      this.class
    );
  }
}

/**
 * Card Header Component
 */
@Component({
  selector: 'ui-card-header',
  standalone: true,
  template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {
  @Input() class: string = '';

  get classes(): string {
    return cn('flex flex-col space-y-1.5 p-6', this.class);
  }
}

/**
 * Card Title Component
 */
@Component({
  selector: 'ui-card-title',
  standalone: true,
  template: `
    <h3 [class]="classes">
      <ng-content></ng-content>
    </h3>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTitleComponent {
  @Input() class: string = '';

  get classes(): string {
    return cn(
      'text-2xl font-semibold leading-none tracking-tight',
      this.class
    );
  }
}

/**
 * Card Description Component
 */
@Component({
  selector: 'ui-card-description',
  standalone: true,
  template: `
    <p [class]="classes">
      <ng-content></ng-content>
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDescriptionComponent {
  @Input() class: string = '';

  get classes(): string {
    return cn('text-sm text-muted-foreground', this.class);
  }
}

/**
 * Card Content Component
 */
@Component({
  selector: 'ui-card-content',
  standalone: true,
  template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContentComponent {
  @Input() class: string = '';

  get classes(): string {
    return cn('p-6 pt-0', this.class);
  }
}

/**
 * Card Footer Component
 */
@Component({
  selector: 'ui-card-footer',
  standalone: true,
  template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFooterComponent {
  @Input() class: string = '';

  get classes(): string {
    return cn('flex items-center p-6 pt-0', this.class);
  }
}
