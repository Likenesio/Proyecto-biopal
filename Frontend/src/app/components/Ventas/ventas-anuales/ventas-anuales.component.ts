import { Component, OnInit } from "@angular/core";
import { PedidoService } from "src/app/service/pedido/pedido.service";
import { ChartDataset } from "chart.js";
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';


interface TotalVentasPorMes {
  [key: number]: number;
}


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: "app-ventas-anuales",
  templateUrl: "./ventas-anuales.component.html",
  styleUrls: ["./ventas-anuales.component.css"],
})
export class VentasAnualesComponent implements OnInit {
  ventasPorMes: any[] = [];
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType = "bar";
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  resultado: any;
  pedido: any;
  startData= new Date();
  totalVentasPorMes: TotalVentasPorMes = {};
  date = new FormControl();

  
  color: any [] = [ 
  '#FFB1C1', 
  '#FFD700', 
  '#90EE90', 
  '#87CEEB', 
  '#FFA07A', 
  '#8A2BE2', 
  '#3CB371', 
  '#FF4500', 
  '#9370DB', 
  '#1E90FF', 
  '#FF69B4', 
  '#20B2AA', 
];

  constructor(private pedidoService: PedidoService) {
    
  }

  ngOnInit() {
    this.obtenerVentasPorMes();

  }
//grafico inicial
  obtenerVentasPorMes() {
    this.pedidoService.obtenerVentasPorMes().subscribe(
      (data) => {
        this.ventasPorMes = data.pedido;

       
        this.ventasPorMes.forEach((venta) => {
          const fecha = new Date(venta.fecha);
          const month = fecha.getMonth();
          const total = venta.total;

          
          if (this.totalVentasPorMes.hasOwnProperty(month)) {
            this.totalVentasPorMes[month] += total;
          } else {
            this.totalVentasPorMes[month] = total;
          }
        });

        // Extract the months and their corresponding total sales for the chart
        this.barChartLabels = Object.keys(this.totalVentasPorMes).map((month) =>
          this.obtenerNombreMes(Number(month))
        );
    
        this.barChartData = [
          {
            type: "line",
            data: Object.values(this.totalVentasPorMes),
            label: "Ventas Anuales",
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
            //backgroundColor: this.color,
          },
        ];

        //console.log('Total ventas por mes:', this.totalVentasPorMes);
      },
      (error) => {
        console.error("Error al obtener las ventas por mes:", error);
      }
    );
  }

  obtenerNombreMes(numeroMes: number) {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return meses[numeroMes];
  }
  setMonthAndYear(event: any, dp: MatDatepicker<Date>) {
    if (event) {
      const selectedDate = event;
      this.date.setValue(selectedDate);
      this.startData = new Date(selectedDate.getFullYear(), 0, 1); // Establecer el inicio del año seleccionado
      this.obtenerVentasPorAnio(); // Cambio aquí
    } else {
      // Restaurar valores por defecto o realizar acciones según lo necesites
      this.barChartLabels = Object.keys(this.totalVentasPorMes).map(month => this.obtenerNombreMes(Number(month)));
      this.barChartData = [{
        type: "line",
        data: Object.values(this.totalVentasPorMes),
        label: "Ventas Anuales",
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }];
  
      // Restablecer startData según lo que necesites
      this.startData = new Date();
      
      this.obtenerVentasPorAnio(); // Cambio aquí
    }
  
    dp.close();
  }
  obtenerVentasPorAnio() {
    const selectedYear = this.startData.getFullYear();
  
    // Filtrar ventas en base al año seleccionado
    const ventasFiltradas = this.ventasPorMes.filter((venta: any) => {
      const fechaVenta = new Date(venta.fecha);
      return fechaVenta.getFullYear() === selectedYear;
    });
  
    // Actualizar los datos del gráfico con las ventas filtradas
    this.actualizarGrafico(ventasFiltradas);
  }


  actualizarGrafico(ventasFiltradas: any[]) {
    this.totalVentasPorMes = {};
  
    ventasFiltradas.forEach(venta => {
      const fecha = new Date(venta.fecha);
      const month = fecha.getMonth();
      const total = venta.total;
  
      if (this.totalVentasPorMes.hasOwnProperty(month)) {
        this.totalVentasPorMes[month] += total;
      } else {
        this.totalVentasPorMes[month] = total;
      }
    });
  
    this.barChartLabels = Object.keys(this.totalVentasPorMes).map(month => this.obtenerNombreMes(Number(month)));
    this.barChartData = [{
      type: "line",
            data: Object.values(this.totalVentasPorMes),
            label: "Ventas Anuales",
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
    }];
  
}
}
