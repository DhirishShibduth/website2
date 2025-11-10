/**
 * App Component
 *
 * Main component showcasing all component library components
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

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

// Import form components
import { LabelComponent } from '@component-library/ui/label/label.component';
import { FormDescriptionComponent } from '@component-library/ui/form-description/form-description.component';
import { FormMessageComponent } from '@component-library/ui/form-message/form-message.component';
import { CheckboxComponent } from '@component-library/ui/checkbox/checkbox.component';
import { RadioComponent } from '@component-library/ui/radio/radio.component';
import { SwitchComponent } from '@component-library/ui/switch/switch.component';
import { TextareaComponent } from '@component-library/ui/textarea/textarea.component';
import { SelectComponent, SelectOptionComponent } from '@component-library/ui/select/select.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    LabelComponent,
    FormDescriptionComponent,
    FormMessageComponent,
    CheckboxComponent,
    RadioComponent,
    SwitchComponent,
    TextareaComponent,
    SelectComponent,
    SelectOptionComponent,
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

  // Reactive form for comprehensive form demo
  contactForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', [Validators.required, Validators.minLength(20)]),
    newsletter: new FormControl(false),
    contactMethod: new FormControl('email', Validators.required),
    country: new FormControl('', Validators.required),
  });

  // Settings form for switches
  settingsForm = new FormGroup({
    emailNotifications: new FormControl(true),
    pushNotifications: new FormControl(false),
    darkModeToggle: new FormControl(false),
  });

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

  /**
   * Handles contact form submission
   */
  handleContactSubmit() {
    if (this.contactForm.valid) {
      console.log('Contact form submitted:', this.contactForm.value);
      alert('Thank you! Your message has been sent.');
      this.contactForm.reset();
    } else {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  /**
   * Handles settings form save
   */
  handleSettingsSave() {
    console.log('Settings saved:', this.settingsForm.value);
    alert('Settings saved successfully!');
  }
}
