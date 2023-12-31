import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PedidoProductoService {
  private apiUrl = environment.apiUrl+'/pedido_producto';

  constructor(private http: HttpClient) {}

  insertPedidoProducto(pedidoProducto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pedidoProducto);
  }
  buscarPP(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  listarPedidoProducto(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  buscarIdPedido(pedidoID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pedido/${pedidoID}`);
  }
}
