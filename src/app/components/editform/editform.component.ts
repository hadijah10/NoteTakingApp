import { Component, OnInit ,signal} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { catchError,EMPTY } from 'rxjs';
import { INotes } from '../../../../public/interfaces/datainterface';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';

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
  if (this.editNoteForm.valid) {
  
    const updatedNote = this.editNoteForm.value;
    // Call your updateNote service method here
    this.editNoteForm.reset()
    this.isSubmitted = false
  }
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
    this.showEdit.set(false)
  }

}
