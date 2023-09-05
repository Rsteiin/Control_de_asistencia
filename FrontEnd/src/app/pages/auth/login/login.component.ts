import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { Area, Zonal } from '@app/shared/models/user.interface';
//service
import { AuthService } from '../services/auth.service';
import { InstitucionesService } from '@app/shared/services/instituciones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  //variables para validación
  hide = true;
  Role : any = " ";
  Zonal : Zonal;
  Area : Area;
  isLoading = false ; 
  colorLoading: ThemePalette = "primary";
  isError = false;

  //private isValidUsuario = /\S+@ecu\.gob.ec/;
  private isValidUsuario = /\S/;
  private suscription: Subscription = new Subscription();
  private destroy$ = new Subject<any>();

  signInForm = this.fb.group({
    usuario:['',[Validators.required,Validators.pattern(this.isValidUsuario)]],
    contrasena:['',[Validators.required,Validators.minLength(1)]]
  });

  constructor( 
    private authSvc:AuthService, 
    private instSvc :InstitucionesService,
    private fb:FormBuilder, 
    private router:Router) {
   };

  ngOnInit(): void {      
  };

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    this.destroy$.next({});
    this.destroy$.complete();
  };

  onSignIn():void{
   if(this.signInForm.invalid){
      return;
    }
    const formvalue = this.signInForm.value;
    this.isLoading = true;
    this.isError = false;

    this.suscription.add(

      this.authSvc.signIn(formvalue).subscribe(res=>{
      if(res){
        
        this.authSvc.isRole$.pipe(takeUntil(this.destroy$)).
        subscribe((res)=>(
          console.log(res),
          this.Role = res
        ));

        this.authSvc.isZonal$.pipe(takeUntil(this.destroy$)).
        subscribe((res)=>(
          console.log(res),
          this.Zonal = res
        ));

        this.authSvc.area$.pipe(takeUntil(this.destroy$)).
        subscribe((res)=>(
          console.log(res),
          this.Area = res
        ));

        if(this.Role === "ADMINISTRADOR"){
          this.instSvc.getInstituciones().subscribe(res=>{
            this.router.navigate(['/administrador'])
          })
        }

        if(this.Role === "AGENTE"){
          if(this.Zonal === "QUITO"){
            if(this.Area === "VIDEOVIGILANCIA"){
              this.router.navigate(['/asistencia/quito-videovigilancia'])
            }else{
              this.router.navigate(['/asistencia/quito-despacho'])
            }
          }
        }
        return;
      }
    }, 
    err =>
     {
      this.isLoading = false;
      if(err === 403){
        this.isError = true;
      }
      if(err === 0){
        window.alert("Ha ocurrido un error al conectar con el servidor.");
      }
     })
    );
  };

  getMessageError(campo: string){
    let message = "";
    if(this.signInForm.get(campo)?.hasError('required')){
      message = 'Campo requerido';
    }else if(this.signInForm.get(campo)?.hasError('pattern')){
      message = 'Ingrese un mail institucional válido';
    }else if(this.signInForm.get(campo)?.hasError('minlength')){
      message = 'Campo requerido';
    }
    return message;
  };

  isValidField(campo:string):boolean|undefined{
    let comprobar = this.signInForm.get(campo);
    return (comprobar?.touched || comprobar?.dirty) &&  !comprobar?.valid;
  };

};
