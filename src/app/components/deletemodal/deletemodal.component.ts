import { Component, EventEmitter,Output,Input,inject} from '@angular/core';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deletemodal',
  imports: [],
  templateUrl: './deletemodal.component.html',
  styleUrl: './deletemodal.component.scss'
})
export class DeletemodalComponent {
@Output() showModal= new EventEmitter<boolean>()
@Output() deleted= new EventEmitter<boolean>()
apiservice = inject(ApiserviceService)
@Input() id!:number
snackbar = inject(MatSnackBar)
route = inject(Router)

  closeModal(){
    this.showModal.emit(false)
  }
  confirmDelete(){
    this.showModal.emit(true)
    this.apiservice.removeNote(this.id).subscribe({
      next:(data) => {
        this.snackbar.open('Deletion Successfull','Dismis',{
          duration:2000,
          panelClass: ['snackbar-success']
        });
        this.deleted.emit(true)
        this.showModal.emit(false)
      },
      error:(error) => {
        this.snackbar.open('Deletion Unsuccessful','Dismiss',{
          duration:2000,
          panelClass: ['snackbar-error']
        })
         this.deleted.emit(false)
      },
      complete:() => {}
    })
    
  }
}
