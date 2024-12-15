import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; 

@Component({
  selector: 'app-visualizar-clases',
  templateUrl: './visualizar-clases.page.html',
  styleUrls: ['./visualizar-clases.page.scss'],
})
export class VisualizarClasesPage implements OnInit {
  clases: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.clases = this.userService.obtenerClases(); 
    console.log('Clases registradas:', this.clases); 
  }
}
