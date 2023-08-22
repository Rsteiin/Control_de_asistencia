import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RespuestaUsuario,Usuario,Roles,Zonal } from '@app/shared/models/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UtilsService } from '@app/shared/services/utils.service';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<Roles>(null);
  private zonal = new BehaviorSubject<Zonal>(null);

  constructor(private http:HttpClient, private router: Router, private utilsSvc:UtilsService ) {
    this.checkToken();
   }

   get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  } 

  get isRole$():Observable<Roles>{
    return this.role.asObservable();
  }

  get isZonal$():Observable<Zonal>{
    return this.zonal.asObservable();
  }

  signIn(authData:Usuario):Observable<RespuestaUsuario | void>{
    return this.http.post<RespuestaUsuario>( `${environment.API_URL}/api/auth/signin`,authData)
    .pipe(
      map((res: RespuestaUsuario)=>{
        console.log('Respuesta del servidor', res)
        this.saveLocalStorage(res);
        this.loggedIn.next(true);
        this.role.next(res.rol);
        this.zonal.next(res.zonal)
        return res;
      }),
      catchError((err)=>this.hadlerError(err))
      );
  }

  signOut():void{
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    this.utilsSvc.openSidebar(false);
  }

  private saveLocalStorage(user:RespuestaUsuario):void{
    const {id,usuario, ...rest} = user;
    localStorage.setItem('user',JSON.stringify(rest));

  }

  private checkToken():void{
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');

    if(usuario){
      const isExpired = helper.isTokenExpired(usuario.accessToken);
      if(isExpired){
        this.signOut();
        this.router.navigate(['/login']);
      }else{
        this.loggedIn.next(true);
        this.role.next(usuario.rol);
      }
    }
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
