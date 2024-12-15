import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-justificacion-inasistencia',
  templateUrl: './justificacion-inasistencia.page.html',
  styleUrls: ['./justificacion-inasistencia.page.scss'],
})
export class JustificacionInasistenciaPage implements OnInit {
  justificacionForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null; 
  justificaciones: { asignatura: string; profesor: string; fecha: string; descripcion: string; image: string | ArrayBuffer | null }[] = []; // Arreglo para almacenar justificaciones

  constructor(private fb: FormBuilder) {
    this.justificacionForm = this.fb.group({
      asignatura: ['', Validators.required],
      profesor: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit() {}

  // Maneja la selección de la imagen
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; 
      };
      reader.readAsDataURL(file); 
    }
  }

  guardarJustificacion() {
    if (this.justificacionForm.valid) {
      // Guarda la justificación y la imagen en el arreglo
      const nuevaJustificacion = {
        asignatura: this.justificacionForm.value.asignatura,
        profesor: this.justificacionForm.value.profesor, // Captura el profesor
        fecha: this.justificacionForm.value.fecha,
        descripcion: this.justificacionForm.value.descripcion,
        image: this.imagePreview,
      };
      this.justificaciones.push(nuevaJustificacion); // Agrega la nueva justificación al arreglo
      console.log(this.justificaciones); // Muestra todas las justificaciones en consola

      // Limpia el formulario y la vista previa
      this.justificacionForm.reset();
      this.imagePreview = null;
    }
  }

  // Maneja la edición de una justificación
  editarJustificacion(justificacion: any) {
    this.justificacionForm.patchValue({
      asignatura: justificacion.asignatura,
      profesor: justificacion.profesor, 
      fecha: justificacion.fecha,
      descripcion: justificacion.descripcion,
    });
    this.imagePreview = justificacion.image; // Carga la imagen para vista previa
    this.eliminarJustificacion(justificacion); // Elimina la justificación para evitar duplicados
  }

  // Elimina una justificación del arreglo
  eliminarJustificacion(justificacion: any) {
    const index = this.justificaciones.indexOf(justificacion);
    if (index >= 0) {
      this.justificaciones.splice(index, 1); // Elimina la justificación
    }
  }
}

