import { Component } from '@angular/core';
import { FormsModule,FormBuilder,Validators,FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-createnote',
  imports: [ReactiveFormsModule],
  templateUrl: './createnote.component.html',
  styleUrl: './createnote.component.scss'
})
export class CreatenoteComponent {
 
 postForm!: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z0-9]+$')]),
      content: new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z0-9]+$')]),
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
      tags: raw.tags ? raw.tags.split(',').map((tag: string) => tag.trim()) : [],
      isArchived: false
    };

    console.log('Submitted Post:', formattedPost);
    // Optionally reset form
    this.postForm.reset();
    this.submitted = false
  }
}
