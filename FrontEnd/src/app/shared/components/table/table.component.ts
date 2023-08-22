import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { OperacionesService } from '@app/pages/operaciones/service/operaciones.service';
import { InasisteciaRspuesta } from '@app/shared/models/inasistencia.interface';

const ELEMENT_DATA: InasisteciaRspuesta[] = [
  {consola: '8301', area: 'VIDEO', inasistencias :30, porcentaje:'100 %'}
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['Consola', 'Area', 'Inasistencias', 'Porcentaje/Numero de dias'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(private operacionesSVC:OperacionesService) { }

  ngOnInit(): void {
    this.operacionesSVC.getTablaInstitucion("P.P.N.N").subscribe((res) => 
    {
      this.dataSource.data = res;
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
