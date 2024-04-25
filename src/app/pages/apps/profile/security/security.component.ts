import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-security',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './security.component.html',
  styleUrl: './security.component.css'
})
export class SecurityComponent {
  securityForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.securityForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      enable2FA: [false],
      signOutAll: [false],
    });
  }

  saveChanges(): void {
    if (this.securityForm.valid) {
      // Logic to save changes to backend or perform other actions
      console.log('Form submitted:', this.securityForm.value);
    }
  }

}
