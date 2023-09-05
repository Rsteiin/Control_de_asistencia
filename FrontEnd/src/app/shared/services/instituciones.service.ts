import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Institucion } from '../models/institucion.interface';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {
  
  private instituciones = new BehaviorSubject<Array<Institucion>>(null);

  private headers = new HttpHeaders().set("x-access-token",`${JSON.parse(localStorage.getItem('user')||'{}').token}`);
 
  constructor(
    private http: HttpClient
  ) {

  }

  get Instituciones():Observable<Array<Institucion>>{
    return this.instituciones.asObservable();
  } 

  getInstituciones(){
    return this.http.post<Array<Institucion>>( `${environment.API_URL}/institucion/getInstituciones`, {},{'headers':this.headers})
    .pipe(
      map((res: Array<Institucion>|any ) => {
        this.instituciones.next(res.instituciones);
        return res;
      }),
      catchError((err)=>this.hadlerError(err))
      );
  };

  private hadlerError(err:any):Observable<never>{
    return  throwError(err.status);
  };
}
