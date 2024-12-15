import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menu: MenuController, private authService: AuthService, private router: Router) {}

  //cierra el menú cuando es llamada
  closeMenu() {
    this.menu.close();
  }

  // Función para cerrar sesión y redirigir al inicio
  logout() {
    this.authService.logout(); // Cerrar sesión
    this.router.navigate(['/inicio']); // Redirigir al inicio
  }
}

