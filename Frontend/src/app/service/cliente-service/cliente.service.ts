import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = environment.apiUrl+'/cliente';
  constructor(private http: HttpClient) {}

  listarClientes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  buscarCliente(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  eliminarCliente(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  actualizarCliente(id: string, cliente: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cliente);
  }

  insertarCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente);
  }
}
