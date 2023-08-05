import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido/pedido.service';
import { PedidoProductoService } from 'src/app/service/pedido_producto/pedidoproducto.service';
import { ClienteService } from '../../../service/cliente-service/cliente.service';
import { ProductosService } from 'src/app/service/productos-service/productos.service';
import { AuthService } from '../../../service/auth-service/auth.service';
import { formatDate } from '@angular/common';
import { BoletaService } from 'src/app/service/boleta-service/boleta.service';
import { FacturaService } from 'src/app/service/factura-service/factura.service';
import Swal from 'sweetalert2';

interface PedidoProducto {
  producto: string;
  cantidad_producto: Number;
  subtotal: Number;
}
interface ProductoBoleta {
  productoId: String;
  cantidad: Number;
  precio: Number;
  nombre_producto: string;
  codigo_barras: String;
}
interface ProductoFactura {
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
interface Modo_pago {
  modo_pago: string;
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

  boolean:boolean = false;
  modo_pagos: Modo_pago[] = [];
  modo_pago: any;
  selectedMedioPago: any;

  pedidoNuevo: any[] = [];

  //Modal
  visible: boolean = false;

  constructor(
    private pedidoService: PedidoService,
    private pedidoProductoService: PedidoProductoService,
    private clienteService: ClienteService,
    private productosService: ProductosService,
    private boletaService: BoletaService,
    private authService: AuthService,
    private facturaService: FacturaService
  ) {}
  //cliente formulario
  ngOnInit(): void {
    this.clienteService.listarClientes().subscribe((data) => {
      this.respuesta = data;
      this.clientesListar = this.respuesta.client;
      this.clienteSelect = this.clientesListar.filter(
        (cliente: any) => cliente.nombre_cliente == 'n/n'
      )[0];
    });

    this.cantidad_producto = 1;

    this.modo_pagos = [
      { modo_pago: 'Efectivo' },
      { modo_pago: 'Crédito' },
      { modo_pago: 'Débito' },
    ];
  }
  cargarCliente() {
    this.clienteService
      .buscarCliente(this.clienteSelect._id)
      .subscribe((data) => {
        this.respuestaBusqueda = data;
      });
  }

  validarProductos(): boolean {
    if (this.listarProductos.length === 0) {
      Swal.fire({
        icon: 'info',
        text: 'Debe ingresar al menos un producto para realizar el pedido',
      });
      return false;
    }
    return true;
  }

  //Insertar Producto en la tabla de formulario de pedidos y lista productos en la tabla
  productoInsert() {
    this.productosService.obtenerPorCodigoBarras(this.codigo_barra).subscribe(
      (data) => {
        this.productoEncontrado = data.product;
        if (
          !this.listarProductos.some(
            (producto) => producto.producto === this.productoEncontrado._id
          )
        ) {
          // Verificar si hay suficiente stock para el producto
          if (this.productoEncontrado.stock < this.cantidad_producto) {
            Swal.fire({
              icon: 'info',
              text: 'No hay suficiente stock para el producto: ' +
              this.productoEncontrado.nombre_producto,
            });
            this.codigo_barra = null;
            return;
          }

          // Agregar el producto a la lista de productos del pedido
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
          // Verificar si hay suficiente stock para el producto
          let indice = this.listarProductos.findIndex(
            (item) => item.producto === this.productoEncontrado._id
          );
          if (
            this.productoEncontrado.stock <
            this.cantidad_producto +
              this.listarProductos[indice].cantidad_producto
          ) {

            Swal.fire({
              icon: 'info',
              text: 'No hay suficiente stock para el producto: ' +
              this.productoEncontrado.nombre_producto,
            });
            this.codigo_barra = null;
            return;
          }

          // Actualizar la cantidad y subtotal del producto en la lista de productos del pedido
          this.listarProductos[indice].cantidad_producto +=
            this.cantidad_producto;
          this.listarProductos[indice].subtotal =
            Number(this.listarProductos[indice].cantidad_producto) *
            this.productoEncontrado.precio_unitario;

          // Actualizar la cantidad y subtotal del producto en la lista de la tabla
          indice = this.listaTabla.findIndex(
            (item) =>
              item.nombre_producto === this.productoEncontrado.nombre_producto
          );
          this.listaTabla[indice].cantidad += this.cantidad_producto;
          this.listaTabla[indice].subtotal =
            this.listaTabla[indice].cantidad *
            this.productoEncontrado.precio_unitario;
        }
        this.total = this.listarProductos
          .filter((producto) => producto.subtotal)
          .reduce((sum: any, producto) => sum + producto.subtotal, 0);
        this.codigo_barra = null;
      },
      (err) => {
        this.codigo_barra = null;
      }
    );
  }
  realizarBoleta() {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al emitir la boleta',
      });
    this.validarProductos()
    let productos: ProductoBoleta[] = [];
    //Insertar productos para que se muestren en la boleta con su precio
    this.listaTabla.forEach((productoP) => {
      let productoBoleta = {
        productoId: productoP.id,
        cantidad: productoP.cantidad, //llamar como documentacion
        precio: Number(productoP.subtotal) / Number(productoP.cantidad),
        nombre_producto: productoP.nombre_producto,
        codigo_barras: productoP.codigo_barras,
      };
      //console.log("ProductosP: ", productoP)
      productos.push(productoBoleta);
    });
    //console.log("Datos Boleta 1: ", this.listaTabla)
    let boleta = {
      productos: productos,
      fecha_emision: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      pedido: this.idPedido, //cambiar por --------------------------> medio de pago seleccionado antes de realizar pedido
      cliente: this.clienteSelect._id,
      total: this.total,
      estado: 'En proceso',
    };
    //console.log("Datos Boleta 2: ", boleta)

