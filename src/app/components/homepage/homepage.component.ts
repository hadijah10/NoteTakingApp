import { Component, signal } from '@angular/core';
import { INotes } from '../../../../public/interfaces/datainterface';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { EMPTY,catchError } from 'rxjs';
import { LoaderComponent } from '../loader/loader.component';
import { ErrorComponent } from '../error/error.component';
import { RouterLink } from '@angular/router';
import { DeletemodalComponent } from '../deletemodal/deletemodal.component';

@Component({
  selector: 'app-homepage',
  imports: [LoaderComponent,ErrorComponent,RouterLink,DeletemodalComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
searchTerm:string = ''
notelist!:INotes[]
isLoading = true;
errorMessage = ''
isError = signal(false)
affirmDelete = signal(false)

constructor(private apiservice: ApiserviceService){
  this.apiservice.getNotes().pipe(
       catchError(err => {
        this.isError.set(true)
        this.errorMessage = err.message;
        return EMPTY
      })
  ).subscribe({
    next:(data) => {
      this.isError.set(false)
      this.isLoading = false
      this.notelist = data
    },
    error:(error => {
      this.isLoading = false
      // this.errorMessage = error
    })
  })
}
handleSearch(event:Event){
  const target = event.target as HTMLInputElement
 console.log(target.value)
}

handleDelete(){
  this.affirmDelete.set(true)
}
showDeleteModal(show: boolean){
  this.affirmDelete.set(show)
}

}
