import { ChangeDetectorRef, Component } from '@angular/core';
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
  listarProductosFiltrados: Producto[] = [];
  nombreProductoFiltro: string = '';

  first = 0;
  rows = 10;
  nameProduct:any;
  
  constructor(private productosService: ProductosService,   private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.nameProduct = this.productosListar;
       this.productosService.listarProductos().subscribe(data =>{
        this.respuesta = data;
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
       })

      })
 }

 eliminar(id: string) {
  Swal.fire({
    title: 'Estas seguro de eliminar el producto?',
    text: "No podras revertirlo!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.productosService.eliminarProductos(id).subscribe(data => {
      Swal.fire(
        'Eliminado!',
        'El producto ha sido eliminado.',
        'success'
      )
      setTimeout(() => {
        window.location.reload();
      }, 800);
     });
    }
  });
}


buscarProductosPorNombre() {
  if (this.nombreProductoFiltro) {
    this.productosService.buscarProducto(this.nombreProductoFiltro)
      .subscribe(
        (response) => {
          this.listarProductosFiltrados = response.product.map((producto: any) => {
            return {
              codigo_barra: producto.codigo_barra,
              nombre_producto: producto.nombre_producto,
              stock: producto.stock,
              precio_unitario: producto.precio_unitario,
              unidad: producto.unidad,
            };
          });
          console.log(this.listarProductosFiltrados);
        },
        (error) => {
          console.error('Error al buscar productos por nombre', error);
        }
      );
  }
}

buscarProductos() {
  this.nameProduct = this.productosListar;
  if (this.nombreProductoFiltro) {
    this.nameProduct = this.productosListar.filter(producto =>
      producto.nombre_producto.toLowerCase().includes(this.nombreProductoFiltro.toLowerCase())
    );
    } else {
    this.nameProduct = this.productosListar;
  }
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
