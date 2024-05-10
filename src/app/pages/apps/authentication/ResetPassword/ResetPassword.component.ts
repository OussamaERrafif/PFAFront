import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-reset-password',
  templateUrl: './ResetPassword.component.html',
  styleUrls: ['./ResetPassword.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  resetPasswordForm: FormGroup;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('newPassword')?.value === formGroup.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        console.error('Token is missing!');
        // Add handling logic here
      }
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      axios.post('http://localhost:3000/auth/reset-password', {
        token: this.token,
        newPassword: this.resetPasswordForm.value.newPassword,
      })
      .then(response => {
        console.log('Password reset successful:', response.data);
        // Handle success
      })
      .catch(error => {
        console.error('Error resetting password:', error.response.data);
        // Handle error
      });
    } else {
      console.error('Form is not valid');
      // Display error messages
    }
  }
}

