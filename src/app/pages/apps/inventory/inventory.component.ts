import { Component  } from '@angular/core';
import axios from 'axios';
import { NgFor  } from '@angular/common';
import { from, Observable } from 'rxjs';


@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [NgFor],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  products: any[] = [];
  category: string[] = [];


  ngOnInit(): void {
    this.fetchProducts().subscribe(() => {
      this.filtercat();
    });
  }

  // async fetchProducts(): Promise<void> {
  //   try {
  //     const response = await axios.get('http://localhost:3000/products');
  //     this.products = response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  fetchProducts(): Observable<any> {
    return from(axios.get('http://localhost:3000/products').then(response => {
      this.products = response.data;
      
      return response.data;
    }));
  }

  filtercat(): void {
    // Extract unique categories from products
    const uniqueCategories = [...new Set(this.products.map(product => product.category))];
    this.category = uniqueCategories.filter(Boolean); // Remove any undefined or null values
    console.log("cat",this.category);
  }
  

  toggleDropdown(): void {
    const dropdown = document.getElementById('actionsDropdown');
    if (dropdown !== null && dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden');
    } else if (dropdown !== null) {
      dropdown.classList.add('hidden');
    }
  }

  toggleFilterDropdown(): void {
    const dropdown = document.getElementById('filterDropdown');
    if (dropdown !== null && dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden');
    } else if (dropdown !== null) {
      dropdown.classList.add('hidden');
    }
  }
  // Fonction pour fermer le modal
  closeModal(): void {
    const modal = document.getElementById('createProductModal');
    if (modal !== null) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }
  // Fonction pour afficher ou masquer le modal
  toggleModal(): void {
    const modal = document.getElementById('createProductModal');
    if (modal !== null && modal.classList.contains('hidden')) {
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    } else if (modal !== null) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }
  toggleDropdown1(): void {
    const dropdown = document.getElementById('product-dropdown');
    if (dropdown !== null && dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden');
    } else if (dropdown !== null) {
      dropdown.classList.add('hidden');
    }
  }
  // Fonction pour afficher ou masquer le modal
  toggleModalEdit(): void {
    const modal = document.getElementById('updateProductModal');
    if (modal !== null && modal.classList.contains('hidden')) {
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    } else if (modal !== null) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }
  // Fonction pour fermer le modal
  closeModalEdit(): void {
    const modal = document.getElementById('updateProductModal');
    if (modal !== null) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // Fonction pour afficher ou masquer le modal
  toggleModalRead(): void {
    const modal = document.getElementById('readProductModal');
    if (modal !== null && modal.classList.contains('hidden')) {
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    } else if (modal !== null) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }
  // Fonction pour fermer le modal
  closeModalRead(): void {
    const modal = document.getElementById('readProductModal');
    if (modal !== null) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // Fonction pour afficher ou masquer le modal
  toggleModalDelete(): void {
    const modal = document.getElementById('deleteModal');
    if (modal !== null && modal.classList.contains('hidden')) {
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    } else if (modal !== null) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }
  // Fonction pour fermer le modal
  closeModalDelete(): void {
    const modal = document.getElementById('deleteModal');
    if (modal !== null) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }
}
