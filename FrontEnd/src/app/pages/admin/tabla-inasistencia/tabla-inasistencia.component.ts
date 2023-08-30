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

  isLoading = true;
  institucion;
  nombre : string = "";
  consolas = []
  displayedColumns: string[] = ['consola', 'area', 'inasistencias', 'porcentaje'];
  dataSource = new MatTableDataSource([]);

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
        this.dataSource.data = res.inasistencias
        this.isLoading = false

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
