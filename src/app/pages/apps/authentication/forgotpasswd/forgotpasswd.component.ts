import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgotpasswd.component.html',
  styleUrls: ['./forgotpasswd.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class ForgotpasswdComponent {
  constructor(private http: HttpClient) {}

  email:string = '';

  // onSubmit(form: NgForm) {
  //   if (!form.valid) {
  //     return;
  //   }
  //   const email = form.value.email;
  //   this.http
  //     .post<{ message: string }>(
  //       'http://localhost:3000/auth/forgot-password',
  //       { email }
  //     )
  //     .subscribe({
  //       next: (response) => {
  //         console.log(email);
  //         console.log(response.message); // or handle it in a more user-friendly way
  //       },
  //       error: (error) => {
  //         console.error('Error:', error);
  //       },
  //     });
  //   form.reset();
  // }

  //get email from the form and then use axios to send the email to the backend
  onSubmit(form: NgForm) {
    if (!form.valid) {
          return;
        }
        const email = form.value.email;
    
    axios
      .post('http://localhost:3000/auth/forgot-password', {
        email,
      })
      .then((response) => {
        console.log(email);
        console.log(response.data); // or handle it in a more user-friendly way
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
