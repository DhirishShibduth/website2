/**
 * App Component
 *
 * Main component showcasing all component library components
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import all components
import { ButtonComponent } from '@component-library/ui/button/button.component';
import { InputComponent } from '@component-library/ui/input/input.component';
import {
  DialogComponent,
  DialogContentComponent,
  DialogHeaderComponent,
  DialogFooterComponent,
  DialogTitleComponent,
  DialogDescriptionComponent,
} from '@component-library/ui/dialog/dialog.component';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent,
} from '@component-library/ui/card/card.component';
import { BadgeComponent } from '@component-library/ui/badge/badge.component';

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
  title = 'Component Library Demo';
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
