import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitucionRoutingModule } from './institucion-routing.module';
import { InstitucionComponent } from './institucion.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [
    InstitucionComponent
  ],
  imports: [
    CommonModule,
    InstitucionRoutingModule,
    MaterialModule
  ]
})
export class InstitucionModule { }
