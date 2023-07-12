import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido/pedido.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Pedido } from '../../../../../../models/pedido';

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
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe: any;

  visible: boolean = false;

  idSeleccionado:any;

  estados: Estados[] =[];
  estadoPedidoListar: any[] =[];
  estadoSelect: any;

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
}
