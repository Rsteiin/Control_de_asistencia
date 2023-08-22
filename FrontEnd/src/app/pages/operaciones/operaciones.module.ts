import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperacionesRoutingModule } from './operaciones-routing.module';
import { OperacionesComponent } from './operaciones.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [
    OperacionesComponent
  ],
  imports: [
    CommonModule,
    OperacionesRoutingModule,
    MaterialModule,
    
  ]
})
export class OperacionesModule { }
