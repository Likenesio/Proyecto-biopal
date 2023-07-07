import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido/pedido.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

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

  constructor(
    private pedidoService: PedidoService,
  ){}

  ngOnInit() {
   this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');

   this.pedidoService.listarP().subscribe((data)=>{
         this.respuesta =data;
         this.pedidosListar = this.respuesta.pedido;
         console.log("Pedidos",this.pedidosListar);
   })
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


}
