import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario-service/usuario.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { window } from 'rxjs';
import Swal from 'sweetalert2';

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

  constructor(private authService: AuthService, private router:Router, private usuarioService: UsuarioService) {

  }


  login() {

    //Rescata los datos del formulario
    const usuario = { correo: this.correo, contrasenia: this.contrasenia };
    //Llama el servicio del login y envía los datos del formulario
    this.usuarioService.login(usuario).subscribe((data) => {
      //Rescata el token recibido y lo envía a la función del servicio que almacena el token
      this.authService.saveToken(data.token)
      //Para verificar si recibió el token
      //alert("Sesión exitosa, \nToken:"+data.token);
      this.router.navigate(['/productos/listar']);


    },
    error => {
     Swal.fire({
     icon: 'error',
     title: 'Oops...',
     text: 'El email o contraseña son inválidos',
     footer: '<a>Intenta con un email o contraseña distinto</a>'
    })
    });

  }
  ngOnInit() {

  }

}
