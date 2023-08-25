import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//services 
import { UsuariosService } from './services/usuarios.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ConfirmDialogComponent } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
//model
import { Usuario } from '@app/shared/models/user.interface';
//messages
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['nombre','apellido', 'rol', 'zonal', 'area','turno', 'grupo', 'estado', 'opciones'];
  dataSource =  new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private suscription: Subscription = new Subscription();

  constructor(
    private userSrv: UsuariosService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) {

  }

  ngOnInit(): void {
    this.suscription.add(
      this.userSrv.getAll(1).subscribe(res=>{
        this.dataSource.data = res.usuarios
    }, 
    err =>
     {
      if(err === 403){
        window.alert("Ha ocurrido un error al conectar con el servidor.");        
      }
      if(err === 0){
        window.alert("Ha ocurrido un error al conectar con el servidor.");
      }
     })
    );
  }

  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(user: Usuario):void{
    let newMessage = "";
    let newButton = "";
    if(user.estado === 0){
      newMessage = "¿Está seguro que desea activar el usuario?";
      newButton = "Activar"
    }else{
      newMessage = "¿Está seguro que desea desactivar el usuario?";
      newButton = "Desactivar"
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      width:'350px',
      data: {
        message: newMessage,
        okButton: newButton,
        cancelButton: "Cancelar",
        type:"estado",
        active: user.estado
      }
    })
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.suscription.add(
          this.userSrv.changeStatus(user).subscribe((res)=>{
            if(res){
              this.suscription.add(
                this.userSrv.getAll(1).subscribe(res=>{
                  this.dataSource.data = res.usuarios
              }, 
              err =>
               {
                if(err === 403){
                  window.alert("Ha ocurrido un error al conectar con el servidor.");        
                }
                if(err === 0){
                  window.alert("Ha ocurrido un error al conectar con el servidor.");
                }
               })
              )
            }
          },
          err =>
          {
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
    })
  }
};
