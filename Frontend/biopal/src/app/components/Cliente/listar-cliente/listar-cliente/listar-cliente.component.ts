import { Component } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente-service/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent {

  respuesta: any;
  clientes : any[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
     this.clienteService.listarClientes().subscribe(data=>{
      this.respuesta = data;
      this.clientes = this.respuesta.client;
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
        this.clienteService.eliminarCliente(id).subscribe(data => {
          Swal.fire('¡Realizado!', '', 'success');
          window.location.reload();
        });
      } else if (result.isDenied) {
        Swal.fire('No se ha eliminado cliente', '', 'info');
      }
    });
  }

}
