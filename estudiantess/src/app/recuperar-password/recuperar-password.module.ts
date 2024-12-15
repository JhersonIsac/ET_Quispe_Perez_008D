import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';  // Para formularios reactivos
import { RecuperarPasswordPage } from './recuperar-password.page';
import { RecuperarPasswordPageRoutingModule } from './recuperar-password-routing.module';  // Importa el módulo de rutas

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,  // Para formularios reactivos
    RecuperarPasswordPageRoutingModule,  // Asegúrate de importar el módulo de rutas
  ],
  declarations: [RecuperarPasswordPage],  // Declara la página aquí
})
export class RecuperarPasswordModule {}
