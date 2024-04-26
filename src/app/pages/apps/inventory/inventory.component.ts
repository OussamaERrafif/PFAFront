import { Component  } from '@angular/core';
import axios from 'axios';
import { NgFor  } from '@angular/common';
import { from, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from "./search.pipe";


@Component({
    selector: 'app-inventory',
    standalone: true,
    templateUrl: './inventory.component.html',
    styleUrl: './inventory.component.css',
    imports: [NgFor, FormsModule, SearchPipe]
})
export class InventoryComponent {
  products: any[] = [];
  searchText: string = '';
  product: any = {
    name: '',
    brand: '',
    price: null,
    category: '',
    quantity: null
  };

  selectedProductId: any;
  selectedProductName: string = '';



  ngOnInit(): void {
    this.fetchProducts();
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

  addProduct(product: any) {
    axios.post('http://localhost:3000/products/create', product)
      .then(response => {
        console.log('Product added successfully:', response.data);
        this.fetchProducts();
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  }

  loadProductDetails(productId: any) {
    this.selectedProductId = productId;
    this.selectedProductName = this.products.find(product => product.id === productId).name;

    axios.get(`http://localhost:3000/products/${productId}`)
      .then(response => {
        this.product = response.data;
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }
  updateProduct() {
    console.log('Product updated:', this.selectedProductId, this.product);

    axios.put(`http://localhost:3000/products/${this.selectedProductId}`, this.product)
      .then(response => {
        console.log('Product updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  }
  deleteProduct(): void {
    axios.delete(`http://localhost:3000/products/${this.selectedProductId}`, this.product)
      .then(response => {
        console.log('Product deleted successfully:', response.data);
        this.fetchProducts();
      })
      .catch(error => {
        console.error('Error deleting product:', error);

      });
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
  toggleDropdown1(index: number): void {
    const dropdown = document.getElementById('product-dropdown-' + index);
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
