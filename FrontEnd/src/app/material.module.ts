import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

const materials_modules = [
  CommonModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule
];

@NgModule({
  imports: [...materials_modules],
  exports: [...materials_modules]
})

export class MaterialModule { }
