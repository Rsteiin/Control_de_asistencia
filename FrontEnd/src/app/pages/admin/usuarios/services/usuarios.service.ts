import { Injectable } from '@angular/core';
//hooks
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
//intefaces
import { RespuestaUsuarios, Usuario } from '@app/shared/models/user.interface';
import { Response } from '@app/shared/models/responses.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  
  constructor(
    private http: HttpClient
  ) { }

  getAll(page: number){
    const headers = new HttpHeaders().set("x-access-token",`${JSON.parse(localStorage.getItem('user')||'{}').token}`);
    return this.http.post<RespuestaUsuarios>( `${environment.API_URL}/users/getUsers`, {page: page,limit:100},{'headers':headers})
    .pipe(
      map((res: RespuestaUsuarios | any ) => {
        return res;
      }),
      catchError((err)=>this.hadlerError(err))
      );
  };

  changeStatus(user:Usuario){
    const headers = new HttpHeaders().set("x-access-token",`${JSON.parse(localStorage.getItem('user')||'{}').token}`);
    return this.http.post<Response>(`${environment.API_URL}/users/changeStatus`,{usuario_id:user.usuario_id, estado: user.estado === 0 ? 1 : 0}, {'headers':headers})
    .pipe(
      map((res: RespuestaUsuarios | any ) => {
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
    return  throwError(err.status);
  };
}
