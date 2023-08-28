import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciaComponent } from './asistencia.component';
import { QuitoVideovigilanciaComponent } from './quito-videovigilancia/quito-videovigilancia.component';
import { QuitoDespachoComponent } from './quito-despacho/quito-despacho.component';

const routes: Routes = [{ path: '', component: AsistenciaComponent },
{ path: 'quito-videovigilancia', component:QuitoVideovigilanciaComponent },
{ path: 'quito-despacho', component:QuitoDespachoComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsistenciaRoutingModule { }
