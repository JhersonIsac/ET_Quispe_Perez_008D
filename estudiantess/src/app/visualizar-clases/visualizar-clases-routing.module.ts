import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarClasesPage } from './visualizar-clases.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarClasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarClasesPageRoutingModule {}
