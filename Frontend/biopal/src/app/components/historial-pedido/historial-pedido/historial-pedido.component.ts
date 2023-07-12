import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido/pedido.service';
import { DatePipe } from '@angular/common';
import {FormControl} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

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

  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');

    this.pedidoService.listarP().subscribe((data)=>{
          this.respuesta =data;
          this.pedidosListar = this.respuesta.pedido;
   })
  }

}
