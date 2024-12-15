import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registro-clases',
  templateUrl: './registro-clases.page.html',
  styleUrls: ['./registro-clases.page.scss'],
})
export class RegistroClasesPage implements OnInit {
  registroForm: FormGroup;
  asignaturas = [
    { nombre: 'Matemáticas', descripcion: 'Clase de matemáticas avanzadas', profesor: 'Prof. Juan' },
    { nombre: 'Historia', descripcion: 'Clase de historia mundial', profesor: 'Prof. María' },
    { nombre: 'Ciencias', descripcion: 'Clase de ciencias naturales', profesor: 'Prof. Pedro' },
    { nombre: 'Lengua y Literatura', descripcion: 'Clase de lengua y literatura', profesor: 'Prof. Ana' }
  ];
  selectedAsignatura: any;
  mensaje!: string;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.registroForm = this.formBuilder.group({
      nombreUsuario: ['', Validators.required],
      rut: ['', [Validators.required, this.validarRut]],
      email: ['', [Validators.required, Validators.email, this.validarEmail]],
      fecha: ['', Validators.required],
      asignatura: [null, Validators.required]
    });
  }

  ngOnInit() {}

  onAsignaturaChange() {
    const asignaturaNombre = this.registroForm.get('asignatura')?.value;
    this.selectedAsignatura = this.asignaturas.find(asignatura => asignatura.nombre === asignaturaNombre);
  }

  registrarClase() {
    this.submitted = true; // Marca que se ha intentado enviar el formulario

    if (this.registroForm.valid) {
      const nuevaClase = {
        ...this.registroForm.value,
        descripcion: this.selectedAsignatura.descripcion,
        profesor: this.selectedAsignatura.profesor,
      };
      console.log('Datos a registrar:', nuevaClase);
      this.userService.agregarClase(nuevaClase);
  
      this.mensaje = `Clase "${nuevaClase.asignatura}" registrada correctamente.`;
      
      this.registroForm.reset();
      this.submitted = false;
      this.selectedAsignatura = null;
    } else {
      this.mensaje = 'Por favor, completa todos los campos requeridos y corrige los errores.';
    }
  }

  validarRut(control: any) {
    const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
    const valid = rutRegex.test(control.value);
    
    if (!valid) return { invalidRut: true };

    const [numero, dv] = control.value.split('-');
    const rutSinDV = parseInt(numero, 10);
    const dvCalculado = this.calcularDV(rutSinDV);
    
    return dvCalculado.toString().toLowerCase() === dv.toLowerCase() ? null : { invalidRut: true };
  }

  calcularDV(rut: number): string {
    let suma = 0;
    let multiplicador = 2;

    while (rut > 0) {
      suma += (rut % 10) * multiplicador;
      rut = Math.floor(rut / 10);
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const dv = 11 - (suma % 11);
    return dv === 10 ? 'k' : dv === 11 ? '0' : dv.toString();
  }

  validarEmail(control: any) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  }
}
