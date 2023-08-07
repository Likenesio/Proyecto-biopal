import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = environment.apiUrl+'/usuario';
  constructor(private http: HttpClient) {}

  listarUsuario(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  buscarUsuario(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  actualizarUsuario(id: string, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, usuario);
  }
  actualizarDatosUsuario(id: string, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/data/${id}`, usuario);
  }

  insertarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  login(usuario: any): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`; // Agrega /login a la URL base
    return this.http.post<any>(loginUrl, usuario);
  }
}
