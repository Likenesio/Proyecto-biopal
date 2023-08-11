import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private apiUrl = environment.apiUrl+'/factura';

  constructor(private http: HttpClient) { }

  crearFactura(factura: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, factura);
  }

  buscarFacturaID(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  buscarFacturaNumero(numero: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/buscar/${numero}`);
  }
  listarFacturas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  eliminarFactura(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  actualizarFactura(id: string, factura: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, factura);
  }

  actualizarEstadoFactura(id: string, factura: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/actualizar/${id}`, factura);
  }
  filtrarFacturasPorFecha(fecha: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/filtrar-por-fecha/${fecha}`);
  }
}
