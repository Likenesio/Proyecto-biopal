import { Component } from '@angular/core';
import { ProductosService } from 'src/app/service/productos.service';


interface Unidad {
  unidad: string;
}

@Component({
  selector: 'app-ingresar-producto',
  templateUrl: './ingresar-producto.component.html',
  styleUrls: ['./ingresar-producto.component.css']
})

export class IngresarProductoComponent {

  codigo_barra: any;
  nombre_producto: any;
  precio_unitario: any;
  unidad: any;
  stock:any;
  unidades: Unidad[] = [];
  selectedUnidad: any;
  camposCompletos: boolean = false;


  constructor(private productosService: ProductosService) {}

    ngOnInit() {
        this.unidades = [
            { unidad: 'KG' },
            { unidad: 'UD.'},
        ];
    }
    validarCamposCompletos() {
      this.camposCompletos = !!this.codigo_barra && !!this.nombre_producto && !!this.precio_unitario && !!this.selectedUnidad && !!this.stock ;
    }

    guardar() {
      this.validarCamposCompletos();
      if (this.camposCompletos) {
              let producto = {
                codigo_barra: this.codigo_barra,
                nombre_producto: this.nombre_producto,
                precio_unitario: this.precio_unitario,
                unidad: this.selectedUnidad.unidad,
                stock: this.stock
              };
              this.productosService.insertarProductos(producto).subscribe(
                (data: any) => {
                  alert("Producto ingresado exitosamente");
                },
                (error: any) => {
                  alert("Error al insertar producto");
                }
              );
      } else {
        alert("Debe llenar todos los campos antes de guardar.");
      }
    }


  }

