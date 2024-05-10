import { Component } from '@angular/core';
import axios from 'axios';
import { NgFor } from '@angular/common';
import { from, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';
import { ReadModalComponent } from './Modals/ReadModals/ReadModal/ReadModal.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    SearchPipe,
    ReadModalComponent,
    NgxPaginationModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
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

  

  user = {
    username: '',
    role: '',
    email: '',
    fullname: '',
    addresses: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
    },
  };

  ngOnInit(): void {
    this.fetchUsers().subscribe(() => {
      this.filtercat();
      this.filterProducts();
    });
  }
  // fetchUsers(): Observable<any> {
  //   return from(
  //     axios.get('http://localhost:3000/products').then((response) => {
  //       this.products = response.data;

  //       return response.data;
  //     })
  //   );
  // }

  fetchUsers(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    console.log('Fetching users...'); // Debug log

    return from(
      axios
        .get('http://localhost:3000/admin/allUsers', { headers })
        .then((response) => {
          this.user = response.data;

          console.log('Users fetched successfully:', response.data); // Debug log

          return response.data;
        })
        .catch((error) => {
          console.error('Error fetching users:', error); // Error handling
          throw error;
        })
    );
  }

  

  onTableDataChange(event: any): void {
    this.page = event;
    this.fetchUsers();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchUsers();
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
      this.fetchUsers().subscribe();
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

  addProduct(user: any) {
    axios
      .post('http://localhost:3000/admin/createuser', user)
      .then((response) => {
        console.log('Product added successfully:', response.data);
        const modal = document.getElementById('createProductModal');
        if (modal !== null) {
          modal.classList.add('hidden');
          modal.setAttribute('aria-hidden', 'true');
        }
        this.fetchUsers();
        this.filtercat();
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  }

  //add user
  addUser(user: any) {
    axios
      .post('http://localhost:3000/admin/createuser', user)
      .then((response) => {
        console.log('User added successfully:', response.data);
        const modal = document.getElementById('createUserModal');
        if (modal !== null) {
          modal.classList.add('hidden');
          modal.setAttribute('aria-hidden', 'true');
        }
        this.fetchUsers();
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
  }

  filtercat(): void {
    const uniqueCategories = [
      ...new Set(this.products.map((product) => product.category)),
    ];
    this.category = uniqueCategories.filter(Boolean);

    console.log('cat', this.category);
  }

  getProductById(id: string): void {
    console.log('id', id);
    this.getById(id);
  }

  // getById(id: number): void {
  //   axios
  //     .get<any>(`http://localhost:3000/products/${id}`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log('response', response.data);
  //         this.product = response.data;
  //       } else {
  //         console.error('Error fetching product data');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching product data:', error);
  //     });
  // }

  //get user by username
  getById(username: string): void {
    axios
      .get<any>(`http://localhost:3000/admin/${username}`)
      .then((response) => {
        if (response.status === 200) {
          console.log('response', response.data);
          this.user = response.data;
        } else {
          console.error('Error fetching user data');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }

  //update user by username
  updateUser(username: string, user: any): void {
    axios
      .put(`http://localhost:3000/admin/${username}`, user)
      .then((response) => {
        console.log('User updated successfully:', response.data);
        this.hideModal('updateUserModal');
        this.fetchUsers();
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  }

  //delete user by username
  deleteUser(username: string): void {
    axios
      .delete(`http://localhost:3000/admin/${username}`)
      .then((response) => {
        console.log('User deleted successfully:', response.data);
        this.hideModal('deleteUserModal');
        this.fetchUsers();
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
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
