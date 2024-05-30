import { Component } from '@angular/core';
import axios from 'axios';
import { NgFor } from '@angular/common';
import { from, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SearchPipe1 } from './search.pipe';
import { ReadModalComponent } from './Modals/ReadModals/ReadModal/ReadModal.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    SearchPipe1,
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


  users: any[] = [];
  role: string[] = [];
  filteredRoles: string[] = [];
  searchText: string = '';


  user = {
    id:null,
    username: '',
    role: '',
    email: '',
    fullname: '',
    addresses: {
      street: '',
      city: '',
      state: '',
      postalCode: null,
    },
  };

  ngOnInit(): void {
    this.fetchUsers().subscribe(() => {
      this.filtercat();
      this.filterUsers();
    });
  }

  fetchUsers(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return from(
      axios
        .get('http://localhost:3000/admin/allUsers', { headers })
        .then((response) => {
          this.users = response.data.map((user: { id: any; username: any; role: any; email: any; fullname: any; addresses: { street: any; city: any; state: any; postalCode: any; }; }) => ({
            id: user.id,
            username: user.username,
            role: user.role,
            email: user.email,
            fullname: user.fullname,
            addresses: {
              street: user.addresses?.street || '',
              city: user.addresses?.city || '',
              state: user.addresses?.state || '',
              postalCode: user.addresses?.postalCode || null,
            },
          }));
          this.count = this.users.length;
          return this.users;
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
          throw error;
        })
    );
}

  // fetchUsers(): Observable<any> {
   //  return from(
     //  axios.get('http://localhost:3000/admin/allUsers').then((response) => {
       // this.products = response.data;

         //return response.data;
      //})
     //);
   //}

 /* fetchUsers(): Observable<any> {
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
  } */


  onTableDataChange(event: any): void {
    this.page = event;
    this.fetchUsers();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchUsers();
  }
  toggleFilter(role: string) {
    if (this.filteredRoles.includes(role)) {
      this.filteredRoles = this.filteredRoles.filter(
        (role) => role !== role
      );
    } else {
      this.filteredRoles.push(role);
    }
    this.filterUsers();
  }
  filterUsers() {
    if (this.filteredRoles.length === 0) {
      // Si aucune catégorie n'est filtrée, afficher tous les produits
      this.fetchUsers().subscribe();
    } else {
      // Sinon, filtrer les produits en fonction des catégories sélectionnées
      this.users = this.users.filter((user) =>
        this.filteredRoles.includes(user.role)
      );
    }
  }
  isRoleFiltered(role: string): boolean {
    return this.filteredRoles.includes(role);
  }



  addUser(user: any) {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No token found in sessionStorage');
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .post('http://localhost:3000/admin/createuser', user, { headers })
      .then((response) => {
        console.log('User added successfully:', response.data);
        const modal = document.getElementById('createUserModal');
        if (modal !== null) {
          modal.classList.add('hidden');
          modal.setAttribute('aria-hidden', 'true');
        }

        // // Afficher le mot de passe par défaut dans la console
        // const defaultPassword = response.data.defaultPassword;
        // alert(`User added successfully. Default password: ${defaultPassword}`);

        // Ajouter l'utilisateur au tableau sans recharger la page
        this.users.push({
          username: user.username,
          role: user.role,
          email: user.email,
          fullname: user.fullname,
          addresses: {
            street: user.addresses?.street || '',
            city: user.addresses?.city || '',
            state: user.addresses?.state || '',
            postalCode: user.addresses?.postalCode || null,
          }
        });
        this.count = this.users.length;
        this.onSuccess();
      })
      .catch((error) => {
        // if (error.response) {
        //   console.error('Error response:', error.response.data);
        //   console.error('Error status:', error.response.status);
        //   console.error('Error headers:', error.response.headers);
        // } else if (error.request) {
        //   console.error('Error request:', error.request);
        // } else {
        //   console.error('Error message:', error.message);
        // }
        // console.error('Error config:', error.config);
        window.alert('Error adding user. Please try again later.');
        this.onError();
      });
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




  filtercat(): void {
    const uniqueRoles = [
      ...new Set(this.users.map((user) => user.role)),
    ];
    this.role = uniqueRoles.filter(Boolean);

    console.log('role', this.role);
  }

  getUserByUsername(username: string): void {
    console.log('username :', username);
    this.getUser(username);
  }

  //get user by username
  getUser(username: string): void {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No token found in sessionStorage');
      // Rediriger vers la page de connexion ou afficher un message d'erreur
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get<any>(`http://localhost:3000/admin/getUser/${username}`, { headers })
      .then((response) => {
        if (response.status === 200) {
          console.log('response', response.data);
          this.users = response.data;
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
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No token found in sessionStorage');
      // Rediriger vers la page de connexion ou afficher un message d'erreur
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .post(`http://localhost:3000/admin/updateuser/${username}`,user, { headers })
      .then((response) => {
        console.log('User updated successfully:', response.data);
        this.hideModal('updateUserModal');
        this.fetchUsers();
        this.onSuccess();
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        this.onError();
      });
  }

  

  //delete user by username
  deleteUser(username: string): void {
    console.log('username :', username);
    axios
      .delete(`http://localhost:3000/admin/deleteuser/${username}`)
      .then((response) => {
        console.log('User deleted successfully:', response.data);
        this.hideModal('deleteUserModal');
        this.fetchUsers();
        this.onSuccess();
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
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
    const modal = document.getElementById('createUserModal');
    if (modal !== null) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }
  // Fonction pour afficher ou masquer le modal
  toggleModal(): void {
    const modal = document.getElementById('createUserModal');
    if (modal !== null && modal.classList.contains('hidden')) {
      const nameModal = document.getElementById('cusername') as HTMLInputElement;
      const fullnameModal = document.getElementById('cfullname') as HTMLInputElement;
      const emailModal = document.getElementById('cemail') as HTMLInputElement;
      const cityModal = document.getElementById(
        'ccity'
      ) as HTMLInputElement;
      const stateModal = document.getElementById(
        'cstate'
      ) as HTMLInputElement;
      const roleModal = document.getElementById('crole') as HTMLInputElement;
      if (nameModal !== null) {
        nameModal.value = '';
      }
      if (fullnameModal !== null) {
        fullnameModal.value = '';
      }
      if (emailModal !== null) {
        emailModal.value = '';
      }
      if (cityModal !== null) {
        cityModal.value = '';
      }
      if (stateModal !== null) {
        stateModal.value = '';
      }
      if (roleModal !== null) {
        roleModal.value = '';
      }

      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    } else if (modal !== null) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  toggleDropdown1(index: number): void {
    const dropdown = document.getElementById('user-dropdown-' + index);
    if (dropdown !== null && dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden');
    } else if (dropdown !== null) {
      dropdown.classList.add('hidden');
    }
  }
  // Fonction pour afficher ou masquer le modal
  toggleModalEdit(): void {
    const modal = document.getElementById('updateUserModal');
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
    const modal = document.getElementById('updateUserModal');
    if (modal !== null) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // Fonction pour afficher ou masquer le modal
  toggleModalRead(): void {
    const modal = document.getElementById('readUserModal');
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
    const modal = document.getElementById('deleteUserModal');
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
    const modal = document.getElementById('deleteUserModal');
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
