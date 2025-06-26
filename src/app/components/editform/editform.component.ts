import { Component, OnInit ,signal,inject} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { catchError,EMPTY } from 'rxjs';
import { INotes } from '../../../../public/interfaces/datainterface';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editform',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './editform.component.html',
  styleUrl: './editform.component.scss'
})
export class EditformComponent implements OnInit{
  productId!:string;
  isError = signal(false)
  errorMessage:string=''
  isLoading = false
  note: INotes | null = null
  editNoteForm!: FormGroup;
  isSubmitted = false
  showEdit = signal(false)
  snackbar = inject(MatSnackBar)
  router = inject(Router)

  constructor(private route:ActivatedRoute,private apiservice: ApiserviceService){
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
        this.note = data.find(note => note.id == parseInt(this.productId)) || null
      },
      error:(error => {
        this.isLoading = false
        // this.errorMessage = error
      })
    })
  
     this.editNoteForm = new FormGroup({
      title: new FormControl('',[ Validators.required,Validators.minLength(3)]),
      content: new FormControl('',[Validators.required,Validators.minLength(3)]),
      tag: new FormControl('',[Validators.required,Validators.minLength(3)])
      });

  }

 


onSubmit() {
  this.isSubmitted = true

    if(this.editNoteForm.invalid) return;

    const input = this.editNoteForm.value;
    const formattedPost = {
      title: input.title,
      content: input.content,
      tags: input.tags
    }
    this.apiservice.updateNote(parseInt(this.productId),formattedPost).subscribe({
      next: (data) => {
        this.snackbar.open(`Update Successful ${data}`,'Dismiss',{
          duration: 2000,
          panelClass: ['snack-success']
        });
        this.router.navigate([''])
      },
      error:(error) => {
         this.snackbar.open(`Update Unsuccessful ${error}`,'Dismiss',{
          duration: 2000,
          panelClass: ['snack-error']
        });
      }
    })

    // const updatedNote = this.editNoteForm.value;
    // Call your updateNote service method here
    this.editNoteForm.reset()
    this.isSubmitted = false
}

  ngOnInit() {
    // Accessing route parameter
    this.route.params.subscribe((params) => {
      this.productId = params['id']; // 'id' matches the parameter name in the route config
    });
  }

  handleEdit(){
    this.showEdit.set(true)
  
  }

  closeModal(){
    this.editNoteForm.reset()
    this.showEdit.set(false)
  }


}
