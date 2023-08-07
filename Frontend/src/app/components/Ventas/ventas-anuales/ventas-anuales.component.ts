import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido/pedido.service';
import { ChartDataset } from 'chart.js';

interface TotalVentasPorMes {
  [key: number]: number;
}
@Component({
  selector: 'app-ventas-anuales',
  templateUrl: './ventas-anuales.component.html',
  styleUrls: ['./ventas-anuales.component.css']
})
export class VentasAnualesComponent implements OnInit {
  ventasPorMes: any[] =[];
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels: string[] = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  resultado:any;
  pedido:any
  totalVentasPorMes: TotalVentasPorMes = {};

  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.obtenerVentasPorMes();
  }

  obtenerVentasPorMes() {
    this.pedidoService.obtenerVentasPorMes().subscribe(
      (data) => {
          this.ventasPorMes = data.pedido;

          // Loop through the ventasPorMes array and calculate total sales for each month
          this.ventasPorMes.forEach((venta) => {
            const fecha = new Date(venta.fecha);
            const month = fecha.getMonth();
            const total = venta.total;


            // If the month already exists, add the total to the existing value, else initialize it
            if (this.totalVentasPorMes.hasOwnProperty(month)) {
              this.totalVentasPorMes[month] += total;
            } else {
              this.totalVentasPorMes[month] = total;
            }
          });

          // Extract the months and their corresponding total sales for the chart
          this.barChartLabels = Object.keys(this.totalVentasPorMes).map((month) => this.obtenerNombreMes(Number(month)));
          this.barChartData = [
            { data: Object.values(this.totalVentasPorMes), label: 'Ventas Anuales' }
          ];

          //console.log('Total ventas por mes:', this.totalVentasPorMes);
      },
      (error) => {
        console.error('Error al obtener las ventas por mes:', error);
      }
    );
  }

  obtenerNombreMes(numeroMes: number) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[numeroMes];
  }

}
