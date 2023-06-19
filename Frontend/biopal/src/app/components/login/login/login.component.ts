import { Component } from '@angular/core';

import { AuthService } from 'src/app/service/auth-service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public correo: any;
  public contrasenia:any;

  constructor(private router: Router, private authService: AuthService) {}



  login(): void {

    const credentials = {
      correo: this.correo,
      contrasenia: this.contrasenia
    };
    console.log(credentials);
    this.authService.login(credentials);
    // Verificar si el token se guarda en el almacenamiento local
    const storedToken = localStorage.getItem('token');
    console.log('Token almacenado:', storedToken);
    // Redirigir al componente 'navbar' después de iniciar sesión
    this.router.navigate(['productos/ingresar']);
  }
}
