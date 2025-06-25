import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { INotes } from '../../../public/interfaces/datainterface';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  supabase = createClient(
    environment.superbaseURL!,
    environment.superbaseKey!
  )
  constructor() { }
  
  getTodos():Observable<any[]>{
    return this.supabase.from('Notes').select('*');
  }

}
