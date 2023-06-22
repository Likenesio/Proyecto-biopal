import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido/pedido.service';
import { PedidoProductoService } from 'src/app/service/pedido_producto/pedidoproducto.service';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
numero_pedido: any;
cliente: any;
usuario: any;
producto:any;
pedido:any;
cantidad_producto:any;
subtotal:any;


  constructor(
    private pedidoService: PedidoService,
    private pedidoProductoService: PedidoProductoService
  ) { }

  ngOnInit(): void {

  }
  generarPedido(){
    let pedido = {
      numero_pedido:this.numero_pedido,
      cliente:this.cliente,
      usuario:this.usuario,
     };
    this.pedidoService.insertPedido(pedido).subscribe(
    (data:any)=>{
      alert("Pedido creado exitosamente")
    },
    (error:any)=>{
      alert("Error al crear Pedido")
    }
  )
  let pedido_producto = {
    producto:this.pedido_producto.producto.codigo_barras,
    pedido:this.pedido,
    cantidad_producto:this.cantidad_producto,
    subtotal:this.subtotal
  };
  this.pedidoProductoService.insertPedidoProducto(pedido_producto).subscribe(
    (data:any)=>{
      alert("Pedido creado exitosamente");
    },
    (error:any)=>{
      alert("Error al crear pedido")
    }
  )
}
}

