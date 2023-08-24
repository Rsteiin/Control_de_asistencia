import { Injectable } from '@angular/core';
//hooks
import { HttpClient, } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
//intefaces
import { RespuestaUsuarios } from '@app/shared/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(page: number){
    return this.http.post<RespuestaUsuarios>( `${environment.API_URL}/users/getUsers`, {page: page,
    limit:10})
    .pipe(
      map((res: RespuestaUsuarios )=>{
        console.log(res)
        console.log('Respuesta del servidor', res);
        return res;
      }),
      catchError((err)=>this.hadlerError(err))
      );
  }

  getByID(){

  }

  new(){

  }
  update(){

  }
  delete(){

  }

  private hadlerError(err:any):Observable<never>{
    console.log(err)
    return  throwError(err.status);
  };
}
