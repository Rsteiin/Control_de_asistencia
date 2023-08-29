import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
//interfaces
import { InasisteciaPorConsola } from '@app/shared/models/inasistencia.interface';

@Injectable({
  providedIn: 'root'
})
export class TablaInasistenciaService {
  private headers = new HttpHeaders().set("x-access-token",`${JSON.parse(localStorage.getItem('user')||'{}').token}`);
  constructor(
    private http: HttpClient
  ) { }

  getInasistenciasPorInstitucion (institucion: any): Observable<any> {
    return this.http.post<Array<InasisteciaPorConsola>>( `${environment.API_URL}/inasistencias/getInasistenciasPorInstitucion`, {institucion:institucion},{'headers':this.headers})
    .pipe(
      map((res: InasisteciaPorConsola | any ) => {
        return res;
      }),
      catchError((err)=>this.hadlerError(err))
      );
  }

  private hadlerError(err:any):Observable<never>{
    return  throwError(err.status);
  };
}
