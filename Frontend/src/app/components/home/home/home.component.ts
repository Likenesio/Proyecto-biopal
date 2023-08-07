import { Component, OnInit } from "@angular/core";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { Message } from "primeng/api";
import { ProductosService } from "src/app/service/productos-service/productos.service";

interface ProductosLow {
  nombre_producto: string;
  stock: number;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
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
    "/assets/1.png",
    "/assets/2.png",
    "/assets/3.png",
    "/assets/4.png",
    "/assets/5.png",
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
      //crear un arreglo local en donde solo considere el nombre de producto y stock
      let productos: ProductosLow[] = [];
      //recorre el arreglo de la data recibida de productos
      this.productosLow.map((producto: any, index: any) => {
        //agrega el nombre de producto y stock al arreglo local
        productos.push({
          nombre_producto: producto.nombre_producto,
          stock: producto.stock,
        });
      });
      //recorre el arreglo local para crear la alerta de productos con poco o sin stock
      productos.map((producto: any, index: any) => {
        //verifica si el stock es mayor a 0 para agregar una alerta de producto con stock, en caso de que sea igual a 0, se agrega una alerta roja de sin stock
        if (producto.stock > 0) {
          this.messages = [
            ...this.messages,
            {
              severity: "warn",
              summary: "Atención: ",
              detail:
                "El producto " +
                producto.nombre_producto +
                " tiene un stock de " +
                producto.stock +
                " unidades",
            },
          ];
        } else {
          this.messages = [
            ...this.messages,
            {
              severity: "error",
              summary: "Atención: ",
              detail:
                "El producto " + producto.nombre_producto + " no tiene stock",
            },
          ];
        }
      });
    });
  }
}
