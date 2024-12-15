import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-justificaciones',
  templateUrl: './justificaciones.page.html',
  styleUrls: ['./justificaciones.page.scss'],
})
export class JustificacionesPage implements OnInit {
  justificaciones: any[] = []; // Todas las justificaciones
  justificacionesFiltradas: any[] = []; // Justificaciones filtradas por asignatura
  asignaturas: string[] = []; // Lista de asignaturas únicas
  selectedAsignatura: string = ''; // Asignatura seleccionada

  constructor(private http: HttpClient, private alertController: AlertController) {}

  ngOnInit() {
    this.cargarJustificaciones();
  }

  // Cargar justificaciones desde el JSON
  cargarJustificaciones() {
    this.http.get('assets/data/almacen.json').subscribe((data: any) => {
      this.justificaciones = data.justificaciones || [];
      this.asignaturas = [...new Set(this.justificaciones.map(j => j.asignatura))]; // Extraer asignaturas únicas
      this.justificacionesFiltradas = this.justificaciones; // Mostrar todas al inicio
    });
  }

  // Filtrar justificaciones por asignatura
  filtrarJustificaciones() {
    if (this.selectedAsignatura) {
      this.justificacionesFiltradas = this.justificaciones.filter(
        j => j.asignatura === this.selectedAsignatura
      );
    } else {
      this.justificacionesFiltradas = this.justificaciones;
    }
  }

  // Editar comentario de una justificación
  async editarComentario(justificacion: any) {
    const alert = await this.alertController.create({
      header: 'Editar comentario',
      inputs: [
        {
          name: 'comentario',
          type: 'text',
          placeholder: 'Escribe un comentario',
          value: justificacion.comentario || ''
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            justificacion.comentario = data.comentario;
            this.guardarCambios(); // Guardar cambios en el JSON
          }
        }
      ]
    });
    await alert.present();
  }

  // Guardar cambios en el JSON
  guardarCambios() {
    const updatedData = { justificaciones: this.justificaciones };
    this.http.post('assets/data/almacen.json', updatedData).subscribe(() => {
      console.log('Datos actualizados en almacen.json');
    });
  }
}
