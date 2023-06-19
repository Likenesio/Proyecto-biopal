import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario-service/usuario.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service/auth.service';

interface Rol{
  rol:string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  correo: any;
  contrasenia: any;

  constructor(private authService: AuthService, private router:Router,public usuarioService: UsuarioService) {

  }

  ngOnInit() {

  }
  login() {
    const usuario = { correo: this.correo, contrasenia: this.contrasenia };
    this.usuarioService.login(usuario).subscribe((data) => {
      console.log(data);
      if (data.usuario.rol === 'Administrador') {
        this.router.navigate(['navbar']);
      } else if (data.usuario.rol === 'Vendedor') {
        this.router.navigate(['/productos/actualizar']);
      } else {
        // Redirigir a una página por defecto en caso de que el rol no coincida
        this.router.navigate(['/productos/actualizar']);
      }

      this.authService.updateLoginStatus(true);
    });
  }

}
