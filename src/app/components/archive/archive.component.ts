import { Component } from '@angular/core';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { INotes } from '../../../../public/interfaces/datainterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-archive',
  imports: [],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss'
})
export class ArchiveComponent {
  archivedNotes:INotes[] = [] 
    colors: string[] = ['#FE9B72', '#FEC971', '#FD9B73', '#B592FC', '#E4EF8F', '#00D1FA'];

    constructor(private apiservice: ApiserviceService){
      this.apiservice.getNotes().subscribe({
        next:(data) => {
          this.archivedNotes = data.filter(note => note.isArchived == true);
        },
        error:(error) => {},
        complete:()=> {}
      })

    }
    
      getRandomColor(): string {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

}
