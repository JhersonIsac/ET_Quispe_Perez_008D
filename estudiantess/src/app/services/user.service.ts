// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Datos del usuario
  private user: User = {
    name: 'Jherson',
    email: 'jherson@gmail.com',
    profilePicture: ''
  };

  // Arreglo para almacenar las clases del usuario
  private userClasses: any[] = [];

  constructor() {}

  // Método para obtener los datos del usuario
  getUser(): Promise<User> {
    return Promise.resolve(this.user);
  }

  // Método para actualizar los datos del usuario
  updateUser(userData: User): void {
    this.user = { ...this.user, ...userData };
  }

  // Método para agregar una clase
  agregarClase(clase: any) {
    // Se espera que clase contenga los campos necesarios
    this.userClasses.push(clase);
    console.log('Clase agregada:', clase); 
  }

  // Método para obtener las clases del usuario
  obtenerClases() {
    return this.userClasses;
  }
}
