import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsistenciaRoutingModule } from './asistencia-routing.module';
import { AsistenciaComponent } from './asistencia.component';
import { MaterialModule } from '@app/material.module';
import { FormsModule } from '@angular/forms';
import { QuitoVideovigilanciaComponent } from './quito-videovigilancia/quito-videovigilancia.component';
import { QuitoDespachoComponent } from './quito-despacho/quito-despacho.component';


@NgModule({
  declarations: [
    AsistenciaComponent,
    QuitoVideovigilanciaComponent,
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
