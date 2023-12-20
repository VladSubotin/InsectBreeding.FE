import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Fodder } from 'src/app/models/fodder';
import { Insect } from 'src/app/models/insect';
import { FodderService } from 'src/app/services/fodder.service';
import { InsectService } from 'src/app/services/insect.service';
import { LivingPlace } from 'src/app/models/livingPlace';
import { LivingPlaceFodder } from 'src/app/models/livingPlaceFodder';
import { LivingPlaceService } from 'src/app/services/living-place.service';
import { LivingPlaceInsect } from 'src/app/models/livingPlaceInsect';
import { RequiredTemperatureResponse } from 'src/app/models/RequiredTemperatureResponse';
import { InsectFodder } from 'src/app/models/insectFodder';
import { RequiredLivingSpaceResponse } from 'src/app/models/RequiredLivingSpaceResponse';

@Component({
  selector: 'app-living-place',
  templateUrl: './living-place.component.html',
  styleUrls: ['./living-place.component.css']
})
export class LivingPlaceComponent {
  livingPlaceId: string = "";
  livingPlace: LivingPlace = new LivingPlace();
  confirmDeleteModalVisible = false;
  confirmEditModalVisible = false;
  confirmLPWarnModalVisible = false;

  livingPlaceFodders : LivingPlaceFodder[] = [];
  livingPlaceFodder: LivingPlaceFodder = new LivingPlaceFodder();
  newLivingPlaceFodder: LivingPlaceFodder = new LivingPlaceFodder();
  fodders: Fodder[] = [];
  showAddLivingPlaceFodderPopup: boolean = false;
  confirmLPFDeleteModalVisible = false;
  confirmLPFEditModalVisible = false;
  currentPageLPF = 1;
  itemsPerPageLPF = 5;
  confirmLPFWarnModalVisible = false;

  livingPlaceInsects : LivingPlaceInsect[] = [];
  livingPlaceInsect: LivingPlaceInsect = new LivingPlaceInsect();
  newLivingPlaceInsect: LivingPlaceInsect = new LivingPlaceInsect();
  insects: Insect[] = [];
  showAddLivingPlaceInsectPopup: boolean = false;
  confirmLPIDeleteModalVisible = false;
  confirmLPIEditModalVisible = false;
  currentPageLPI = 1;
  itemsPerPageLPI = 5;
  confirmLPIWarnModalVisible = false;


