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
seleccion: boolean=false;
pPSelect:any;
respuestaBusqueda:any
pSelect:any;



  constructor(
    private pedidoService: PedidoService,
    private pedidoProductoService: PedidoProductoService,
  ) { }

  ngOnInit(): void {

  }
  buscarDatosPP(){
    this.seleccion = true;
    this.pedidoProductoService.buscarPP(this.pPSelect._id).subscribe(
      data=>{
        this.respuestaBusqueda = data;
        this.producto= this.respuestaBusqueda.pp.codigo_barra;
        this.pedido=this.respuestaBusqueda.pp.numero_pedido;
      }
    )
  }
  buscarDatosP(){
    this.seleccion=true;
    this.pedidoService.buscarP(this.pSelect._id).subscribe(
      data=>{
        this.respuestaBusqueda=data;
        this.cliente=this.respuestaBusqueda.p.nombre_cliente;
        this.usuario=this.respuestaBusqueda.p.nombre_usuario;
      }
    )

  }
  generarPedido(){
    this.buscarDatosP();
    let pedido = {
      numero_pedido:this.numero_pedido,
      cliente:this.cliente.nombre_cliente,
      usuario:this.usuario.nombre_usuario,
     };
    this.pedidoService.insertPedido(pedido).subscribe(
    (data:any)=>{
      alert("Pedido creado exitosamente")
    },
    (error:any)=>{
      alert("Error al crear Pedido")
    }
  )
  this.buscarDatosPP();
  let pedido_producto = {
    producto:this.producto._id,
    pedido:this.pedido._id,
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

