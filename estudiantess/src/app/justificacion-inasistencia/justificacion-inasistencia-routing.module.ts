import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JustificacionInasistenciaPage } from './justificacion-inasistencia.page';

const routes: Routes = [
  {
    path: '',
    component: JustificacionInasistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JustificacionInasistenciaPageRoutingModule {}
