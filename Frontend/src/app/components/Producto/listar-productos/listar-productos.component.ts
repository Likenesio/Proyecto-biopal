import { Component } from '@angular/core';
import { ProductosService } from 'src/app/service/productos-service/productos.service';
import Swal from 'sweetalert2';


export interface Producto{
  codigo_barra: number;
  nombre_producto: String;
  stock: number;
  precio_unitario:number ;
  unidad: String;
 }

@Component({
  selector: 'listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent {

  respuesta: any;
  productosListar: any[] = [];
  listarProductos: Producto[] = [];

  first = 0;
  rows = 10;

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
       this.productosService.listarProductos().subscribe(data =>{
        this.respuesta = data;
        console.log(this.respuesta)
        this.productosListar = this.respuesta.product;
       })

       this.productosService.listarProductos().subscribe((data)=>{
        this.respuesta=data.product;
        this.respuesta.map((producto:any) => {
          this.listarProductos.push({
            codigo_barra: producto.codigo_barra,
            nombre_producto: producto.nombre_producto,
            stock: producto.stock,
            precio_unitario:producto.precio_unitario,
            unidad: producto.unidad,
          });
          console.log(this.listarProductos);
       })

      })
 }

 eliminar(id: string) {
  Swal.fire({
    title: '¿Seguro desea eliminar al cliente?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    denyButtonText: 'Denegar',
  }).then((result) => {
    if (result.isConfirmed) {
      this.productosService.eliminarProductos(id).subscribe(data => {
        Swal.fire('¡Realizado!', '', 'success');
        window.location.reload();
      });
    } else if (result.isDenied) {
      Swal.fire('No se ha eliminado producto', '', 'info');
    }
  });
}

next() {
  this.first = this.first + this.rows;
}

prev() {
  this.first = this.first - this.rows;
}

reset() {
  this.first = 0;
}

isLastPage(): boolean {
  return this.listarProductos ? this.first === this.listarProductos.length - this.rows : true;
}

isFirstPage(): boolean {
  return this.listarProductos ? this.first === 0 : true;
}


}
