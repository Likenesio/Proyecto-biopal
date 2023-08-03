import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'primeng/api';
import { ProductosService } from 'src/app/service/productos-service/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  messages: Message[] = [];
  messages1: Message[] = [];
  mensaje: any;
  stock: any;
  id: any;
  respuesta: any;
  productosListar: any[] = [];
  productosLow: any;

  images = [
    '/assets/1.png',
    '/assets/2.png',
    '/assets/3.png',
    '/assets/4.png',
    '/assets/5.png',
    // Agrega aquí más imágenes si es necesario
  ];

  constructor(
    config: NgbCarouselConfig,
    private productosService: ProductosService
  ) {
    config.interval = 4000; // Cambiar de imagen cada 5 segundos
    config.wrap = true; // Reiniciar al principio después de llegar al final
    config.keyboard = false; // Deshabilitar navegación con teclado
    config.pauseOnHover = false; // No pausar el carrusel al pasar el ratón sobre él
  }

  ngOnInit() {
    this.productosService.verificarStock().subscribe((data) => {
      this.productosLow = data.lowStock;
      this.messages = [
        { severity: 'warn', summary: 'Atención: ', detail: 'Existen ' + this.productosLow.length + ' productos con bajo stock' },
    ];

      /*this.productosLow.map((producto: any, index:any) => {
        this.messages= [{
          severity: 'warn',
          summary: 'Warning',
          detail:'El producto: ' + this.productosLow[index].nombre_producto + ' tiene un stock bajo',
        },
        {
          severity: 'warn',
          summary: 'Warning',
          detail:'El producto: ' + this.productosLow[index+1].nombre_producto + ' tiene un stock bajo',
        }]
      });
      console.log('messages:', this.messages);*/
    });
  }
  }
