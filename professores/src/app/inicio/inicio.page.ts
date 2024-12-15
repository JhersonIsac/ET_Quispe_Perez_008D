import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  currentImageIndex = 0;
  images = [
    'assets/icon/estudiantes.png',
    'assets/icon/librosweb.png',
    'assets/icon/profesor.png'
  ];

  constructor() {}

  ngOnInit() {}

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex > 0) ? this.currentImageIndex - 1 : this.images.length - 1;
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex < this.images.length - 1) ? this.currentImageIndex + 1 : 0;
  }
}
