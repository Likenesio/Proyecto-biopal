import { Component } from '@angular/core';
import { ProductosService } from 'src/app/service/productos-service/productos.service';
import Swal from 'sweetalert2';

interface Unidad {
  unidad: string;
}

@Component({
  selector: 'app-ingresar-producto',
  templateUrl: './ingresar-producto.component.html',
  styleUrls: ['./ingresar-producto.component.css'],
})
export class IngresarProductoComponent {
  codigo_barra: any;
  nombre_producto: any;
  precio_unitario: any;
  unidad: any;
  stock: any;
  unidades: Unidad[] = [];
  selectedUnidad: any;
  camposCompletos: boolean = false;

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.unidades = [{ unidad: 'KG' }, { unidad: 'UD.' }];
  }
  validarCamposCompletos() {
    this.camposCompletos =
      !!this.codigo_barra &&
      !!this.nombre_producto &&
      !!this.precio_unitario &&
      !!this.selectedUnidad &&
      !!this.stock;
  }
    validarCodigoBarras(codigo: number): boolean {
    const patron = /^[0-9]{4}$/;
    return patron.test(codigo.toString());
  }

   validarCampoNumerico(precio: number): boolean {
    const regex = /^[1-9]\d*$/;
    return regex.test(precio.toString());
  }
  validarNombre(nombre: string): boolean {
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(nombre);
  }
   validarCampoCantidad(cantidad: number): boolean {
    const regex = /^[1-9]\d*$/;
    return regex.test(cantidad.toString());
  }

  guardar() {
    this.validarCamposCompletos();
    if (this.camposCompletos) {
      let producto = {
        codigo_barra: this.codigo_barra,
        nombre_producto: this.nombre_producto,
        precio_unitario: this.precio_unitario,
        unidad: this.selectedUnidad.unidad,
        stock: this.stock,
      };
      if(!this.validarCodigoBarras(this.codigo_barra)){
        Swal.fire({
          icon: 'info',
          text: 'Ingrese un código de barras de 4 digitos númerico',
        });
        return;
      }
      if(!this.validarNombre(this.nombre_producto)){
        Swal.fire({
          icon: 'info',
          text: 'Ingrese un nombre de producto sin carácteres númericos',
        });
        return;
      }
      if(!this.validarCampoNumerico(this.precio_unitario)){
        Swal.fire({
          icon: 'info',
          text: 'Ingrese un precio unitario númerico, entero y positivo',
        });
        return;
      }
      if(!this.validarCampoCantidad(this.stock)){
        Swal.fire({
          icon: 'info',
          text: 'Ingrese una cantidad númerica, entera y positiva',
        });
        return;
      }
      this.productosService.insertarProductos(producto).subscribe(
        (data: any) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto ingresado exitosamente!',
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload();
          }, 800);
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al ingresar el producto!',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'info',
        text: 'Debe llenar todos los campos antes de ingresar un producto.',
      });
    }
  }
}
