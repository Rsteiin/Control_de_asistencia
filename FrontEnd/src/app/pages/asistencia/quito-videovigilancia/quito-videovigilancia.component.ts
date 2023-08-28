import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AsistenciaService } from '../services/asistencia.service';
import { Consolas } from '@app/shared/models/consola.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quito-videovigilancia',
  templateUrl: './quito-videovigilancia.component.html',
  styleUrls: ['./quito-videovigilancia.component.scss']
})
export class QuitoVideovigilanciaComponent implements OnInit, OnDestroy {

  nombre_completo = "";
  consolas = [];
  consolasSelected = []; 
  isLoading = false;

  private suscription: Subscription = new Subscription();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  constructor(
    private AsisSrv: AsistenciaService,
    private dialog : MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.suscription.add(
      this.AsisSrv.getConsolas(2).subscribe((res)=>{
        console.log(res)
        this.consolas = res.consolas;
      },err => {
        if(err === 0){
          window.alert("Ha ocurrido un error al conectar con el servidor.");
        }
      })
    )
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    let nombre = user.nombre.charAt(0).toUpperCase() + user.nombre.toLowerCase().slice(1);
    let apellido = user.apellido.charAt(0).toUpperCase() + user.apellido.toLowerCase().slice(1)
    this.nombre_completo = nombre + " " + apellido
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  onClick(consola: Consolas):void {
    let index = this.consolasSelected.indexOf(consola);
    if(index > -1){
      this.consolasSelected.splice(index, 1);
    }else{
      this.consolasSelected.push(consola);
    }
  }

  onSearch(search_consola_id:number): string{
    const result = this.consolasSelected.find(({ consola_id }) => consola_id === search_consola_id);
    if(result){
      return "consola-style-selected"
    }else{
      return "consola-style"
    }
  }

  onSaveConsolas():void{
    console.log(this.consolasSelected)
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      width:'350px',
      data: {
        message: `¿Está seguro de guardar ${this.consolasSelected.length === 1 ? `el elemento seleccionado?`: `los  ${this.consolasSelected.length} elementos seleccionados?`}`,
        okButton: "Guardar",
        cancelButton: "Cancelar",
        type:"asistencia",
      }
    })
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.isLoading = true;
        let user = JSON.parse(localStorage.getItem("user")||"{}");
        const payload ={
          consolas: this.consolasSelected,
          usuario_id: user.usuario_id,
          turno: user.turno
        }
        this.suscription.add(
          this.AsisSrv.guardarInasistencias(payload).subscribe((res)=>{
            if(res){
              this.openSnackBar(res.message,"");
              this.consolasSelected = []
            }
          },err=>{
            this.isLoading = false;
            if(err === 405){
              this.openSnackBar("El correo se encuentra registrado con otro usuario","");
            }
            if(err === 401){
              window.alert("Ha ocurrido un error al conectar con el servidor.");
            }
            if(err === 0){
              window.alert("Ha ocurrido un error al conectar con el servidor.");
            }
          })
        )
        this.isLoading = false;
      }
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:7000
    });
  }

}
