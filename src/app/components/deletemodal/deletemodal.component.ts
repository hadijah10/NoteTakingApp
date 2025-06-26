import { Component, EventEmitter,Output ,inject} from '@angular/core';
import { ApiserviceService } from '../../services/api/apiservice.service';

@Component({
  selector: 'app-deletemodal',
  imports: [],
  templateUrl: './deletemodal.component.html',
  styleUrl: './deletemodal.component.scss'
})
export class DeletemodalComponent {
@Output() showModal= new EventEmitter<boolean>()
apiservice = inject(ApiserviceService)

  closeModal(){
    this.showModal.emit(false)
  }
  confirmDelete(){
    this.apiservice.removeTodo().subscribe({
      next:(data) => {},
      error:() => {},
      complete:() => {}
    })
    this.showModal.emit(true)
  }
}
