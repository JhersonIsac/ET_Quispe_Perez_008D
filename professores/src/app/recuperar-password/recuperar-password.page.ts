import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'; // Asegúrate de que el servicio esté importado

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage implements OnInit {

  recuperarForm!: FormGroup;
  mensaje: string = '';
  error: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.recuperarForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Método que se llama cuando se envía el formulario
  onRecuperar() {
    if (this.recuperarForm.valid) {
      const email = this.recuperarForm.value.email;

      this.authService.recuperarPassword(email).subscribe({
        next: (usuario: any) => {
          // Si el correo está registrado, mostramos un mensaje de éxito
          this.mensaje = 'Se ha enviado un enlace para restablecer tu contraseña al correo proporcionado.';
          this.error = '';
        },
        error: (err: any) => {
          // Si el correo no está registrado, mostramos un mensaje de error
          this.error = 'El correo electrónico no está registrado en el sistema.';
          this.mensaje = '';
        }
      });
    }
  }
}
