import { Component } from '@angular/core';
import { INotes } from '../../../../public/interfaces/datainterface';
import { ApiserviceService } from '../../api/apiservice.service';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
searchTerm:string = ''
notelist!:INotes[]
isLoading = true;
errorMessage = ''

constructor(private apiservice: ApiserviceService){
  this.apiservice.getTodos().subscribe({
    next:(data) => {
      this.isLoading = false
      this.notelist = data
    },
    error:(error => {
      this.isLoading = false
      this.errorMessage = error
    })
  })
}
handleSearch(event:Event){
  const target = event.target as HTMLInputElement
 console.log(target.value)
}



}
