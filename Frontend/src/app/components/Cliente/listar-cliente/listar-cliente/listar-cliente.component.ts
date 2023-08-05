import { Component } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente-service/cliente.service';
import Swal from 'sweetalert2';

export interface Cliente{
  rut: String;
  nombre_cliente: String;
  contacto: String;
  email: String;
  direccion: String;
  comuna: String;
}
@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent {

  respuesta: any;
  clientes : any[] = [];

  listarClientes: Cliente[] = [];
  first = 0;
  rows = 10;


  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
     this.clienteService.listarClientes().subscribe(data=>{
      this.respuesta = data;
      this.clientes = this.respuesta.client;
     });

     this.clienteService.listarClientes().subscribe((data)=>{
      this.respuesta = data.client;
      this.respuesta.map((cliente:any)=>{
        this.listarClientes.push({
          rut: cliente.rut,
          nombre_cliente: cliente.nombre_cliente,
          contacto: cliente.contacto,
          email: cliente.email,
          direccion:cliente.direccion,
          comuna: cliente.comuna
        });
      })
     })


  }

  eliminar(id: string) {
    Swal.fire({
      title: 'Estas seguro de eliminar al cliente?',
      text: "No podras revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.eliminarCliente(id).subscribe(data => {
        Swal.fire(
          'Eliminado!',
          'El cliente ha sido eliminado.',
          'success'
        )
        setTimeout(() => {
          window.location.reload();
        }, 800);
       });
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
    return this.listarClientes ? this.first === this.listarClientes.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.listarClientes ? this.first === 0 : true;
  }

}
