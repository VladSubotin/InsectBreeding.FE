import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Insect } from 'src/app/models/insect';
import { FodderService } from 'src/app/services/fodder.service';
import { InsectService } from 'src/app/services/insect.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-insects',
  templateUrl: './insects.component.html',
  styleUrls: ['./insects.component.css']
})
export class InsectsComponent {
  insects: Insect[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  showAddInsectPopup: boolean = false;
  newInsect: Insect = new Insect();

  constructor(private insectService: InsectService, private router: Router) { }

  ngOnInit() : void {
    this.getInsects();
  }

  getInsects() {
    this.insectService
      .getInsects()
      .subscribe((result: Insect[]) => (this.insects = result));
  }

  openAddInsectPopup() {
    this.showAddInsectPopup = true;
  }

  closeAddInsectPopup() {
    this.showAddInsectPopup = false;
  }

  addInsect() {
    this.insectService.addInsect(this.newInsect)
      .subscribe(  (response) => {
        console.log("Насекомое успешно добавлено:", response);
        this.getInsects();
        window.location.reload();
      },
      (error) => {
        console.error("Ошибка при добавлении насекомого:", error);
      }
    );
  }
}
