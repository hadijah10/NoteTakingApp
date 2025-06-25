import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable,catchError,from,map ,retry} from 'rxjs';
import { INotes } from '../../../public/interfaces/datainterface';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../public/interfaces/database.types';
import { ErrorService } from '../services/error/error.service';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  supabase = createClient<Database>(
    environment.superbaseURL!,
    environment.superbaseKey!
  )
  constructor(private errorservice: ErrorService) { }
  
  getTodos():Observable<INotes[]>{
    const promise =  this.supabase.from('Notes').select('*')
    return from(promise).pipe(
      map((response) => {
        return response.data ?? [];
      }),
      retry(2),
      catchError((error) => {
       return  this.errorservice.handleError(error)
      })
    );
  }

}
