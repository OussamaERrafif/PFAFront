import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupService } from './Signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      fullName: [
        '',
        Validators.required,
        // Validators.pattern('^[a-zA-Z]{1,20}$'),
      ],
      userName: [
        '',
        Validators.required,
        // Validators.pattern('^[a-zA-Z]{1,20}$'),
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        Validators.required,
        // Validators.pattern(
        //   '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&^#]{8,}$'
        // ),
      ],
    });
  }

  signup(): void {
    if (this.signupForm.valid) {
      try {
        this.signupService.signup(
          this.signupForm.value.fullName,
          this.signupForm.value.userName,
          this.signupForm.value.email,
          this.signupForm.value.password
        );
        this.router.navigate(['/login']);
        console.log('Form submitted:', this.signupForm.value);
      } catch (error) {
        window.alert('Error signing up');
      }
    } else {
      window.alert('Form is not valid');
    }
  }
}
