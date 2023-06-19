import { Component } from '@angular/core';
import { ProductosService } from 'src/app/service/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent {

  respuesta: any;
  productos: any[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
       this.productosService.listarProductos().subscribe(data =>{
        this.respuesta = data;
        this.productos = this.respuesta.product;
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

}
