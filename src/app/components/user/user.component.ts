import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user: User = new User;
  password: string = "";
  newPassword: string = "";
  confirmDeleteModalVisible = false;
  confirmEditModalVisible = false;
  confirmEditPasswordModalVisible = false;
  passwordError: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() : void {
    this.getUser();
  }

  getUser() {
    this.userService
    .getUser()
    .subscribe((result: User) => (this.user = result));
  }

  confirmEdit() {
    this.confirmEditModalVisible = true;
  }

  cancelEdit() {
    this.confirmEditModalVisible = false;
    window.location.reload();
  }

  editUser() {
    
    if (this.password === this.user.password) {
      this.userService.editUser(this.user)
      .subscribe(  (response) => {
        console.log("Пользователь успешно изменен:", response);
        window.location.reload();
      },
      (error) => {
        console.error("Ошибка при изменении пользователя:", error);
      }
      );
    }
    else {
      this.passwordError = true;
    }
  }

  confirmEditPassword() {
    this.confirmEditPasswordModalVisible = true;
  }

  cancelEditPassword() {
    this.confirmEditPasswordModalVisible = false;
    window.location.reload();
  }

  editPassword() {
    
    if (this.password === this.user.password) {
      this.user.password = this.newPassword;
      this.userService.editUser(this.user)
      .subscribe(  (response) => {
        console.log("Пользователь успешно изменен:", response);
        window.location.reload();
      },
      (error) => {
        console.error("Ошибка при изменении пользователя:", error);
      }
      );
    }
    else {
      this.passwordError = true;
    }
  }

  confirmDelete() {
    this.confirmDeleteModalVisible = true;
  }

  cancelDelete() {
    this.confirmDeleteModalVisible = false;
    this.password = "";
    this.passwordError = false;
  }

  deleteUser() {
    if (this.password === this.user.password) {
      this.userService.deleteUser(this.user.id)
      .subscribe(  (response) => {
        console.log("Пользователь успешно удален:", response);
        this.userService.logout();
      },
      (error) => {
        console.error("Ошибка при удалении пользователя:", error);
      }
    );
      this.confirmDeleteModalVisible = false;
      console.log('Пользователь удален');
    }
    else {
      this.passwordError = true;
    }
  }
}
