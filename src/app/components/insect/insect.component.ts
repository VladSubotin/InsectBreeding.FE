import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Fodder } from 'src/app/models/fodder';
import { Insect } from 'src/app/models/insect';
import { FodderService } from 'src/app/services/fodder.service';
import { InsectService } from 'src/app/services/insect.service';
import { InsectFodder } from 'src/app/models/insectFodder';

@Component({
  selector: 'app-insect',
  templateUrl: './insect.component.html',
  styleUrls: ['./insect.component.css']
})
export class InsectComponent {
  insectId: string = "";
  insect: Insect = new Insect();
  confirmDeleteModalVisible = false;
  confirmEditModalVisible = false;

  insectFodders : InsectFodder[] = [];
  insectFodder: InsectFodder = new InsectFodder();
  newInsectFodder: InsectFodder = new InsectFodder();
  fodders: Fodder[] = [];
  showAddInsectFodderPopup: boolean = false;
  confirmIFDeleteModalVisible = false;
  confirmIFEditModalVisible = false;
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private insectService: InsectService, private route: ActivatedRoute,
    private router: Router, private fodderService: FodderService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.insectId = id;
    } 
    this.getInsect();
    this.getInsectFodders();
  }

  getInsect() {
    this.insectService
      .getInsect(this.insectId)
      .subscribe((result: Insect) => (this.insect = result));
  }

  confirmEdit() {
    this.confirmEditModalVisible = true;
  }

  cancelEdit() {
    this.confirmEditModalVisible = false;
    window.location.reload();
  }

  editInsect() {
    this.insectService.editInsect(this.insect)
      .subscribe(  (response) => {
        console.log("Насекомое успешно изменено:", response);
        window.location.reload();
      },
      (error) => {
        console.error("Ошибка при изменении насекомого:", error);
      }
    );
  }

  confirmDelete() {
    this.confirmDeleteModalVisible = true;
  }

  cancelDelete() {
    this.confirmDeleteModalVisible = false;
  }

  deleteInsect() {
    this.insectService.deleteInsect(this.insect.id)
    .subscribe(  (response) => {
      console.log("Насекомое успешно удалено:", response);
      this.router.navigate(['/insects']);
    },
    (error) => {
      console.error("Ошибка при удалении насекомого:", error);
    }
  );
    this.confirmDeleteModalVisible = false;
    console.log('Насекомое удалено');
  }


  //InsectFodder


  getInsectFodders() {
    this.insectService.getInsectFodders(this.insectId).subscribe((result: InsectFodder[]) => {
      this.insectFodders = result;
    
      const requests = this.insectFodders.map((insectFodder: InsectFodder) =>
        this.fodderService.getFodder(insectFodder.fodderId)
      );
    
      forkJoin(requests).subscribe((fodderResults: Fodder[]) => {
        fodderResults.forEach((result: Fodder, index: number) => {
          this.insectFodders[index].fodderName = result.name;
        });
      });
    });
  }

  getInsectFodder(insectId: string, fodderId: string) {
    this.insectService
      .getInsectFodder(insectId, fodderId)
      .subscribe((result: InsectFodder) => (this.insectFodder = result));
  }

  //add IF

  openAddInsectFodderPopup() {
    this.showAddInsectFodderPopup = true;
    this.getFodders();
  }

  closeAddInsectFodderPopup() {
    this.showAddInsectFodderPopup = false;
  }

  addInsectFodder() {
    this.newInsectFodder.insectId = this.insectId;
    this.insectService.addInsectFodder(this.newInsectFodder)
      .subscribe(  (response) => {
        console.log("Корм для насекомого успешно добавлен:", response);
        this.getInsectFodders();
        window.location.reload();
      },
      (error) => {
        console.error("Ошибка при добавлении корма для насекомого:", error);
      }
    );
  }

  getFodders() {
    this.fodderService
    .getFodders()
    .subscribe((result: Fodder[]) => {
      const filteredFodders = result.filter((fodder: Fodder) => {
        return !this.insectFodders.some((insectFodder: InsectFodder) => insectFodder.fodderId === fodder.id);
      });
      this.fodders = filteredFodders;
    });
  }

  //edit IF

  confirmIFEdit(insectId: string, fodderId: string) {
    this.getInsectFodder(insectId, fodderId);
    this.confirmIFEditModalVisible = true;
  }

  cancelIFEdit() {
    this.confirmIFEditModalVisible = false;
    window.location.reload();
  }

  editInsectFodder(insectId: string, fodderId: string) {
    this.insectService.editInsectFodder(this.insectFodder)
      .subscribe(  (response) => {
        console.log("Корм насекомого успешно изменен:", response);
        window.location.reload();
      },
      (error) => {
        console.error("Ошибка при изменении корма насекомого:", error);
      }
    );
  }

  //delete IF

  confirmIFDelete(insectId: string, fodderId: string) {
    this.getInsectFodder(insectId, fodderId);
    this.confirmIFDeleteModalVisible = true;
  }

  cancelIFDelete() {
    this.confirmIFDeleteModalVisible = false;
  }

  deleteInsectFodder(insectId: string, fodderId: string) {
    this.insectService.deleteInsectFodder(insectId, fodderId)
    .subscribe(  (response) => {
      console.log("Корм насекомого успешно удален:", response);
      window.location.reload();
    },
    (error) => {
      console.error("Ошибка при удалении корма насекомого:", error);
    }
  );
    this.confirmIFDeleteModalVisible = false;
    console.log('Корм насекомого удален');
  }
}
