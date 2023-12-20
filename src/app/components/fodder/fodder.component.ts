import { Component } from '@angular/core';
import { Fodder } from 'src/app/models/fodder';
import { ActivatedRoute, Router } from '@angular/router';
import { FodderService } from 'src/app/services/fodder.service';

@Component({
  selector: 'app-fodder',
  templateUrl: './fodder.component.html',
  styleUrls: ['./fodder.component.css']
})
export class FodderComponent {
  fodderId: string = "";
  fodder: Fodder = new Fodder();
  confirmDeleteModalVisible = false;
  confirmEditModalVisible = false;

  constructor(private fodderService: FodderService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.fodderId = id;
    } 
    this.getFodder();
  }

  getFodder() {
    this.fodderService
      .getFodder(this.fodderId)
      .subscribe((result: Fodder) => (this.fodder = result));
  }

  confirmEdit() {
    this.confirmEditModalVisible = true;
  }

  cancelEdit() {
    this.confirmEditModalVisible = false;
    window.location.reload();
  }

  editFodder() {
    this.fodderService.editFodders(this.fodder)
      .subscribe(  (response) => {
        console.log("Корм успешно изменен:", response);
        window.location.reload();
      },
      (error) => {
        console.error("Ошибка при изменении корма:", error);
      }
    );
  }

  confirmDelete() {
    this.confirmDeleteModalVisible = true;
  }

  cancelDelete() {
    this.confirmDeleteModalVisible = false;
  }

  deleteFodder() {
    this.fodderService.deleteFodder(this.fodder.id)
    .subscribe(  (response) => {
      console.log("Корм успешно удален:", response);
      this.router.navigate(['/fodders']);
    },
    (error) => {
      console.error("Ошибка при удалении корма:", error);
    }
  );
    this.confirmDeleteModalVisible = false;
    console.log('Корм удален');
  }
}
