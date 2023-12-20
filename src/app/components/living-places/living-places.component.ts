import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LivingPlace } from 'src/app/models/livingPlace';
import { LivingPlaceService } from 'src/app/services/living-place.service';

@Component({
  selector: 'app-living-places',
  templateUrl: './living-places.component.html',
  styleUrls: ['./living-places.component.css']
})
export class LivingPlacesComponent {
  livingPlaces: LivingPlace[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  showAddLivingPlacePopup: boolean = false;
  newLivingPlace: LivingPlace = new LivingPlace();

  constructor(private livingPlaceService: LivingPlaceService, private router: Router) { }

  ngOnInit() : void {
    this.getLivingPlaces();
  }

  getLivingPlaces() {
    this.livingPlaceService
      .getLivingPlaces()
      .subscribe((result: LivingPlace[]) => (this.livingPlaces = result));
  }

  openAddLivingPlacePopup() {
    this.showAddLivingPlacePopup = true;
  }

  closeAddLivingPlacePopup() {
    this.showAddLivingPlacePopup = false;
  }

  addLivingPlace() {
    this.livingPlaceService.addLivingPlace(this.newLivingPlace)
      .subscribe(  (response) => {
        console.log("Место успешно добавлено:", response);
        this.getLivingPlaces();
        window.location.reload();
      },
      (error) => {
        console.error("Ошибка при добавлении места:", error);
      }
    );
  }
}
