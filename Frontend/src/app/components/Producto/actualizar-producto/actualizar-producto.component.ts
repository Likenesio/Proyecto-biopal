import { Component } from '@angular/core';
import { ProductosService } from 'src/app/service/productos-service/productos.service';
import Swal from 'sweetalert2';
//interfaces
interface Unidad {
  unidad: string;
}

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css'],
})
export class ActualizarProductoComponent {
  //Variables

  codigo_barra: any;
  nombre_producto: any;
  precio_unitario: any;
  unidad: any;
  stock: any;
  unidades: Unidad[] = [];

  selectedUnidad: any;
  productosListar: any[] = [];
  respuesta: any;
  productoSelect: any;
  respuestaBusqueda: any;
  seleccion: boolean = false;
  camposCompletos: boolean = false;

  //Llama al servicio de producto
  constructor(private productosService: ProductosService) {}

  //main
  ngOnInit() {
    this.unidades = [{ unidad: 'KG' }, { unidad: 'UD.' }];
    this.productosService.listarProductos().subscribe((date) => {
      this.respuesta = date;
      this.productosListar = this.respuesta.product;
    });
  }

  //funciones
  validarCamposCompletos() {
    this.camposCompletos =
      !!this.codigo_barra &&
      !!this.nombre_producto &&
      !!this.precio_unitario &&
      !!this.selectedUnidad &&
      !!this.stock;
  }

  cargarDatos() {
    this.seleccion = true;
    this.productosService
      .buscarProductos(this.productoSelect._id)
      .subscribe((data) => {
        this.respuestaBusqueda = data;
        this.codigo_barra = this.respuestaBusqueda.product.codigo_barra;
        this.nombre_producto = this.respuestaBusqueda.product.nombre_producto;
        this.precio_unitario = this.respuestaBusqueda.product.precio_unitario;
        this.unidad = this.respuestaBusqueda.product.unidad;
        this.stock = this.respuestaBusqueda.product.stock;
      });
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


  actualizar() {
    this.validarCamposCompletos();

    if (this.camposCompletos) {
      let producto = {
        codigo_barra: this.productoSelect.codigo_barra,
        nombre_producto: this.nombre_producto,
        precio_unitario: this.precio_unitario,
        unidad: this.selectedUnidad.unidad,
        stock: this.stock,
      };
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
      this.productosService
        .actualizarProductos(this.productoSelect._id, producto)
        .subscribe(
          (data) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Producto actualizado exitosamente!',
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
              text: 'Error al actualizar el producto!',
            });
          }
        );
    }else {
      Swal.fire({
        icon: 'info',
        text: 'Debe llenar todos los campos antes de actualizar el producto.',
      });
    }
  }
}
