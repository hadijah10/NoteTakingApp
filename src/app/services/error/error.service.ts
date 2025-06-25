import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

    handleError(error:HttpErrorResponse):Observable<any>{
      let errormesssage =''
      switch (error.status){
        case 0:
          errormesssage = 'Network Error of CORS issues';
          break;
        case 400:
          errormesssage = 'Bad Request';
          break;
        case 401:
          errormesssage = 'Unauthorized';
          break;
        case 404:
          errormesssage = ('Not Found');
          break;
        case 500:
          errormesssage = ('Internal Server Error');
          break;
        case 503:
          errormesssage = ('Service Unavailabe');
          break;
        default:
          errormesssage = ('Unknown error');
      }
      return throwError(() => new Error(errormesssage))
    }

}
