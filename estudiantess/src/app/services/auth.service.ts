import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Usuario {
  id?: number;  // Cambiado de 'id: number' a 'id?: number' para hacerlo opcional
  email: string;
  password: string;
  nombre: string;
  [key: string]: any;  // Si necesitas más propiedades, puedes agregarlas
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'assets/data/almacen.json';  // URL local para el archivo JSON

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo usuario
  registrarUsuario(usuario: Usuario): Observable<Usuario[]> {
    return this.http.get<any>(this.url).pipe(
      map((data: any) => {
        // Aseguramos que 'data.usuarios' sea un arreglo vacío si no está definido o es nulo
        const usuarios: Usuario[] = data?.usuarios ?? [];
  
        // Comprobamos si el arreglo está vacío, si lo está, asignamos 1, si no, asignamos el id incrementado
        const id = usuarios.length === 0 ? 1 : (usuarios[usuarios.length - 1]?.id ?? 0) + 1;
  
        // Creamos el nuevo usuario con el id asignado
        const nuevoUsuario = { ...usuario, id };
  
        // Agregamos el nuevo usuario al arreglo
        usuarios.push(nuevoUsuario);
        return usuarios;
      }),
      catchError(this.handleError)
    );
  }
  
  
  
  
  
  
  

  // Método para iniciar sesión
  login(email: string, password: string): Observable<Usuario> {
    return this.http.get<any>(this.url).pipe(
      map((data: any) => {
        const usuarios: Usuario[] = data.usuarios;
        const user = usuarios.find((user: Usuario) => user.email === email && user.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));  // Guarda el usuario en localStorage
          return user;
        } else {
          throw new Error('Usuario o contraseña incorrectos');
        }
      }),
      catchError((error) => {
        console.error('Error en login:', error);
        return throwError(error);
      })
    );
  }

  // Método para recuperar la contraseña (simulación)
  recuperarContraseña(email: string): Observable<{ mensaje: string }> {
    return new Observable(observer => {
      this.http.get<any>(this.url).subscribe(data => {
        const usuario: Usuario | undefined = data.usuarios.find((u: Usuario) => u.email === email);
        if (usuario) {
          // Simulamos el envío de un correo para recuperación de contraseña
          observer.next({ mensaje: 'Se ha enviado un enlace para restablecer tu contraseña al correo proporcionado.' });
        } else {
          observer.error('Correo no registrado');
        }
      });
    });
  }

  // Obtener el usuario actualmente logueado
  getUsuarioLogueado(): Usuario | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('currentUser');  // Elimina al usuario de localStorage
  }

  // Obtener todos los usuarios (para cargar en el perfil)
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<any>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar usuario (simulación)
  actualizarUsuario(usuario: Usuario): Observable<{ mensaje: string }> {
    return new Observable(observer => {
      this.http.get<any>(this.url).subscribe(data => {
        const usuarios: Usuario[] = data.usuarios;
        const index = usuarios.findIndex((u: Usuario) => u.id === usuario.id);
        if (index !== -1) {
          usuarios[index] = usuario;  // Actualiza el usuario
          observer.next({ mensaje: 'Usuario actualizado con éxito.' });
        } else {
          observer.error('Usuario no encontrado');
        }
      });
    });
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    return throwError(errorMessage);  // Retorna un observable con el mensaje de error
  }
}
