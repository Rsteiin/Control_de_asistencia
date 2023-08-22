import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaConsola } from '@app/shared/models/consola.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private http:HttpClient) { }

  guardarInasistencia(cadenaConsolas:string[]):Observable<string>{
    return this.http.post( `${environment.API_URL}/api/inasistencia/prueba2`,cadenaConsolas).pipe(
      map((res:any)=>{
        return res;
      }),catchError((err)=>this.hadlerError(err))
    );
  }

  obtenerConsolas(zonal:string):Observable<RespuestaConsola[]>{
    return this.http.post( `${environment.API_URL}/api/consola/obtener-consolas`,{zonal:zonal}).pipe(
      map((res:any)=>{
        return res;
      }),catchError((err)=>this.hadlerError(err))
    );
  }

  private hadlerError(err:any):Observable<never>{
    let mesajeError = 'Eorr Ocurrido';
    if(err){
      mesajeError= `Error: code ${err.mensaje}`;
    } 
    window.alert(mesajeError);
    return  throwError(mesajeError);

  }




}
