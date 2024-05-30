import { Component } from '@angular/core';
import axios from 'axios';
import { NgFor } from '@angular/common';
import { from, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';
import { ReadModalComponent } from './Modals/ReadModals/ReadModal/ReadModal.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    SearchPipe,
    ReadModalComponent,
    NgxPaginationModule,
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  title = 'pagination';
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [5, 10, 15, 20];

  products: any[] = [];
  category: string[] = [];
  filteredCategories: string[] = [];
  searchText: string = '';
  product: any = {
    id: null,
    name: '',
    brand: '',
    price: null,
    category: '',
    quantity: null,
  };

  ngOnInit(): void {
    this.fetchProducts().subscribe(() => {
      this.filtercat();
      this.filterProducts();
    });
  }
  fetchProducts(): Observable<any> {
    return from(
      axios.get('http://localhost:3000/products').then((response) => {
        this.products = response.data;

        return response.data;
      })
    );
  }

  showToast(type: 'success' | 'warning') {
    const toastId = type === 'success' ? 'toast-success' : 'toast-warning';
    const toast = document.getElementById(toastId);
    if (toast) {
      toast.classList.remove('hidden');
      setTimeout(() => {
        this.closeToast(toastId);
      }, 5000); // Auto-hide after 5 seconds
    }
  }

  closeToast(toastId: string) {
    const toast = document.getElementById(toastId);
    if (toast) {
      toast.classList.add('hidden');
    }
  }

  // Example method to show success toast
  onSuccess() {
    this.showToast('success');
  }

  // Example method to show warning toast
  onError() {
    this.showToast('warning');
  }

  onTableDataChange(event: any): void {
    this.page = event;
    this.fetchProducts();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchProducts();
  }
  toggleFilter(category: string) {
    if (this.filteredCategories.includes(category)) {
      this.filteredCategories = this.filteredCategories.filter(
        (cat) => cat !== category
      );
    } else {
      this.filteredCategories.push(category);
    }
    this.filterProducts();
  }
  filterProducts() {
    if (this.filteredCategories.length === 0) {
      // Si aucune catégorie n'est filtrée, afficher tous les produits
      this.fetchProducts().subscribe();
    } else {
      // Sinon, filtrer les produits en fonction des catégories sélectionnées
      this.products = this.products.filter((product) =>
        this.filteredCategories.includes(product.category)
      );
    }
  }
  isCategoryFiltered(category: string): boolean {
    return this.filteredCategories.includes(category);
  }

  addProduct(product: any) {
    axios
      .post('http://localhost:3000/products/create', product)
      .then((response) => {
        console.log('Product added successfully:', response.data);
        const modal = document.getElementById('createProductModal');
        if (modal !== null) {
          modal.classList.add('hidden');
          modal.setAttribute('aria-hidden', 'true');
        }
        this.fetchProducts();
        this.filtercat();
        this.onSuccess();
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        this.onError();
      });
  }

  filtercat(): void {
    const uniqueCategories = [
      ...new Set(this.products.map((product) => product.category)),
    ];
    this.category = uniqueCategories.filter(Boolean);

    console.log('cat', this.category);
  }

  getProductById(id: number): void {
    console.log('id', id);
    this.getById(id);
  }

  getById(id: number): void {
    axios
      .get<any>(`http://localhost:3000/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log('response', response.data);
          this.product = response.data;
        } else {
          console.error('Error fetching product data');
        }
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }
  updateProduct(product: any) {
    axios
      .put(`http://localhost:3000/products/${product.id}`, product)
      .then((response) => {
        console.log('Product updated successfully:', response.data);
        this.hideModal('updateProductModal');
        this.fetchProducts();
        this.onSuccess();
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        this.onError();
      });
  }

  deleteProduct(id: any) {
    axios
      .delete(`http://localhost:3000/products/${id}`, id)
      .then((response) => {
        console.log('Product deleted successfully:', response.data);
        this.hideModal('deleteProductModal');
        this.fetchProducts();
        this.onSuccess();
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        this.onError();
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
      const nameModal = document.getElementById('cname') as HTMLInputElement;
      const brandModal = document.getElementById('cbrand') as HTMLInputElement;
      const priceModal = document.getElementById('cprice') as HTMLInputElement;
      const categoryModal = document.getElementById(
        'ccategory'
      ) as HTMLInputElement;
      const quantityModal = document.getElementById(
        'cquantity'
      ) as HTMLInputElement;
      if (nameModal !== null) {
        nameModal.value = '';
      }
      if (brandModal !== null) {
        brandModal.value = '';
      }
      if (priceModal !== null) {
        priceModal.value = '';
      }
      if (categoryModal !== null) {
        categoryModal.value = '';
      }
      if (quantityModal !== null) {
        quantityModal.value = '';
      }

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

  // Fonction pour afficher ou masquer le modal
  toggleModalDelete(): void {
    const modal = document.getElementById('deleteProductModal');
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
    const modal = document.getElementById('deleteProductModal');
    if (modal !== null) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  hideModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal !== null) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }
}
