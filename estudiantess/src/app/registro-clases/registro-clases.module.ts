import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { IonicModule } from '@ionic/angular';

import { RegistroClasesPageRoutingModule } from './registro-clases-routing.module';

import { RegistroClasesPage } from './registro-clases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    IonicModule,
    RegistroClasesPageRoutingModule
  ],
  declarations: [RegistroClasesPage]
})
export class RegistroClasesPageModule {}

