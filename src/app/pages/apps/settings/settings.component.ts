import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private router : Router) { }
  //adress object
  address = {
    username : '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
  };
  stats = {
    role : '',
    id : 0,
    username : '',
    fullname : '',
    email : ''
}

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
      axios.get('http://localhost:3000/Adresse/Read', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        // Handle successful response
        console.log('Data:', response.data);
        // You can assign response data to a variable or display it in your UI as needed
        this.address = response.data;
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
        // You can display an error message in your UI or handle the error in any other way
      });
      //add another endpoint that gets the user status
      if(window.sessionStorage.getItem('role') === 'admin'){
        axios.get(`http://localhost:3000/admin/status`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          // Handle successful response
          console.log('stats:', response.data);
          // You can assign response data to a variable or display it in your UI as needed
          this.stats = response.data;
        })
        .catch(error => {
          // Handle error
          console.error('Error fetching data:', error);
          // You can display an error message in your UI or handle the error in any other way
        });
      } else {
        axios.get(`http://localhost:3000/auth/status`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          // Handle successful response
          console.log('stats:', response.data);
          // You can assign response data to a variable or display it in your UI as needed
          this.stats = response.data;
        })
        .catch(error => {
          // Handle error
          console.error('Error fetching data:', error);
          // You can display an error message in your UI or handle the error in any other way
        });
      }
    } else {
      console.error('sessionStorage is not available');
    }
  }
  //update function
  updateProfile(){
    this.router.navigate(['/acc']);
  }
}
