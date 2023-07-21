import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images = [
    '/assets/1.png',
    '/assets/2.png',
    '/assets/3.png',
    '/assets/4.png',
    '/assets/5.png',
    // Agrega aquí más imágenes si es necesario
  ];

  constructor(config: NgbCarouselConfig) {
    config.interval = 4000; // Cambiar de imagen cada 5 segundos
    config.wrap = true; // Reiniciar al principio después de llegar al final
    config.keyboard = false; // Deshabilitar navegación con teclado
    config.pauseOnHover = false; // No pausar el carrusel al pasar el ratón sobre él
  }

  ngOnInit() {
  }

}
