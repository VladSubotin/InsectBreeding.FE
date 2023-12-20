import { Component } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'InsectBreeding.FE';
  isAuth: boolean = false;

  constructor(private userService: UserService, public translate: TranslateService) {}

  ngOnInit() : void {
    this.isAuth = this.userService.token != '';
  }
  public logout() {
    this.userService.logout();
  }
  
}
