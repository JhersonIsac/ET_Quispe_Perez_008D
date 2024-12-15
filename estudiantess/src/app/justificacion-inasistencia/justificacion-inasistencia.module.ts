import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { IonicModule } from '@ionic/angular';
import { JustificacionInasistenciaPage } from './justificacion-inasistencia.page';
import { RouterModule } from '@angular/router';  

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    IonicModule,
    RouterModule.forChild([{ path: '', component: JustificacionInasistenciaPage }])
  ],
  declarations: [JustificacionInasistenciaPage]
})
export class JustificacionInasistenciaPageModule {}
