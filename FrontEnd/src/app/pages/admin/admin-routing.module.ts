import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TablaInasistenciaComponent } from './tabla-inasistencia/tabla-inasistencia.component';

const routes: Routes = [
{ path: '', component: AdminComponent }, 
{ path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },
{ path: 'amt', component: TablaInasistenciaComponent},
{ path: 'ant', component: TablaInasistenciaComponent},
{ path: 'cbdmq', component: TablaInasistenciaComponent},
{ path: 'coe', component: TablaInasistenciaComponent},
{ path: 'cre', component: TablaInasistenciaComponent},
{ path: 'emaseo', component: TablaInasistenciaComponent},
{ path: 'ffaa', component: TablaInasistenciaComponent},
{ path: 'mspz2', component: TablaInasistenciaComponent},
{ path: 'mspz9', component: TablaInasistenciaComponent},
{ path: 'pmq', component: TablaInasistenciaComponent},
{ path: 'ppnn', component: TablaInasistenciaComponent},
{ path: 'sngre', component: TablaInasistenciaComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
