import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido/pedido.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

export interface Detalle{
 nombre_usuario: string;
 nombre_cliente:string;
 estado: string;
 fecha: Date;
 numero_pedido:number;
 }
interface Estados{
  estado:string;
}
@Component({
  selector: 'app-listar-pedido',
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.css']
})
export class ListarPedidoComponent implements OnInit {

  respuesta: any;
  pedidosListar: []=[];
  listarPedido: Detalle []=[]
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe: any;

  visible: boolean = false;

  idSeleccionado:any;

  estados: Estados[] =[];
  estadoPedidoListar: any[] =[];
  estadoSelect: any;

  first = 0;
  rows = 10;

  constructor(
    private pedidoService: PedidoService,
  ){}

  ngOnInit() {
   this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');

   this.pedidoService.listarP().subscribe((data)=>{
         this.respuesta =data;
         this.pedidosListar = this.respuesta.pedido;
         this.estadoPedidoListar = this.respuesta.pedido
   })


   this.pedidoService.listarP().subscribe((data)=>{
    this.respuesta =data.pedido;
    console.log(this.respuesta);
    this.respuesta.map((pedido:any) => {
     this.listarPedido.push({
       nombre_usuario:pedido.usuario[0].nombre_usuario,
       nombre_cliente:pedido.cliente[0].nombre_cliente,
       numero_pedido: pedido.numero_pedido,
       fecha: pedido.fecha,
       estado: pedido.estado
     });
     console.log(this.pedidosListar);
    })
})

   this.estados=[
    {estado: 'Esperando ser preparado'},
    {estado: 'Preparando'},
    {estado:'En camino'},
    {estado: 'Entregado'},
    {estado: 'Anulado'},
    {estado:'Finalizada'}];
  }

  actualizarEstadoPedido(){
    console.log(this.estadoSelect)
    console.log(this.idSeleccionado)
    let pedido = {
      estado : this.estadoSelect.estado
    }
    this.pedidoService.actualizarPedido(this.idSeleccionado, pedido).subscribe((data)=>{
      alert("Actualización de estado del pedido exitosa");
    }, err=>{alert("Error al actualizar estado del pedido")})
    console.log(this.estadoSelect.estado)
    this.visible = false;
    window.location.reload();
  }


  eliminar(id: string) {
    Swal.fire({
      title: '¿Seguro desea eliminar al pedido?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Denegar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoService.eliminarPedido(id).subscribe(data => {
          Swal.fire('¡Realizado!', '', 'success');
          window.location.reload();
        });
      } else if (result.isDenied) {
        Swal.fire('No se ha eliminado pedido', '', 'info');
      }
    });
  }

  showDialog(id: String) {
    this.visible = true;

    this.idSeleccionado = id;
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
  return this.listarPedido ? this.first === this.listarPedido.length - this.rows : true;
}

isFirstPage(): boolean {
  return this.listarPedido ? this.first === 0 : true;
}

}
