import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  Role : any = " ";
  
  private isValidUsuario = /\S+@ecu\.gob.ec/;
  private suscription: Subscription = new Subscription();
  private destroy$ = new Subject<any>();

  signInForm = this.fb.group({
    usuario:['',[Validators.required,Validators.pattern(this.isValidUsuario)]],
    contrasena:['',[Validators.required,Validators.minLength(9)]]
  });
  constructor( private authSvc:AuthService, 
    private fb:FormBuilder, 
    private router:Router) {

   }

  ngOnInit(): void {      
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onSignIn():void{
    if(this.signInForm.invalid){
      return;
    }
    const formvalue = this.signInForm.value;
    this.suscription.add(
      this.authSvc.signIn(formvalue).subscribe(res=>{
      if(res){
        this.authSvc.isRole$.pipe(takeUntil(this.destroy$)).
        subscribe((res)=>(this.Role = res?.toString()));
        if(this.Role ==='VIDEOVIGILANCIA'){
          this.router.navigate(['/asistencia']);
        }else if(this.Role === 'ADMINISTRADOR'){
          this.router.navigate(['/home']);
        }else if (this.Role ==='OPERACIONES'){
          this.router.navigate(['/operaciones']);
        }
      }
    })
    );
  };

  getMessageError(campo:string){
    let message;
    if(this.signInForm.get(campo)?.hasError('required')){
      message = 'Campo requerido';
    }else if(this.signInForm.get(campo)?.hasError('pattern')){
      message = 'Ingrese un email válido';
    }else if(this.signInForm.get(campo)?.hasError('minlength')){
      message = 'Campo requerido';
    }
    return message;
  }

  isValidField(campo:string):boolean|undefined{
    let comprobar = this.signInForm.get(campo);
    return (comprobar?.touched || comprobar?.dirty) &&  !comprobar?.valid;
  }


}