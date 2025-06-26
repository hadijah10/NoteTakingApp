import { Component, EventEmitter,Output,Input,inject} from '@angular/core';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-deletemodal',
  imports: [],
  templateUrl: './deletemodal.component.html',
  styleUrl: './deletemodal.component.scss'
})
export class DeletemodalComponent {
@Output() showModal= new EventEmitter<boolean>()
apiservice = inject(ApiserviceService)
@Input() id!:number

  closeModal(){
    this.showModal.emit(false)
  }
  confirmDelete(){
    this.apiservice.removeNote(this.id).subscribe({
      next:(data) => {

      },
      error:() => {},
      complete:() => {}
    })
    this.showModal.emit(true)
  }
}
