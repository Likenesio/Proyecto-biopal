import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido/pedido.service';
import { PedidoProductoService } from 'src/app/service/pedido_producto/pedidoproducto.service';
import { ClienteService } from '../../../service/cliente-service/cliente.service';
import { UsuarioService } from 'src/app/service/usuario-service/usuario.service';
import { ProductosService } from 'src/app/service/productos-service/productos.service';
import { AuthService } from '../../../service/auth-service/auth.service';
import { formatDate } from '@angular/common';
import { BoletaService } from 'src/app/service/boleta-service/boleta.service';


interface PedidoProducto {
  producto: string;
  cantidad_producto: Number;
  subtotal: Number;
}
interface ProductoBoleta{
  productoId: String;
  cantidad: Number;
  precio: Number;
  nombre_producto: string;
  codigo_barras: String;
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
  id: string;
  codigo_barras: string;
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
  idPedido: any;
  total: number = 0;

  //Modal
  visible: boolean = false;

  constructor(
    private pedidoService: PedidoService,
    private pedidoProductoService: PedidoProductoService,
    private clienteService: ClienteService,
    private productosService: ProductosService,
    private boletaService: BoletaService,
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
        if (
          !this.listarProductos.some(
            (producto) => producto.producto === this.productoEncontrado._id
          )
        ) {
          this.listarProductos.push({
            producto: this.productoEncontrado._id,
            cantidad_producto: this.cantidad_producto,
            subtotal:
              this.cantidad_producto * this.productoEncontrado.precio_unitario,
          });
          this.listaTabla.push({
            nombre_producto: this.productoEncontrado.nombre_producto,
            precio_unitario: this.productoEncontrado.precio_unitario,
            unidad: this.productoEncontrado.unidad,
            subtotal:
              this.cantidad_producto * this.productoEncontrado.precio_unitario,
            cantidad: this.cantidad_producto,
            id: this.productoEncontrado._id,
            codigo_barras: this.productoEncontrado.codigo_barra,
          });
        } else {
          let indice = this.listarProductos.findIndex(
            (item) => item.producto === this.productoEncontrado._id
          );
          this.listarProductos[indice].cantidad_producto =
            Number(this.listarProductos[indice].cantidad_producto) +
            this.cantidad_producto;
          this.listarProductos[indice].subtotal =
            Number(this.listarProductos[indice].cantidad_producto) *
            this.productoEncontrado.precio_unitario;

          indice = this.listaTabla.findIndex(
            (item) =>
              item.nombre_producto === this.productoEncontrado.nombre_producto
          );
          this.listaTabla[indice].cantidad =
            Number(this.listaTabla[indice].cantidad) + this.cantidad_producto;
          this.listaTabla[indice].subtotal =
            Number(this.listaTabla[indice].cantidad) *
            this.productoEncontrado.precio_unitario;
        }
        this.total = this.listarProductos
          .filter((producto) => producto.subtotal)
          .reduce((sum: any, producto) => sum + producto.subtotal, 0);
        this.codigo_barra = null;
      },
      err =>{
        this.codigo_barra = null;
      });
  }
/*
  realizarPedido() {
    if (this.listarProductos.length > 0) {
      let total = this.listarProductos
        .filter((producto) => producto.subtotal)
        .reduce((sum: any, producto) => sum + producto.subtotal, 0);
      let idUser = this.authService.obtenerIdUsuario();
      let pedido = {
        cliente: this.clienteSelect._id,
        usuario: idUser, // rescatar usuario logeado en el sistema token
        fecha: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
        estado: 'En proceso',
        total: total,
      };
      //console.log(pedido);
      this.pedidoService.insertPedido(pedido).subscribe(
        (data) => {
          alert('Pedido creado exitosamente');
          //console.log(data);
          this.idPedido = data.p._id;
          this.listarProductos.forEach((productoP) => {
            let productoPedido = {
              producto: productoP.producto,
              pedido: this.idPedido,
              cantidad_producto: productoP.cantidad_producto,
              subtotal: productoP.subtotal,
            };
            //operación restar stock --------------------->
            //falta implementar
            this.pedidoProductoService
              .insertPedidoProducto(productoPedido)
              .subscribe((data) => {
                console.log('producto insertado a pedido');
              });

          });
          //limpieza datos del formulario
          this.listarProductos = [];
          this.codigo_barra = null;
          this.cantidad_producto = 1;
          this.clienteSelect = [];
          this.listaTabla = [];
          this.total = 0;
        },
        (error) => {
          console.log(error);
          alert('error al crear pedido');
        }
      );
    } else {
      alert('Debe ingresar al menos un producto para crear el pedido.');
    }
  }
*/
realizarPedido() {
  if (this.listarProductos.length > 0) {
    let total = this.listarProductos
      .filter((producto) => producto.subtotal)
      .reduce((sum: any, producto) => sum + producto.subtotal, 0);
    let idUser = this.authService.obtenerIdUsuario();
    let pedido = {
      cliente: this.clienteSelect._id,
      usuario: idUser,
      fecha: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      estado: 'En proceso',
      total: total,
    };

    this.pedidoService.insertPedido(pedido).subscribe(
      (data) => {
        alert('Pedido creado exitosamente');
        this.idPedido = data.p._id;

        // Iterar por los productos del pedido para restar cantidades
        this.listarProductos.forEach((productoP) => {
          let productoPedido = {
            producto: productoP.producto,
            pedido: this.idPedido,
            cantidad_producto: productoP.cantidad_producto,
            subtotal: productoP.subtotal,
          };

          // Insertar el producto en el pedido
          this.pedidoProductoService
            .insertPedidoProducto(productoPedido)
            .subscribe((data) => {
              console.log('producto insertado a pedido');
            });

          // Restar cantidades del producto en la base de datos
          this.productosService.restarCantidadesProductos(productoP.producto, Number(productoP.cantidad_producto))
            .subscribe(() => {

              console.log('Cantidad restada del producto en la base de datos', productoP.producto,productoP.cantidad_producto);
            }, (error) => {
              console.log('Error al restar cantidades del producto en la base de datos', error);
            });
        });

        // Limpieza datos del formulario y variables
        this.listarProductos = [];
        this.codigo_barra = null;
        this.cantidad_producto = 1;
        this.clienteSelect = [];
        this.listaTabla = [];
        this.total = 0;
      },
      (error) => {
        console.log(error);
        alert('error al crear pedido');
      }
    );
  } else {
    alert('Debe ingresar al menos un producto para crear el pedido.');
  }
}



  emitirBoleta() {
    let productos: ProductoBoleta[] = [];
    //Insertar productos para que se muestren en la boleta con su precio
    this.listaTabla.forEach((productoP) => {
      let productoBoleta = {
        productoId: productoP.id,
        cantidad: productoP.cantidad,
        precio: (Number(productoP.subtotal)/Number(productoP.cantidad)),
        nombre_producto: productoP.nombre_producto,
        codigo_barras: productoP.codigo_barras,

      };
      productos.push(productoBoleta);
    });


    let boleta = {
      productos: productos,
      fecha_emision: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      modo_pago: 'Efectivo',
      cliente: this.clienteSelect._id,
      total: this.total,
      estado: 'En proceso'
    }
    console.log(boleta)
    this.boletaService.crearBoleta(boleta).subscribe(data => {
      alert('Boleta emitida exitosamente');
    }, err => {
      alert('Error al emitir boleta');
      console.log("error al emitir boleta ",err);

    })
    this.realizarPedido();
    this.visible = false;
  }
  //Mostrar modal
  showDialog() {
    this.visible = true;
}

}
