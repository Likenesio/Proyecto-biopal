import { Component, OnInit } from '@angular/core';
import { PedidoProductoService } from 'src/app/service/pedido_producto/pedidoproducto.service';
import { ActivatedRoute, Params } from '@angular/router';
import { PedidoService } from 'src/app/service/pedido/pedido.service';
import { formatDate } from '@angular/common';
import { Location } from '@angular/common';


@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {

  respuesta: any;
  listarDetallePedido: []=[];
  idPedido: any

  numero_pedido:any;
  vendedor:any;
  cliente:any;
  total:any;
  date:any;
  status:any;

  nombre_producto: any;
  cantidad_producto:any;
  subtotal: any;
  precioUnitario:any;

  constructor(private _location: Location, private pedidoService:PedidoService, private activateRoute:ActivatedRoute,private pedidoProductoService: PedidoProductoService) { }

  ngOnInit() {

  this.idPedido = this.activateRoute.snapshot.paramMap.get('pedido');
  this.pedidoService.buscarP(this.idPedido).subscribe((data)=>{
    this.numero_pedido = data.p.numero_pedido;
    this.vendedor=data.p.usuario[0].nombre_usuario;
    this.cliente=data.p.cliente[0].nombre_cliente;
    this.total=data.p.total;
    this.date = formatDate(data.p.fecha, 'yyyy-MM-dd', 'en-US');
    this.status = data.p.estado;
  })

  this.pedidoProductoService.buscarIdPedido(this.idPedido).subscribe((data)=>{
    //console.log(data)
    this.listarDetallePedido = data.pedido_producto;
    console.log(this.listarDetallePedido)

  })




  }
  goBack(){
    this._location.back();
  }

}
