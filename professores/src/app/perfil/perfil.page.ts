import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  perfilForm: FormGroup;
  usuario: any; // Para almacenar la información del usuario
  imagen!: string; // Para almacenar la ruta de la imagen
  usuarios: any[] = []; // Almacena todos los usuarios

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    // Crear el formulario reactivo
    this.perfilForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      imagen: ['']
    });

    // Cargar información del usuario
    this.cargarUsuarios();
  }

  // Método para cargar la información de los usuarios
  cargarUsuarios() {
    this.authService.getUsuarios().subscribe((data) => {
      this.usuarios = data;

      // Aquí puedes agregar lógica para obtener el usuario logueado
      const usuarioLogueado = this.authService.getUsuarioLogueado();
      if (usuarioLogueado) {
        this.usuario = usuarioLogueado;

        // Establecer valores en el formulario
        this.perfilForm.setValue({
          nombre: this.usuario.nombre || '',
          email: this.usuario.email || '',
          password: '',
          imagen: this.usuario.imagen || ''
        });
        this.imagen = this.usuario.imagen || ''; // Cargar la imagen del usuario
      }
    });
  }

  // Método para actualizar la información del usuario
  async actualizarPerfil() {
    if (this.perfilForm.valid) {
      const updatedUser = {
        ...this.usuario,
        ...this.perfilForm.value,
        imagen: this.imagen 
      };

      const index = this.usuarios.findIndex(u => u.email === updatedUser.email);
      if (index !== -1) {
        this.usuarios[index] = updatedUser;

        await this.authService.actualizarUsuario(updatedUser).toPromise();
        

        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        this.usuario = updatedUser; 

        // **Actualizar el formulario con los nuevos valores**
        this.perfilForm.setValue({
          nombre: updatedUser.nombre || '',
          email: updatedUser.email || '',
          password: '',
          imagen: updatedUser.imagen || ''
        });

        // Mostrar mensaje de éxito
        await this.showToast('Perfil actualizado exitosamente', 'success');
      } else {
        await this.showToast('Usuario no encontrado', 'danger');
      }
    } else {
      await this.showToast('Por favor completa todos los campos correctamente', 'danger');
    }
  }

  // Método para cargar una imagen
  async cargarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagen = reader.result as string; 
        this.perfilForm.patchValue({ imagen: this.imagen }); 
      };
      reader.readAsDataURL(file);
    }
  }

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
