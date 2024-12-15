import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule)
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule) },
  {
    path: 'generar-qr',
    loadChildren: () => import('./generar-qr/generar-qr.module').then(m => m.GenerarQRPageModule)
  },
  {
    path: 'justificacion-inasistencia',
    loadChildren: () => import('./justificacion-inasistencia/justificacion-inasistencia.module').then(m => m.JustificacionInasistenciaPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'registro-clases',
    loadChildren: () => import('./registro-clases/registro-clases.module').then(m => m.RegistroClasesPageModule)
  },
  {
    path: 'visualizar-clases',
    loadChildren: () => import('./visualizar-clases/visualizar-clases.module').then(m => m.VisualizarClasesPageModule)
  },
  {
    path: 'recuperar-password',
    loadChildren: () => import('./recuperar-password/recuperar-password.module').then(m => m.RecuperarPasswordModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

