import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UtilsService } from '@app/shared/services/utils.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { TablaInasistenciaService } from './services/tabla-inasistencia.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-tabla-inasistencia',
  templateUrl: './tabla-inasistencia.component.html',
  styleUrls: ['./tabla-inasistencia.component.scss']
})
export class TablaInasistenciaComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  institucion;
  nombre : string = "";
  consolas = []
  displayedColumns: string[] = ['consola', 'area', 'inasistencias', 'porcentaje'];
  dataSource = new MatTableDataSource([]);

  //variables para mostrar las diferentes areas
  area1: string  = "";
  area2: string = "";

  //parametros para child 
  //turnos card
  turnos: number = 0;
  icono_turnos: string = "desktop_windows";
  title_turnos:string = "TURNOS"
  //turnos inasistencias totales
  inasistencias_totales: number = 0;
  title_inasistencias:string = "INASISTENCIAS";
  icono_inasistencias:string = "desktop_access_disabled";
  //turnos inasistencias totales
  promedio_inasistencias: number|string = 0;
  title_promerio_inasistencias:string = "PORCENTAJE";
  icono_promedio_inasistencias:string = "percent";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private destroy$ = new Subject<any>();
  private suscription = new Subscription();

  constructor(
    private utilsSvc: UtilsService,
    private tableSvc: TablaInasistenciaService
  ) { }

  ngOnInit(): void {
    this.utilsSvc.institution$.pipe(takeUntil(this.destroy$)).subscribe((res)=>(
      this.institucion = res
    ));

    this.suscription.add(
      this.tableSvc.getInasistenciasPorInstitucion(this.institucion).subscribe((res)=>{
        this.nombre = res.institucion;
        this.dataSource.data = res.inasistencias;
        this.inasistencias_totales = calcularInasistencias(res.inasistencias)
        this.turnos = res.turnos * (res.consolas_totales[0].cantidad + (res.consolas_totales[1]?.cantidad?res.consolas_totales[1].cantidad:0));
        this.promedio_inasistencias = (this.inasistencias_totales/this.turnos).toFixed(2) + "%";
        this.area1 = res.consolas_totales[0].area
        this.area2 = res.consolas_totales[1]? res.consolas_totales[1].area :" ";
        console.log(this.area1,this.area2)
        this.isLoading = false;
      },err =>{
        console.log(err)
      })
    )

  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    this.destroy$.next({});
    this.destroy$.complete();
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

const calcularInasistencias = (inasistencias)=>{
  let total_inasistencias = 0;
  inasistencias.map((inasistencia)=>{
    total_inasistencias = total_inasistencias + inasistencia.inasistencias
  })
  return total_inasistencias
}
