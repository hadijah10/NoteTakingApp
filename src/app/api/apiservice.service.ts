import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable,from,map } from 'rxjs';
import { INotes } from '../../../public/interfaces/datainterface';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../public/interfaces/database.types';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  supabase = createClient<Database>(
    environment.superbaseURL!,
    environment.superbaseKey!
  )
  constructor() { }
  
  getTodos():Observable<INotes[]>{
    const promise =  this.supabase.from('Notes').select('*')
    return from(promise).pipe(
      map((response) => {
        return response.data ?? [];
      })
    );
  }

}
