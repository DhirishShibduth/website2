/**
 * App Component
 *
 * Main component showcasing all shadcn-angular components
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import all components
import { ButtonComponent } from '@shadcn-angular/ui/button/button.component';
import { InputComponent } from '@shadcn-angular/ui/input/input.component';
import {
  DialogComponent,
  DialogContentComponent,
  DialogHeaderComponent,
  DialogFooterComponent,
  DialogTitleComponent,
  DialogDescriptionComponent,
} from '@shadcn-angular/ui/dialog/dialog.component';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent,
} from '@shadcn-angular/ui/card/card.component';
import { BadgeComponent } from '@shadcn-angular/ui/badge/badge.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent,
    DialogComponent,
    DialogContentComponent,
    DialogHeaderComponent,
    DialogFooterComponent,
    DialogTitleComponent,
    DialogDescriptionComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    CardFooterComponent,
    BadgeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'shadcn-angular Demo';
  darkMode = false;
  isDialogOpen = false;
  email = '';
  name = '';

  /**
   * Toggles dark mode
   */
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  /**
   * Opens the dialog
   */
  openDialog() {
    this.isDialogOpen = true;
  }

  /**
   * Handles form submission
   */
  handleSubmit() {
    console.log('Form submitted:', { name: this.name, email: this.email });
    this.isDialogOpen = false;
  }
}
