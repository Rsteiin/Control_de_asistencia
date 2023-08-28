import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaConsola } from '@app/shared/models/consola.interface';
import { InasistenciaPayload } from '@app/shared/models/inasistencia.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private headers = new HttpHeaders().set("x-access-token",`${JSON.parse(localStorage.getItem('user')||'{}').token}`);
  constructor(private http:HttpClient) { }

  getConsolas(zonal_id:number){
    return this.http.post<any>( `${environment.API_URL}/consolas/getConsolas`, {zonal_id:zonal_id},{'headers':this.headers})
    .pipe(map((res: any ) => {
      return res;
    }),
    catchError((err)=>this.hadlerError(err))
    );
  }

  guardarInasistencias(payload: InasistenciaPayload){
    return this.http.post<any>( `${environment.API_URL}/inasistencias/guardarInasistencias`, {consolas: payload.consolas, usuario_id: payload.usuario_id, turno: payload.turno},{'headers':this.headers})
    .pipe(map((res: any ) => {
      return res;
    }),
    catchError((err)=>this.hadlerError(err))
    );
  }

  private hadlerError(err:any):Observable<never>{
    return  throwError(err.status);
  };

}
