import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: User = new User;
  userWarn: boolean = false;
  userDone: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  register() {
    this.userService.registerUser(this.user)
    .subscribe(  (response) => {
      console.log("Пользователь успешно зарегистрирован:", response);
      this.userWarn = false;
      this.userDone = true;
    },
    (error) => {
      console.error("Ошибка при регистрации пользователя:", error);
      this.userWarn = true;
      this.userDone = false;
    }
    );
  }
}
