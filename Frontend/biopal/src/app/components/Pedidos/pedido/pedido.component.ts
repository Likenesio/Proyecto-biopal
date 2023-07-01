import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido/pedido.service';
import { PedidoProductoService } from 'src/app/service/pedido_producto/pedidoproducto.service';
import { ClienteService } from '../../../service/cliente-service/cliente.service';
import { UsuarioService } from 'src/app/service/usuario-service/usuario.service';
import { ProductosService } from 'src/app/service/productos.service';


 interface pedidoProducto{
  producto: string;
  cantidad_produto:Number;
  subtotal:Number;
}
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
cantidad_producto: any;
subtotal:any;
seleccion: boolean=false;
pPSelect:any;
respuestaBusqueda:any
pSelect:any;
respuesta: any;
pListar: any [] =[];
listarProductos: pedidoProducto [] = [];


constructor(
    private pedidoService: PedidoService,
    private pedidoProductoService: PedidoProductoService,
    private clienteService:ClienteService,
    private usuarioService:UsuarioService,
    private productosService:ProductosService
  ) { }
  rescatarProducto(id:any){
    this.productosService.buscarProductos(id).subscribe(
      data =>{
        console.log(data);
        return data.product;

      }
    )
  }
  pedProductoInsert() {
    if (this.producto && this.cantidad_producto && this.subtotal) {
      this.listarProductos.push({
        producto: this.producto._id,
        cantidad_produto: this.cantidad_producto, 
        subtotal: this.subtotal
      });
      console.log(this.listarProductos);

      // Limpiar los valores después de agregar el producto
      this.producto = null;
      this.cantidad_producto = null;
      this.subtotal = null;
    }
  }
  pedidoProductoInsert(){
    this.listarProductos.push({producto: this.producto._id, cantidad_produto:this.cantidad_producto, subtotal:this.subtotal})
    console.log(this.listarProductos)
  }

  ngOnInit(): void {


    this.clienteService.listarClientes().subscribe(
      (data) => {
        this.respuesta=data;
        this.pListar = this.respuesta.client;

      })

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
        this.cliente=this.respuestaBusqueda.client.nombre_cliente;
        this.usuario=this.respuestaBusqueda.usuario.nombre_usuario;
        this.numero_pedido=this.respuestaBusqueda.p.numero_pedido;
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

