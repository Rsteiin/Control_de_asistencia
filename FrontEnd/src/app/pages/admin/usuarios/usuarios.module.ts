import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
