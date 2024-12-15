import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

interface Estudiante {
  nombre: string;
  estadoAsistencia: boolean;  // true = presente, false = ausente
}

interface Clase {
  id: number;
  nombre: string;
  fecha: string;  // Fecha seleccionada para la clase
  estudiantes: Estudiante[];
}

@Component({
  selector: 'app-lista-asistencia',
  templateUrl: './lista-asistencia.page.html',
  styleUrls: ['./lista-asistencia.page.scss'],
})
export class ListaAsistenciaPage implements OnInit {
  clases: Clase[] = [];  // Lista de clases con sus estudiantes
  fechaSeleccionada: string = ''; // Fecha seleccionada del calendario

  constructor(private toastController: ToastController) {}

  ngOnInit() {
    // Cargar datos de clases y estudiantes (puedes cargarlo desde 'almacen.json' o un servicio)
    this.cargarClases();
  }

  cargarClases() {
    // Simulación de carga de clases y estudiantes
    this.clases = [
      {
        id: 1,
        nombre: 'Matemáticas',
        fecha: '2024-11-21',
        estudiantes: [
          { nombre: 'Juan Pérez', estadoAsistencia: false },
          { nombre: 'María Gómez', estadoAsistencia: true },
          { nombre: 'Carlos Sánchez', estadoAsistencia: false },
        ],
      },
      {
        id: 2,
        nombre: 'Historia',
        fecha: '2024-11-22',
        estudiantes: [
          { nombre: 'Laura Martínez', estadoAsistencia: true },
          { nombre: 'Luis García', estadoAsistencia: true },
          { nombre: 'Ana López', estadoAsistencia: false },
        ],
      },
    ];
  }

  // Cambiar el estado de asistencia de un estudiante
  toggleAsistencia(clase: Clase, index: number) {
    clase.estudiantes[index].estadoAsistencia = !clase.estudiantes[index].estadoAsistencia;
    this.showToast(`Asistencia de ${clase.estudiantes[index].nombre} actualizada.`);
  }

  // Mostrar un mensaje de confirmación
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  // Establecer la fecha seleccionada desde el calendario
  setFechaClase() {
    if (this.fechaSeleccionada) {
      this.clases.forEach(clase => {
        clase.fecha = this.fechaSeleccionada;
      });
      this.showToast('Fecha de la clase actualizada');
    } else {
      this.showToast('Por favor, seleccione una fecha');
    }
  }

  // Guardar las asistencias (ejemplo de acción)
  guardarAsistencia() {
    // Aquí podrías guardar los datos actualizados en una base de datos o en el almacenamiento local
    this.showToast('Asistencia guardada correctamente');
  }
}
