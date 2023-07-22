import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido/pedido.service';
import { DatePipe } from '@angular/common';



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

    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');

    this.pedidoService.listarP().subscribe((data)=>{
          this.respuesta =data;
          this.pedidosListar = this.respuesta.pedido;
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

}
