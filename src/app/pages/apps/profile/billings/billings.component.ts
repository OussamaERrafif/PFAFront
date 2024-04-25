import { Component } from '@angular/core';

@Component({
  selector: 'app-billings',
  standalone: true,
  imports: [],
  templateUrl: './billings.component.html',
  styleUrl: './billings.component.css'
})
export class BillingsComponent {
  // Component logic goes here
  CardHolder: string = '';
  CardNumber: string = '';
  Valid: string = '';
  Expiry: string = '';
  CVV: string = '';

  handleCardNumber(event: Event) {
    const cardNumber = (event.target as HTMLInputElement).value;
    this.CardNumber = cardNumber;
  }
  handleCardHolder(event: Event) {
    const cardHolder = (event.target as HTMLInputElement).value;
    this.CardHolder = cardHolder;
  }
  handleValid(event: Event) {
    const valid = (event.target as HTMLInputElement).value;
    this.Valid = valid;
  }
  handleExpiry(event: Event) {
    const expiry = (event.target as HTMLInputElement).value;
    this.Expiry = expiry;
  }
  handleCVV(event: Event) {
    const cvv = (event.target as HTMLInputElement).value;
    this.CVV = cvv;
  }

}
