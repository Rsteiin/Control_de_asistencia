import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitucionRoutingModule } from './institucion-routing.module';
import { InstitucionComponent } from './institucion.component';
import { MaterialModule } from '@app/material.module';
import { TableComponent } from '@app/shared/components/table/table.component';


@NgModule({
  declarations: [
    InstitucionComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    InstitucionRoutingModule,
    MaterialModule
  ]
})
export class InstitucionModule { }
