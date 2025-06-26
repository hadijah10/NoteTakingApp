import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable,catchError,from,map ,retry,defer,throwError} from 'rxjs';
import { INotes } from '../../../../public/interfaces/datainterface';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../../public/interfaces/database.types';
import { ErrorService } from '../error/error.service';
import { T } from '@angular/cdk/keycodes';


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

  getNoteById(id: number): Observable<INotes | null> {
  const promise = this.supabase.from('Notes').select('*').eq('id', id).limit(1)
    .single();

  return from(promise).pipe(
    map(response => {
      if (response.error) {
        throw response.error;
      }
      return response.data;
    }),
    catchError(err => {
      // handle or rethrow error
      return throwError(() => err);
    })
  );


  }

  addNote(data:Pick<INotes, "title"| "content" |"tags" | "isArchived">):Observable<INotes>{
      const promise = this.supabase.from('Notes').insert(data).select('*').single();
      return from(promise)
    .pipe(
      map((result) => {
        if (result.error) throw result.error;
      return result.data as INotes;
      }),
      retry(2),
    )
  }

  removeTodo(id:number): Observable<number>{
    const promise = this.supabase.from('Notes').delete().eq('id',id);
    return from(promise).pipe(map((response) => {
      if(response.status >=400 && response.status<=500) throw response.status
      return response.status
    }))
  }

  updateNote(id:number,data:Pick<INotes, "title"| "content" |"tags">):Observable<number>{
    const promise = this.supabase.from('Notes').update(data).eq('id', id);
    return from(promise).pipe(map((response) => {
      if(response.status >=400 && response.status<=500) throw response.status
      return response.status
    }))
  }

}
