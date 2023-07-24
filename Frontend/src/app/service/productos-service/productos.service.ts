import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) {}

  listarProductos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  buscarProductos(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  eliminarProductos(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  actualizarProductos(id: string, productos: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, productos);
  }

  insertarProductos(productos: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, productos);
  }

  obtenerPorCodigoBarras(codigoBarra: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/buscar/${codigoBarra}`);
  }
  restarCantidadesProductos(id: string, cantidadARestar: number): Observable<any> {
    console.log(`ID del producto: ${id}, Cantidad a restar: ${cantidadARestar}`);
    return this.http.patch<any>(`${this.apiUrl}/${id}/restar-cantidad`, { cantidad_producto: cantidadARestar });
  }
}

