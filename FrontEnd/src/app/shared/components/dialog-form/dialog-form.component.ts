import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '@app/shared/models/user.interface';
import { FormBuilder, Validators } from '@angular/forms';

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

  turnoSelected = "";
  groupSelected = "";
  hide = true;
  
  //form for validations 
  private correoValido = /\S+@ecu\.gob.ec/;
  private soloLetras = /[A-ZA-zñÑ]+/;
  //fb = new FormBuilder()

   userForm = this.fb.group({
    nombre:['',[Validators.required,Validators.pattern(this.soloLetras), Validators.maxLength(20)]],
    segundo_nombre:[''],
    apellido:['',[Validators.required,Validators.pattern(this.soloLetras), Validators.maxLength(20)]],
    segundo_apellido:[''],
    correo:['',[Validators.required,Validators.pattern(this.correoValido), Validators.maxLength(50)]],
    contrasena:['',[Validators.required,Validators.minLength(9)]],
    turno:['',[Validators.required]],
    grupo:['',[Validators.required, Validators.maxLength(1)]],
  });
  
  constructor(
    public dialog : MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {user : Usuario | any, titulo : string},
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onClosed():void{
    this.dialog.close();
  }

  //functions for validations 
  getMessageError(campo: string){
    let message = "";
    if(this.userForm.get(campo)?.hasError('required')){
      message = 'Campo requerido';
    }else if(this.userForm.get(campo)?.hasError('pattern')){
      message = 'Ingrese un el formato correcto';
    }else if(this.userForm.get(campo)?.hasError('minlength')){
      message = 'Campo requerido';
    }
    return message;
  };

  isValidField(campo:string):boolean|undefined{
    let comprobar = this.userForm.get(campo);
    return (comprobar?.touched || comprobar?.dirty) &&  !comprobar?.valid;
  };
}
