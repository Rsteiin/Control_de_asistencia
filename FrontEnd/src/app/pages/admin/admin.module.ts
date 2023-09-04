import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '@app/material.module';
import { TablaInasistenciaComponent } from './tabla-inasistencia/tabla-inasistencia.component';
import { CardComponent } from './components/card/card.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { PieChartTurnosComponent } from './charts/pie-chart-turnos/pie-chart-turnos.component';

@NgModule({
  declarations: [
    AdminComponent,
    TablaInasistenciaComponent,
    CardComponent,
    PieChartComponent,
    PieChartTurnosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
