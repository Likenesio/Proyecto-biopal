import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido/pedido.service';
import { PedidoProductoService } from 'src/app/service/pedido_producto/pedidoproducto.service';
import { ClienteService } from '../../../service/cliente-service/cliente.service';
import { UsuarioService } from 'src/app/service/usuario-service/usuario.service';
import { ProductosService } from 'src/app/service/productos.service';
import { AuthService } from '../../../service/auth-service/auth.service';
import { formatDate } from '@angular/common';
import { NgIf, NgFor } from '@angular/common';
import {MatTableModule} from '@angular/material/table';



interface PedidoProducto {
  producto: string;
  cantidad_producto: Number;
  subtotal: Number;
}
interface Producto {
  nombre_producto: string;
  precio_unitario: number;
  unidad: string;
  cantidad: number;
}
interface Tabla {
  nombre_producto: string;
  precio_unitario: number;
  unidad: string;
  subtotal: number;
  cantidad: number;
}

interface Pedido {
  numero_pedido: number;
  cliente: string; //es la id de cliente
  usuario: string; //es la id de usuario
}

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent implements OnInit {
  numero_pedido: any;
  cliente: any;
  usuario: any;
  codigo_barra: any;
  pedido: any;
  cantidad_producto: any;
  subtotal: any;
  seleccion: boolean = false;
  pedidosProductosSelect: any;
  respuestaBusqueda: any;
  pedidosSelect: any;
  respuesta: any;
  pedidosListar: any[] = [];
  listarProductos: PedidoProducto[] = [];
  clienteSelect: any;
  clientesListar: any;
  productoEncontrado: any;
  listaTabla: Tabla[] = [];
  idPedido:any;
  total: number = 0;

  constructor(
    private pedidoService: PedidoService,
    private pedidoProductoService: PedidoProductoService,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
    private productosService: ProductosService,
    private authService: AuthService
  ) {}
  //cliente formulario
  ngOnInit(): void {
    this.clienteService.listarClientes().subscribe((data) => {
      this.respuesta = data;
      this.clientesListar = this.respuesta.client;
    });

    this.cantidad_producto = 1;
  }
  cargarCliente() {
    this.clienteService
      .buscarCliente(this.clienteSelect._id)
      .subscribe((data) => {
        this.respuestaBusqueda = data;
      });
  }

  //fin cliente formulario

  //Insertar Producto en la tabla de formulario de pedidos y lista productos en la tabla
  productoInsert() {
    this.productosService
      .obtenerPorCodigoBarras(this.codigo_barra)
      .subscribe((data) => {
        this.productoEncontrado = data.product;
        if(!this.listarProductos.some((producto)=> producto.producto === this.productoEncontrado._id)){
        this.listarProductos.push({
          producto: this.productoEncontrado._id,
          cantidad_producto: this.cantidad_producto,
          subtotal:this.cantidad_producto * this.productoEncontrado.precio_unitario,
        });
        this.listaTabla.push({
          nombre_producto: this.productoEncontrado.nombre_producto,
          precio_unitario: this.productoEncontrado.precio_unitario,
          unidad: this.productoEncontrado.unidad,
          subtotal:
            this.cantidad_producto * this.productoEncontrado.precio_unitario,
          cantidad: this.cantidad_producto,
        })}else{

          let indice = this.listarProductos.findIndex((item)=>( item.producto === this.productoEncontrado._id))
          this.listarProductos[indice].cantidad_producto = Number(this.listarProductos[indice].cantidad_producto) + this.cantidad_producto;
          this.listarProductos[indice].subtotal = Number(this.listarProductos[indice].cantidad_producto) * this.productoEncontrado.precio_unitario


          indice = this.listaTabla.findIndex((item)=>(item.nombre_producto === this.productoEncontrado.nombre_producto))
          this.listaTabla[indice].cantidad = Number(this.listaTabla[indice].cantidad) + this.cantidad_producto;
          this.listaTabla[indice].subtotal = Number(this.listaTabla[indice].cantidad) * this.productoEncontrado.precio_unitario



          console.log(this.total)

        };
        this.total = this.listarProductos.filter(producto=>producto.subtotal)
        .reduce((sum:any, producto)=> sum + producto.subtotal, 0)
        this.codigo_barra = null;
      });

  }

  realizarPedido() {
    let total = this.listarProductos.filter(producto=>producto.subtotal)
    .reduce((sum:any, producto)=> sum + producto.subtotal, 0)
    let idUser = this.authService.obtenerIdUsuario();
    let pedido = {
      cliente: this.clienteSelect._id,
      usuario: idUser, // rescatar usuario logeado en el sistema token
      fecha: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      estado: 'En proceso',
      total: total
    };
    console.log(pedido)
    this.pedidoService.insertPedido(pedido).subscribe(
      (data) => {
        alert('Pedido creado exitosamente');
        console.log(data);
        this.idPedido = data.p._id;
        this.listarProductos.forEach((productoP)=>{
          let productoPedido={
            producto: productoP.producto,
            pedido: this.idPedido,
            cantidad_producto: productoP.cantidad_producto,
            subtotal: productoP.subtotal
          }
          this.pedidoProductoService.insertPedidoProducto(productoPedido).subscribe(
            data=>{
              console.log("producto insertado a pedido")
            }
          )
        })
        //limpieza datos del formulario
        this.listarProductos = [];
        this.codigo_barra = null;
        this.cantidad_producto = 1;
        this.clienteSelect = [];
        this.listaTabla = [];
        this.total = 0

      },
      (error) => {
        console.log(error)
        alert('error al crear pedido');
      }
      );

  }


}
