import { Component, inject } from '@angular/core';
import { FormsModule,FormBuilder,Validators,FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createnote',
  imports: [ReactiveFormsModule],
  templateUrl: './createnote.component.html',
  styleUrl: './createnote.component.scss'
})
export class CreatenoteComponent {
 
 postForm!: FormGroup;
  submitted = false;
  apiservice=inject(ApiserviceService)
  snackbar = inject(MatSnackBar)
  route= inject(Router)
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl('',[Validators.required,Validators.minLength(3)]),
      content: new FormControl('',[Validators.required,Validators.minLength(3)]),
      tags: new FormControl('',[Validators.required,Validators.minLength(3)])
    });
  }

  submitPost(): void {
    this.submitted = true
    if (this.postForm.invalid) return;

    const raw = this.postForm.value;
    const formattedPost = {
      title: raw.title.trim(),
      content: raw.content.trim(),
      tags: raw.tags.trim(),
      // tags: raw.tags ? raw.tags.split(',').map((tag: string) => tag.trim()) : [],
      isArchived: false
    };
    this.apiservice.addNote(formattedPost).subscribe({
      next:(data) => {
        this.snackbar.open('Note added Successfully','Dismiss',{
          duration:2000,
           panelClass:['snackbar-success']
         });
        
         this.route.navigate([''])
      },
      error:(error) => {
        this.snackbar.open('Note addition Unsuccessful','Dismiss',{
          duration:2000,
           panelClass:['snackbar-error']
         })
      }
    })
    this.postForm.reset();
    this.submitted = false
  }
}