    this.boletaService.crearBoleta(boleta).subscribe(
      (data) => {
        Swal.fire({ icon: 'success', text: 'Boleta emitida exitosamente' });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al emitir la boleta',
          footer: err,
        });
      }
    );
    this.limpiezaForm();

    this.pedidoNuevo = [];
    this.visible = false;
}
  realizarFactura() {
    this.validarProductos()
    let productos: ProductoFactura[] = [];
    //Insertar productos para que se muestren en la boleta con su precio
    this.listaTabla.forEach((productoP) => {
      let productoFactura = {
        productoId: productoP.id,
        cantidad: productoP.cantidad,
        precio: Number(productoP.subtotal) / Number(productoP.cantidad),
        nombre_producto: productoP.nombre_producto,
        codigo_barras: productoP.codigo_barras,
      };
      productos.push(productoFactura);
    });
    let factura = {
      productos: productos,
      fecha_emision: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      pedido: this.idPedido, //medio_pago seleccionado antes de realizar pedido
      cliente: this.clienteSelect._id,
      total: this.total,
      estado: 'En proceso',
    };
    this.facturaService.crearFactura(factura).subscribe(
      (data) => {
        Swal.fire({ icon: 'success', text: 'Factura emitida exitosamente' });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al emitir la factura',
          footer: err,
        });
      }
    );
    this.limpiezaForm(); //llama a la funcion limpiezaForm() para vaciar el formulario

    this.pedidoNuevo = [];
    this.visible = false;
  }

  emitirBoleta() {
    setTimeout(() => {
      this.realizarPedido();
    }, 100);
    setTimeout(() => {
      this.realizarBoleta();
    }, 1500);
  }

  emitirFactura() {
    setTimeout(() => {
      this.realizarPedido();
    }, 100);
    setTimeout(() => {
      this.realizarFactura();
    }, 1500);
  }

  //Mostrar modal
  showDialog() {
    this.visible = true;
  }

  realizarPedido() {
    if (this.listarProductos.length > 0) {
      let total = this.listarProductos
        .filter((producto) => producto.subtotal)
        .reduce((sum: any, producto) => sum + producto.subtotal, 0);
      let idUser = this.authService.obtenerIdUsuario();
      let pedido = {
        cliente: this.clienteSelect._id,
        modo_pago: this.selectedMedioPago.modo_pago,
        usuario: idUser,
        fecha: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
        estado: 'En proceso',
        total: total,
      };
      this.validarProductos()

      if(this.validarProductos()){
      this.pedidoService.insertPedido(pedido).subscribe(
        (data) => {
          Swal.fire({ icon: 'success', text: 'Pedido creado exitosamente' });
          this.idPedido = data.p._id;
          this.pedidoNuevo.push(data.p);
          //console.log('Push pedido nuevo: ', this.pedidoNuevo);
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
                // console.log('producto insertado a pedido');
              });

            // Restar cantidades del producto en la base de datos
            this.productosService
              .restarCantidadesProductos(
                productoP.producto,
                Number(productoP.cantidad_producto)
              )
              .subscribe(
                () => {
                  //console.log('Cantidad restada del producto en la base de datos', productoP.producto,productoP.cantidad_producto);
                },
                (error) => {
                  //console.log('Error al restar cantidades del producto en la base de datos', error);
                }
              );
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al emitir la boleta',
            footer: error,
          });
        }
      );
      }
    } else {
      Swal.fire({
        icon: 'info',
        text: 'Debe ingresar al menos un producto para realizar el pedido'
      });
    }
  }
  //Limpiar formulario
  limpiezaForm() {
    // Limpieza datos del formulario y variables
    this.listarProductos = [];
    this.codigo_barra = null;
    this.cantidad_producto = 1;
    this.clienteSelect = [];
    this.selectedMedioPago = [];
    this.listaTabla = [];
    this.total = 0;
  }
}