  constructor(private livingPlaceService: LivingPlaceService, private route: ActivatedRoute,
    private router: Router, private fodderService: FodderService,
    private insectService: InsectService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.livingPlaceId = id;
    } 
    this.getLivingPlace();
    this.getLivingPlaceInsects();
    this.getLivingPlaceFodders();
  }

  getLivingPlace() {
    this.livingPlaceService.getLivingPlace(this.livingPlaceId).subscribe((result: LivingPlace) => {
      this.livingPlace = result;
  
      this.livingPlaceService.checkRequiredLivingSpace(this.livingPlace.id).subscribe((response: RequiredLivingSpaceResponse) => {
        this.livingPlace.requiredLivingSpaceResponse = response;
      });
    });
  }

  confirmEdit() {
    this.confirmEditModalVisible = true;
  }

  cancelEdit() {
    this.confirmEditModalVisible = false;
    window.location.reload();
  }

  editLivingPlace() {
    this.livingPlaceService.editLivingPlace(this.livingPlace)
      .subscribe(  (response) => {
        console.log("Место успешно изменено:", response);
        window.location.reload();
      },
      (error) => {
        console.error("Ошибка при изменении места:", error);
      }
    );
  }

  confirmDelete() {
    this.confirmDeleteModalVisible = true;
  }

  cancelDelete() {
    this.confirmDeleteModalVisible = false;
  }

  deleteLivingPlace() {
    this.livingPlaceService.deleteLivingPlace(this.livingPlace.id)
    .subscribe(  (response) => {
      console.log("Место успешно удалено:", response);
      this.router.navigate(['/livingPlaces']);
    },
    (error) => {
      console.error("Ошибка при удалении Места:", error);
    }
  );
    this.confirmDeleteModalVisible = false;
    console.log('Место удалено');
  }


  //LPFodder


  getLivingPlaceFodders() {
    this.livingPlaceService.getLivingPlaceFodders(this.livingPlaceId).subscribe((result: LivingPlaceFodder[]) => {
      this.livingPlaceFodders = result;
    
      const requests = this.livingPlaceFodders.map((livingPlaceFodder: LivingPlaceFodder) =>
        this.fodderService.getFodder(livingPlaceFodder.fodderId)
      );
    
      forkJoin(requests).subscribe((fodderResults: Fodder[]) => {
        fodderResults.forEach((result: Fodder, index: number) => {
          this.livingPlaceFodders[index].fodderName = result.name;
        });
        // add fodderEnoughVolumeResponse
        const fodderRequests = this.livingPlaceFodders.map((livingPlaceFodder: LivingPlaceFodder) =>
          this.livingPlaceService.checkFodderEnoughVolume(livingPlaceFodder.livingPlaseId, livingPlaceFodder.fodderId)
        );
  
        forkJoin(fodderRequests).subscribe((fodderResults: any[]) => {
          fodderResults.forEach((result: any, index: number) => {
            this.livingPlaceFodders[index].fodderEnoughVolumeResponse = result;
          });
        });

      });
    });
  }

  getLivingPlaceFodder(livingPlaceId: string, fodderId: string) {
    this.livingPlaceService
      .getLivingPlaceFodder(livingPlaceId, fodderId)
      .subscribe((result: LivingPlaceFodder) => (this.livingPlaceFodder = result));
  }

  //add LPF

  openAddLivingPlaceFodderPopup() {
    this.showAddLivingPlaceFodderPopup = true;
    this.getFodders();
  }

  closeAddLivingPlaceFodderPopup() {
    this.showAddLivingPlaceFodderPopup = false;
  }

  addLivingPlaceFodder() {
    this.newLivingPlaceFodder.livingPlaseId = this.livingPlaceId;
    this.livingPlaceService.addLivingPlaceFodder(this.newLivingPlaceFodder)
      .subscribe(  (response) => {
        console.log("Корм для места успешно добавлен:", response);
        this.getLivingPlaceFodders();
        window.location.reload();
      },
      (error) => {
        console.error("Ошибка при добавлении корма для места:", error);
      }
    );
  }

  getFodders() {
    this.fodderService
    .getFodders()
    .subscribe((result: Fodder[]) => {
      const filteredFodders = result.filter((fodder: Fodder) => {
        return !this.livingPlaceFodders.some((livingPlaceFodder: LivingPlaceFodder) => livingPlaceFodder.fodderId === fodder.id);
      });
      this.fodders = filteredFodders;
    });
  }

  //edit LPF

  confirmLPFEdit(livingPlaceId: string, fodderId: string) {
    this.getLivingPlaceFodder(livingPlaceId, fodderId);
    this.confirmLPFEditModalVisible = true;
  }

  cancelLPFEdit() {
    this.confirmLPFEditModalVisible = false;
    window.location.reload();
  }

  editLivingPlaceFodder(livingPlaceId: string, fodderId: string) {
    this.livingPlaceService.editLivingPlaceFodder(this.livingPlaceFodder)
      .subscribe(  (response) => {
        console.log("Корм места успешно изменен:", response);
        window.location.reload();
      },
      (error) => {
        console.error("Ошибка при изменении корма места:", error);
      }
    );
  }

  //delete LPF

  confirmLPFDelete(livingPlaceId: string, fodderId: string) {
    this.getLivingPlaceFodder(livingPlaceId, fodderId);
    this.confirmLPFDeleteModalVisible = true;
  }

  cancelLPFDelete() {
    this.confirmLPFDeleteModalVisible = false;
  }

  deleteLivingPlaceFodder(livingPlaceId: string, fodderId: string) {
    this.livingPlaceService.deleteLivingPlaceFodder(livingPlaceId, fodderId)
    .subscribe(  (response) => {
      console.log("Корм места успешно удален:", response);
      window.location.reload();
    },
    (error) => {
      console.error("Ошибка при удалении корма места:", error);
    }
  );
    this.confirmLPFDeleteModalVisible = false;
    console.log('Корм места удален');
  }


  //LPInsect


  getLivingPlaceInsects() {
    this.livingPlaceService.getLivingPlaceInsects(this.livingPlaceId).subscribe((result: LivingPlaceInsect[]) => {
      this.livingPlaceInsects = result;
  
      // add insectName
      const requests = this.livingPlaceInsects.map((livingPlaceInsect: LivingPlaceInsect) =>
        this.insectService.getInsect(livingPlaceInsect.insectId)
      );
  
      forkJoin(requests).subscribe((insectResults: Insect[]) => {
        insectResults.forEach((result: Insect, index: number) => {
          this.livingPlaceInsects[index].insectName = result.name;
        });
  
        // add temperatureRequests
        const temperatureRequests = this.livingPlaceInsects.map((livingPlaceInsect: LivingPlaceInsect) =>
          this.livingPlaceService.checkRequiredTemperature(livingPlaceInsect.livingPlaseId, livingPlaceInsect.insectId)
        );
  
        forkJoin(temperatureRequests).subscribe((temperatureResults: any[]) => {
          temperatureResults.forEach((result: any, index: number) => {
            this.livingPlaceInsects[index].requiredTemperatureResponse = result;
          });
  
          // add humidityRequests
          const humidityRequests = this.livingPlaceInsects.map((livingPlaceInsect: LivingPlaceInsect) =>
            this.livingPlaceService.checkRequiredHumidity(livingPlaceInsect.livingPlaseId, livingPlaceInsect.insectId)
          );
  
          forkJoin(humidityRequests).subscribe((humidityResults: any[]) => {
            humidityResults.forEach((result: any, index: number) => {
              this.livingPlaceInsects[index].requiredHumidityResponse = result;
            });
  
            // add foddersExistenceRequests
            const foddersExistenceRequests = this.livingPlaceInsects.map((livingPlaceInsect: LivingPlaceInsect) =>
              this.livingPlaceService.checkRequiredFoddersExistence(livingPlaceInsect.livingPlaseId, livingPlaceInsect.insectId)
            );
  
            forkJoin(foddersExistenceRequests).subscribe((foddersExistenceResults: any[]) => {
              foddersExistenceResults.forEach((result: any, index: number) => {
                this.livingPlaceInsects[index].requiredFoddersExistenceResponse = result;
  
                // add fodderName
                const fodderRequests = result.foddersNeededForInsect.map((insectFodder: InsectFodder) =>
                  this.fodderService.getFodder(insectFodder.fodderId)
                );
  
                forkJoin(fodderRequests).subscribe((fodderResults: any) => {
                  fodderResults.forEach((fodder: any, fodderIndex: number) => {
                    this.livingPlaceInsects[index].requiredFoddersExistenceResponse.foddersNeededForInsect[fodderIndex].fodderName = fodder.name;
                  });
                });
              });
            });
  
            // add timeOfResidenceRequests
            const timeOfResidenceRequests = this.livingPlaceInsects.map((livingPlaceInsect: LivingPlaceInsect) =>
              this.livingPlaceService.checkLivingTimeIsUp(livingPlaceInsect.livingPlaseId, livingPlaceInsect.insectId)
            );
  
            forkJoin(timeOfResidenceRequests).subscribe((timeOfResidenceResults: any[]) => {
              timeOfResidenceResults.forEach((result: any, index: number) => {
                this.livingPlaceInsects[index].timeOfResidenceResponse = result;
              });
  
              // Your code logic after all the requests have completed
            });
          });
        });
      });
    });
  }

  getLivingPlaceInsect(livingPlaceId: string, insectId: string) {
    this.livingPlaceService
      .getLivingPlaceInsect(livingPlaceId, insectId)
      .subscribe((result: LivingPlaceInsect) => (this.livingPlaceInsect = result));
  }

  //add LPI

  openAddLivingPlaceInsectPopup() {
    this.showAddLivingPlaceInsectPopup = true;
    this.getInsects();
    console.log(this.livingPlaceInsects);
  }

  closeAddLivingPlaceInsectPopup() {
    this.showAddLivingPlaceInsectPopup = false;
  }

  addLivingPlaceInsect() {
    this.newLivingPlaceInsect.livingPlaseId = this.livingPlaceId;
    this.livingPlaceService.addLivingPlaceInsect(this.newLivingPlaceInsect)
      .subscribe(  (response) => {
        console.log("Насекомое для места успешно добавлено:", response);
        this.getLivingPlaceInsects();
        window.location.reload();
      },
      (error) => {
        console.error("Ошибка при добавлении насекомого для места:", error);
      }
    );
  }

  getInsects() {
    this.insectService
    .getInsects()
    .subscribe((result: Insect[]) => {
      const filteredInsects = result.filter((insect: Insect) => {
        return !this.livingPlaceInsects.some((livingPlaceInsect: LivingPlaceInsect) => livingPlaceInsect.insectId === insect.id);
      });
      this.insects = filteredInsects;
    });
  }

  //edit LPI

  confirmLPIEdit(livingPlaceId: string, insectId: string) {
    this.getLivingPlaceInsect(livingPlaceId, insectId);
    console.log(this.livingPlaceInsect);
    this.confirmLPIEditModalVisible = true;
  }

  cancelLPIEdit() {
    this.confirmLPIEditModalVisible = false;
    window.location.reload();
  }

  editLivingPlaceInsect(livingPlaceId: string, insectId: string) {
    this.livingPlaceService.editLivingPlaceInsect(this.livingPlaceInsect)
      .subscribe(  (response) => {
        console.log("Насекомое места успешно изменен:", response);
        window.location.reload();
      },
      (error) => {
        console.error("Ошибка при изменении насекомого места:", error);
      }
    );
  }

  //delete LPI

  confirmLPIDelete(livingPlaceId: string, insectId: string) {
    this.getLivingPlaceInsect(livingPlaceId, insectId);
    this.confirmLPIDeleteModalVisible = true;
  }

  cancelLPIDelete() {
    this.confirmLPIDeleteModalVisible = false;
    window.location.reload();
  }

  deleteLivingPlaceInsect(livingPlaceId: string, insectId: string) {
    this.livingPlaceService.deleteLivingPlaceInsect(livingPlaceId, insectId)
    .subscribe(  (response) => {
      console.log("Насекомое места успешно удален:", response);
      window.location.reload();
    },
    (error) => {
      console.error("Ошибка при удалении насекомого места:", error);
    }
  );
    this.confirmLPIDeleteModalVisible = false;
    console.log('Насекомое места удален');
  }

  //warn
  openLPIWarningModal(livingPlaceInsect: LivingPlaceInsect) {
    this.livingPlaceInsect = livingPlaceInsect;
    this.confirmLPIWarnModalVisible = true;
  }

  canceLPIWarningModal() {
    this.confirmLPIWarnModalVisible = false;
  }

  openLPFWarningModal(livingPlaceFodder: LivingPlaceFodder) {
    this.livingPlaceFodder = livingPlaceFodder;
    this.confirmLPFWarnModalVisible = true;
  }

  canceLPFWarningModal() {
    this.confirmLPFWarnModalVisible = false;
  }

  openLPWarningModal(livingPlace: LivingPlace) {
    this.livingPlace = livingPlace;
    this.confirmLPWarnModalVisible = true;
  }

  canceLPWarningModal() {
    this.confirmLPWarnModalVisible = false;
  }
}
