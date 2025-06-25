import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
searchTerm:string = ''

handleSearch(event:Event){
  const target = event.target as HTMLInputElement
 console.log(target.value)
}
}
