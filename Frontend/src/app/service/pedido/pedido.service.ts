import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = environment.apiUrl+'/pedido';


  constructor(private http: HttpClient) {}

  insertPedido(pedido: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pedido);
  }

  buscarP(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  listarP(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  eliminarPedido(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  actualizarPedido(id: string, pedido: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, pedido);
  }
  obtenerVentasPorMes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
