import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarClasesPageRoutingModule } from './visualizar-clases-routing.module';

import { VisualizarClasesPage } from './visualizar-clases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarClasesPageRoutingModule
  ],
  declarations: [VisualizarClasesPage]
})
export class VisualizarClasesPageModule {}
