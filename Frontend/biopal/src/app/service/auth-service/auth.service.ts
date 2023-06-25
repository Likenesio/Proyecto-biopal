import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/usuario'; // URL del servidor de autenticación

  constructor(private http: HttpClient) { }

  login(correo: string, contrasenia: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correo, contrasenia });
  }

  // Métodos para guardar y obtener el token del almacenamiento local
  saveToken(token: string): void {
    localStorage.setItem('token', token);
    window.location.reload()//Recarga de página para redirigir al sistema
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para comprobar si el usuario ha iniciado sesión
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
  }
}
