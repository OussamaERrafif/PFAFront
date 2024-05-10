import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { R } from 'vitest/dist/reporters-P7C2ytIv';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  accountForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.accountForm = this.fb.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      city: [''],
      country: [''],
      state: [''],
      zipcode: [''],
      billingAddressCheck: [false],
    });
  }

  test: string = 'test';

  address = {
    username: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
  };

  stats = {
    role: '',
    id: 0,
    username: '',
    fullname: '',
    email: '',
  };

  ngOnInit(): void {
    // Check if sessionStorage is available (in the browser environment)
    if (typeof window !== 'undefined' && window.sessionStorage) {
      // Fetch token from session storage
      const token = window.sessionStorage.getItem('token');
      if (!token) {
        console.error('Token not found in session storage');
        return;
      }

      // Axios GET request to fetch data
      axios
        .get('http://localhost:3000/Adresse/Read', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Handle successful response
          console.log('Data:', response.data);
          // You can assign response data to a variable or display it in your UI as needed
          this.address = response.data;
          this.accountForm.patchValue({
            address: this.address.street,
            city: this.address.city,
            country: this.address.state,
            zipcode: this.address.postalCode,
          });
        })
        .catch((error) => {
          // Handle error
          console.error('Error fetching data:', error);
          // You can display an error message in your UI or handle the error in any other way
        });
      //add another endpoint that gets the user status
      axios
        .get(`http://localhost:3000/${window.sessionStorage.getItem('role')}/status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Handle successful response
          console.log('stats:', response.data);
          // You can assign response data to a variable or display it in your UI as needed
          this.stats = response.data;
          this.accountForm.patchValue({
            fullname: this.stats.fullname,
            username: this.stats.username,
            email: this.stats.email,
          });
        })
        .catch((error) => {
          // Handle error
          console.error('Error fetching data:', error);
          // You can display an error message in your UI or handle the error in any other way
        });
    } else {
      console.error('sessionStorage is not available');
    }
  }

  saveChanges(): void {
    if (this.accountForm.valid) {
      // Check if sessionStorage is available (in the browser environment)
      if (typeof window !== 'undefined' && window.sessionStorage) {
        // Fetch token from session storage
        const token = window.sessionStorage.getItem('token');
        if (!token) {
          console.error('Token not found in session storage');
          return;
        }

        // Axios POST request to save changes
        //take only the full name and email

        if (window.sessionStorage.getItem('role') === 'admin') {
          axios.post(
            'http://localhost:3000/admin/update',
            {
              fullname: this.accountForm.value.fullname,
              email: this.accountForm.value.email,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
        axios.post(
          'http://localhost:3000/auth/update',
          {
            fullname: this.accountForm.value.fullname,
            email: this.accountForm.value.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );}

        //same for adresse
        axios.post(
          'http://localhost:3000/Adresse/Update',
          {
            street: this.accountForm.value.address,
            city: this.accountForm.value.city,
            state: this.accountForm.value.country,
            postalCode: this.accountForm.value.zipcode,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('Form submitted:', this.accountForm.value);
        this.router.navigate(['/settings']);
      }
    }
  }
}
