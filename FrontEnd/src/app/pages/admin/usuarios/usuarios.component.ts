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
import { MatDialog } from '@angular/material/dialog';

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
    private dialog: MatDialog
    ) {

  }

  ngOnInit(): void {
      this.userSrv.getAll(1).subscribe(res=>{
        this.dataSource.data = res.usuarios
    });
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
        console.log("respuesta del dialog",res)
      }
    })
  }

};