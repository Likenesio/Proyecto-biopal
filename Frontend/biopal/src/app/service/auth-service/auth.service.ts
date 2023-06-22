
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private token: any;
  private currentUser: any;
  private apiUrl = 'http://localhost:5000/api/usuario';
  public isAdmin: boolean = false;

  constructor(private http: HttpClient) {}

  login(credentials: any): void {
    this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => response.token)
    ).subscribe(
      (token) => {
        // Guardar el token en el almacenamiento local
        this.token = token;
        localStorage.setItem('token', this.token);
        // Decodificar el token
        const decodedToken: any = jwt_decode(this.token);
        // Obtener el ID de usuario y enviar una solicitud para obtener los datos del usuario
        const userId = decodedToken.userId;
        this.getUserById(userId).subscribe(
          (user) => {
            this.currentUser = user;
            // Guardar los datos del usuario en el almacenamiento local
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

            // Verificar si el usuario es un administrador y asignar el valor correspondiente a isAdmin
            // Por ejemplo, si el rol del usuario es 'admin', se considera un administrador
            this.isAdmin = this.currentUser?.role === 'Administrador';
          },
          (error) => {
            console.error('Error al obtener los datos del usuario', error);
          }
        );
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
      }
    );
  }

  private getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  isLoggedIn(): boolean {
    // Verificar si el token y los datos del usuario están presentes
    return !!this.token && !!this.currentUser;
  }

  getCurrentUser(): any | null {
    return this.currentUser;
  }

  logout(): void {
    // Limpiar el token y los datos del usuario del almacenamiento local
    this.token = null;
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }
}
