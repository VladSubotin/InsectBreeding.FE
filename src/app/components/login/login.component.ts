import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User;
  userWarn: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  login() {
    this.userService.login(this.user)
    .subscribe(  (response) => {
      console.log("користувача авторизовано:", response);

      localStorage.setItem('auth-token', response.token);
      this.userService.token = response.token;

      this.userService.getUser().subscribe( (response) => {
        localStorage.setItem('user-id', response.id);
        this.userService.userId = response.id;
      });
      this.router.navigate(['/livingPlaces']);
    },
    (error) => {
      console.error("Помилка авторизації:", error);
      this.userWarn = true;
    }
    );
  }
}
