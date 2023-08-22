import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RespuestaConsola } from '@app/shared/models/consola.interface';
import { ConfirmDialogComponent } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { AsistenciaService } from '../services/asistencia.service';
import { OkDialogComponent } from '@app/shared/components/ok-dialog/ok-dialog.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-quito-despacho',
  templateUrl: './quito-despacho.component.html',
  styleUrls: ['./quito-despacho.component.scss']
})
export class QuitoDespachoComponent implements OnInit,OnDestroy {
  selectedOptions: string[] = [];
  private destroy$ = new Subject<any>();
  consolas: RespuestaConsola[]= [];
  constructor(
    public dialog:MatDialog,
    private inasistenciaSVC:AsistenciaService
  ) { }

  ngOnInit(): void {
    this.inasistenciaSVC.obtenerConsolas("Quito-Despacho").pipe(takeUntil(this.destroy$)).
    subscribe(res=>{
      console.log(res);
      this.consolas=res;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onNgModelChange(event:any){   
  }

  onGuardarInasistencia(){
    this.inasistenciaSVC.guardarInasistencia(this.selectedOptions).pipe(takeUntil(this.destroy$))
    .subscribe(res=>{
      if(res){
        this.selectedOptions = [];
        const dialogRef = this.dialog.open(OkDialogComponent,{
          width:'350px',
          data: '!Se ha guardado de manera correcta la lista de inasistencia a consolas¡'
        })
      }
    })
  }

  openDialog():void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      width:'350px',
      data: '¿Está seguro de guardar la asistencia?'
    })
    dialogRef.afterClosed().subscribe(res=>{
      console.log(res);
      console.log(this.selectedOptions)
      if(res){
        this.onGuardarInasistencia();
      }
    })
  }

}
