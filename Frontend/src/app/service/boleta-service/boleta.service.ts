import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoletaService {
  private apiUrl = environment.apiUrl+'/boleta';
  
  constructor(private http: HttpClient) { }

  crearBoleta(boleta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, boleta);
  }

  buscarBoletaID(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  buscarBoletaNumero(numero: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/buscar/${numero}`);
  }
  listarBoletas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  eliminarBoleta(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  actualizarBoleta(id: string, boleta: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, boleta);
  }
  actualizarEstadoBoleta(id: string, boleta: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/actualizar/${id}`, boleta);
  }
}
