import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable,catchError,from,map ,retry} from 'rxjs';
import { INotes } from '../../../../public/interfaces/datainterface';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../../public/interfaces/database.types';
import { ErrorService } from '../error/error.service';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  supabase = createClient<Database>(
    environment.superbaseURL!,
    environment.superbaseKey!
  )
  constructor(private errorservice: ErrorService) { }
  
  getNotes():Observable<INotes[]>{
    const promise =  this.supabase.from('Notes').select('*')
    return from(promise).pipe(
      map((response) => {
         if (response.error) {
          // Throw error to be caught by catchError below
          throw response.error;
        }
        return response.data ?? [];
      }),
      retry(2),
      catchError((error) => {
       return  this.errorservice.handleError(error)
      })
    );
  }
  addNote(data:Pick<INotes, "title"| "content" |"tags" | "isArchived">):Observable<INotes>{
    const promise = this.supabase.from('Notes').insert(data).select('*').single();
    return from(promise).pipe(
      map((result) => result.data!),
      retry(2),
      catchError((error) => {
        return  this.errorservice.handleError(error)
      })
    )
  }

}
