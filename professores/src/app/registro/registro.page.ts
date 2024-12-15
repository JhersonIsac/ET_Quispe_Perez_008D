import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Validador para asegurarse de que las contraseñas coincidan
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  async onRegistro() {
    if (this.registroForm.valid) {
      const { nombre, email, password } = this.registroForm.value;
      
      try {
        // Registro del usuario utilizando el AuthService
        await this.authService.registrarUsuario({ nombre, email, password }).toPromise();
        this.showAlert('Registro exitoso', 'Usuario registrado correctamente.');
        this.navCtrl.navigateRoot('/login'); 
      } catch (error) {
        console.error(error);
        this.showAlert('Error', 'Hubo un problema con el registro.');
      }
    }
  }

  // Mostrar alertas de éxito o error
  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
