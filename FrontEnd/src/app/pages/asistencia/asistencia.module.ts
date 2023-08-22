import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsistenciaRoutingModule } from './asistencia-routing.module';
import { AsistenciaComponent } from './asistencia.component';
import { QuitoComponent } from './quito/quito.component';
import { QuitoDespachoComponent } from './quito-despacho/quito-despacho.component';
import { MaterialModule } from '@app/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AsistenciaComponent,
    QuitoComponent,
    QuitoDespachoComponent
  ],
  imports: [
    CommonModule,
    AsistenciaRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class AsistenciaModule { }
