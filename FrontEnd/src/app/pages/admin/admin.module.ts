import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '@app/material.module';
import { TablaInasistenciaComponent } from './tabla-inasistencia/tabla-inasistencia.component';


@NgModule({
  declarations: [
    AdminComponent,
    TablaInasistenciaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
