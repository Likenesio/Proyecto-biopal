import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from 'models/pedido';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:5000/api/pedido';

  constructor(private http: HttpClient) {}

  insertPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }
}
