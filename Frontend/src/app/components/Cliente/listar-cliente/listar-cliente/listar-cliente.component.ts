import { Component } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente-service/cliente.service';
import { PedidoService } from 'src/app/service/pedido/pedido.service';
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
  pedidos:any;
  idCliente: any[]=[];
  private _location: any;


  constructor(private clienteService: ClienteService, private pedidoService: PedidoService) { }

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
     


this.pedidoService.listarP().subscribe((data) => {
  this.pedidos = data.pedido;
  console.log("Pedidos: ", this.pedidos);

  // Crear un array para almacenar los IDs de los clientes
  const clientesIDs = [];

  // Iterar a través de los pedidos
  for (const pedido of this.pedidos) {
    // Verificar si hay clientes en el pedido
    if (pedido.cliente && pedido.cliente.length > 0) {
      // Obtener el ID del primer cliente en el pedido
      const clienteID = pedido.cliente[0]._id;
      clientesIDs.push(clienteID); // Agregar el ID a la matriz
    }
  }

  console.log("IDs de Clientes: ", clientesIDs);
});


}

eliminar(id: string) {
  // Primero, verifica si el cliente tiene pedidos asociados
  this.pedidoService.listarP().subscribe((data) => {
    const pedidos = data.pedido;

    // Verificar si hay algún pedido asociado al cliente
    const tienePedidosAsociados = pedidos.some((pedido:any) => {
      return pedido.cliente[0]._id === id;
    });

    if (tienePedidosAsociados) {
      // Mostrar un mensaje de error indicando que el cliente tiene pedidos asociados
      Swal.fire({
        title: 'No se puede eliminar el cliente',
        text: 'El cliente tiene pedidos asociados.',
        icon: 'error',
      });
    } else {
      // Mostrar el cuadro de confirmación de eliminación
      Swal.fire({
        title: '¿Estás seguro de eliminar al cliente?',
        text: '¡No podrás revertirlo!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
      }).then((result) => {
        if (result.isConfirmed) {
          // Realizar la eliminación del cliente
          this.clienteService.eliminarCliente(id).subscribe((data) => {
            Swal.fire('Eliminado', 'El cliente ha sido eliminado.', 'success');
            setTimeout(() => {
              window.location.reload();
            }, 800);
          });
        }
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
