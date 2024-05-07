import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  fetchAddressData(token: string) {
    return axios.get('http://localhost:3000/Adresse/Read', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
