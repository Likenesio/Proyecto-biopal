import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoProducto } from 'models/pedido-producto';

@Injectable({
  providedIn: 'root'
})
export class PedidoProductoService {
  private apiUrl = 'http://localhost:5000/api/pedido_producto';

  constructor(private http: HttpClient) {}

  insertPedidoProducto(pedidoProducto: PedidoProducto): Observable<PedidoProducto> {
    return this.http.post<PedidoProducto>(this.apiUrl, pedidoProducto);
  }
}
