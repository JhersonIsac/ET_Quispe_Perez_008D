import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    // Configurar el formulario reactivo
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]], // Longitud mínima de 6 caracteres
    });
  }

  // Método que se ejecuta al hacer clic en "Login"
  onLogin() {
    console.log('Formulario enviado'); 
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (user) => {
          if (user) {
            console.log('Inicio de sesión exitoso');
            this.showToast('Inicio de sesión exitoso', 'success');
            this.navCtrl.navigateRoot('/perfil'); 
          }
        },
        (error: any) => {
          console.error('Error al iniciar sesión:', error);
          this.showAlert('Error', 'Credenciales incorrectas o usuario no encontrado.');
        }
      );
    } else {
      this.showAlert('Formulario inválido', 'Por favor, completa todos los campos correctamente.');
    }
  }

  // Método para mostrar una alerta personalizada
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para mostrar un toast (mensaje emergente) en la parte inferior de la pantalla
  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}


