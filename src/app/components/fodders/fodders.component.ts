import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Fodder } from 'src/app/models/fodder';
import { FodderService } from 'src/app/services/fodder.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-fodders',
  templateUrl: './fodders.component.html',
  styleUrls: ['./fodders.component.css']
})
export class FoddersComponent {
  fodders: Fodder[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  showAddFoodPopup: boolean = false;
  newFodder: Fodder = new Fodder();

  constructor(private fodderService: FodderService, private router: Router) { }

  ngOnInit() : void {
    this.getFodders();
  }

  getFodders() {
    this.fodderService
      .getFodders()
      .subscribe((result: Fodder[]) => (this.fodders = result));
  }

  openAddFoodPopup() {
    this.showAddFoodPopup = true;
  }

  closeAddFoodPopup() {
    this.showAddFoodPopup = false;
  }

  addFood() {
    this.fodderService.addFodders(this.newFodder)
      .subscribe(  (response) => {
        console.log("Корм успешно добавлен:", response);
        this.getFodders();
        window.location.reload();
      },
      (error) => {
        console.error("Ошибка при добавлении корма:", error);
      }
    );
  }
}
