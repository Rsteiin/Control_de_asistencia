import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Observable, take, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(private authSvc:AuthService){

  }
  canActivate(): Observable<boolean>{
    return this.authSvc.isLogged.pipe(
      take(1),map((isLogged:boolean) => !isLogged)
    );
  }
  
}
