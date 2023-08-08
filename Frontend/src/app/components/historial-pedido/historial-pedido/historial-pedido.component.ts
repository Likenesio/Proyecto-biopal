import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido/pedido.service';
import { DatePipe } from '@angular/common';

export interface Detalle{
  nombre_usuario: string;
  nombre_cliente:string;
  fecha: Date;
  numero_pedido:number;
  }

@Component({
  selector: 'app-historial-pedido',
  templateUrl: './historial-pedido.component.html',
  styleUrls: ['./historial-pedido.component.css']
})
export class HistorialPedidoComponent implements OnInit {
  respuesta:any;
  pedidosListar: [] = [];
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe: any;
  startDate = new Date();
  maxDate = new Date()
  listarPedido: Detalle []=[]

  first = 0;
  rows = 10;




  constructor(private pedidoService: PedidoService) {
    this.startDate = new Date(); // Establecer la fecha de inicio en la fecha actual
    // Obtener el mes y año actual
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Establecer el máximo rango de fecha permitido
    this.maxDate = new Date(currentYear, currentMonth);

  }

  ngOnInit() {

    this.todayWithPipe = this.pipe.transform(Date.now(), 'MM/yyyy');

    this.pedidoService.listarP().subscribe((data)=>{
          this.respuesta =data;
          this.pedidosListar = this.respuesta.pedido;
        })
        this.pedidoService.listarP().subscribe((data)=>{
          this.respuesta =data.pedido;
          this.respuesta.map((pedido:any) => {
           this.listarPedido.push({
             numero_pedido: pedido.numero_pedido,
             nombre_usuario:pedido.usuario[0].nombre_usuario,
             nombre_cliente:pedido.cliente[0].nombre_cliente,
             fecha: pedido.fecha,
           });
          })
        })
  }


      buscarPedidosPorMesYAnio() {
        // Obtener el mes y año seleccionados
        const selectedDate = new Date(this.startDate);
        const selectedYear = selectedDate.getFullYear();
        const selectedMonth = selectedDate.getMonth();

        // Filtrar los pedidos en base al mes y año seleccionados
        this.pedidosListar = this.respuesta.pedido.filter((pedido: any) => {
          const fechaPedido = new Date(pedido.fecha);
          return fechaPedido.getFullYear() === selectedYear && fechaPedido.getMonth() === selectedMonth;
        });
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
