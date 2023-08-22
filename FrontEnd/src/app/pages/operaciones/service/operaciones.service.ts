import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InasisteciaRspuesta } from '@app/shared/models/inasistencia.interface';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperacionesService {

  constructor(private http: HttpClient) { }

  getTablaInstitucion(institucion:string): Observable<InasisteciaRspuesta[]> {
    return this.http.get<InasisteciaRspuesta[]>(`${environment.API_URL}/api/obtener-inasistencia`)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error:any): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
