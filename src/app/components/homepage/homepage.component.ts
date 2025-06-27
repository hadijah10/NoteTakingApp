import { Component, signal,inject } from '@angular/core';
import { INotes } from '../../../../public/interfaces/datainterface';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { BehaviorSubject, EMPTY,catchError, debounceTime } from 'rxjs';
import { LoaderComponent } from '../loader/loader.component';
import { ErrorComponent } from '../error/error.component';
import { RouterLink } from '@angular/router';
import { DeletemodalComponent } from '../deletemodal/deletemodal.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-homepage',
  imports: [LoaderComponent,ErrorComponent,RouterLink,DeletemodalComponent,FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
searchTermObservable = new BehaviorSubject('')
searchTerm = signal<string>('')
notelist!:INotes[]
isLoading = true;
errorMessage = ''
isError = signal(false)
affirmDelete = signal(false)
id = signal(0)
isToggled = false;
snackbar = inject(MatSnackBar)
colors: string[] = ['#FE9B72', '#FEC971', '#FD9B73', '#B592FC', '#E4EF8F', '#00D1FA'];
filteredNotes:INotes[] = []
newFilteredNotes:INotes[] = []


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
      this.filteredNotes = data.map(note => note? {...note,background:this.getRandomColor()}:note)
    },
    error:(error => {
      this.isLoading = false
      this.isError.set(true)
    })
  })

  this.searchTermObservable.pipe(debounceTime(1000)).subscribe(
    {
      next:(data) => {
        this.newFilteredNotes = this.filteredNotes.filter((note) => {
          if(note.title.toLowerCase().includes(data.toLowerCase()))
             return  note
          return
          })
      },
      error:() => {},
      complete:() => {}
    }
  )


}

handleSearch(event:Event){
  const target = event.target as HTMLInputElement
 console.log(target.value)
 this.searchTermObservable.next(target.value)

}

handleDelete(id:number){
  this.affirmDelete.set(true)
  this.id.set(id)
}
showDeleteModal(show: boolean){
  this.affirmDelete.set(show)
}

notifyDelete(completedelete:boolean){
  if (completedelete == true){
    this.filteredNotes = this.filteredNotes.filter(data => data.id!= this.id())
  }
}

handleToggle(event:Event, note:INotes){
  
  const updatedNote = {...note, isArchived: !note.isArchived}
  delete updatedNote.background
  const checkbox = event.target as HTMLInputElement;
  
  // Revert checkbox immediately (until success)
  checkbox.checked = note.isArchived;
  
  this.apiservice.updateNote(note.id,updatedNote).subscribe({
    next:(data)=> {
      note.isArchived = updatedNote.isArchived;
        this.snackbar.open('Archive State Updated','Close',{
          duration:2000,
           panelClass:['snackbar-success']
         });
    },
    error:(error) => {
         if(error == 0){
          this.snackbar.open('Archive Failed. Check your network','Dismiss',{
          duration:2000,
           panelClass:['snackbar-error']
         });
         }
         else{
          this.snackbar.open('Archive Update Failed','Dismiss',{
          duration:2000,
           panelClass:['snackbar-error']
         });
         }
        
    }
  })
}

getRandomColor():string{
  return this.colors[Math.floor(Math.random() * this.colors.length)]
}

getTags(){
  const tags = this.notelist.map(note =>  note.tags)
  console.log(tags)
}

}
