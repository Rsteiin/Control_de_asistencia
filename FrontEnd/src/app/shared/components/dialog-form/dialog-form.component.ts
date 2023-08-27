import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '@app/shared/models/user.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '@app/pages/admin/usuarios/services/usuarios.service';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {

  turnos: Option[] = [
    {value: 'MAÑANA', viewValue: 'MAÑANA'},
    {value: 'TARDE', viewValue: 'TARDE'},
    {value: 'VELADA', viewValue: 'VELADA'},
  ];

  grupos: Option[] = [
    {value: 'A', viewValue: 'A'},
    {value: 'B', viewValue: 'B'},
    {value: 'C', viewValue: 'C'},
  ];

  zonales: Option[] = [
    {value: '2', viewValue: 'QUITO - VIDEOVIGILANCIA'},
    {value: '3', viewValue: 'QUITO - DESPACHO'},
  ];

  hide = true;
  userForm;
  isLoading = false;
  //form for validations 
  private correoValido = /\S+@ecu\.gob.ec/;
  private soloLetras = /[A-ZA-zñÑ]+/;
  private suscription: Subscription = new Subscription();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialog : MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {user : Usuario | any, titulo : string, isEdit: boolean, isSave: boolean},
    private fb: FormBuilder,
    private usrSrv: UsuariosService,
    private _snackBar: MatSnackBar
  ) {     
    dialog.disableClose = true;
  }

  ngOnInit(): void {
    if(this.data.isEdit){
      this.userForm = this.fb.group({
        nombre:[this.data.user.nombre,[Validators.required,Validators.pattern(this.soloLetras), Validators.maxLength(20)]],
        segundo_nombre:[this.data.user.segundo_nombre],
        apellido:[this.data.user.apellido,[Validators.required,Validators.pattern(this.soloLetras), Validators.maxLength(20)]],
        segundo_apellido:[this.data.user.segundo_apellido],
        correo:[this.data.user.correo,[Validators.required,Validators.pattern(this.correoValido), Validators.maxLength(50)]],
        zonal:[this.data.user.zonal_id.toString(),[Validators.required]],
        turno:[this.data.user.turno,[Validators.required]],
        grupo:[this.data.user.grupo,[Validators.required, Validators.maxLength(1)]],
      });
    }else{
      this.userForm = this.fb.group({
        nombre:[this.data.user.nombre,[Validators.required,Validators.pattern(this.soloLetras), Validators.maxLength(20)]],
        segundo_nombre:[''],
        apellido:['',[Validators.required,Validators.pattern(this.soloLetras), Validators.maxLength(20)]],
        segundo_apellido:[''],
        correo:['',[Validators.required,Validators.pattern(this.correoValido), Validators.maxLength(50)]],
        contrasena:['',[Validators.required,Validators.minLength(9)]],
        zonal:[this.data.user.zonal,[Validators.required]],
        turno:['',[Validators.required]],
        grupo:['',[Validators.required, Validators.maxLength(1)]],
      });
    }
  }

  onClosed():void{
      this.suscription.unsubscribe();
      this.dialog.close();
  }

  onSave():void{
    this.isLoading = !this.isLoading; 
    let payload = this.userForm.value;

    payload.zonal_id = parseInt(payload["zonal"]);
    delete payload.zonal

    if(this.data.isEdit){
      payload["usuario_id"] = this.data.user.usuario_id;
    }

    this.suscription.add(
      this.usrSrv.saveUser(payload).subscribe((resUser) => {
        if(resUser){
          console.log(resUser);
          this.openSnackBar(resUser.message,"");
          this.isLoading = false;
          this.onClosed();
        }
      },
      err =>{      
        this.isLoading = false;
        if(err === 405){
          this.openSnackBar("El correo se encuentra registrado con otro usuario","");
        }
        if(err === 403){
          window.alert("Ha ocurrido un error al conectar con el servidor.");
        }
        if(err === 0){
          window.alert("Ha ocurrido un error al conectar con el servidor.");
        }
      }
      )
    )
}

  //functions for validations 
  getMessageError(campo: string){
    let message = "";
    if(this.userForm.get(campo)?.hasError('required')){
      message = 'Campo requerido';
    }else if(this.userForm.get(campo)?.hasError('pattern')){
      message = 'Ingrese un el formato correcto';
    }else if(this.userForm.get(campo)?.hasError('minlength')){
      message = 'Longitud mínima 9 caracteres';
    }
    return message;
  };

  isValidField(campo:string):boolean|undefined{
    let comprobar = this.userForm.get(campo);
    return (comprobar?.touched || comprobar?.dirty) &&  !comprobar?.valid;
  };
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:5000
    });
  }

}