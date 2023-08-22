import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from './shared/guards/check-login.guard';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'notFound', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: 'administrador', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule),
    canActivate:[CheckLoginGuard] },
  { path: 'asistencia', loadChildren: () => import('./pages/asistencia/asistencia.module').then(m => m.AsistenciaModule) },
  { path: 'operaciones', loadChildren: () => import('./pages/operaciones/operaciones.module').then(m => m.OperacionesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
