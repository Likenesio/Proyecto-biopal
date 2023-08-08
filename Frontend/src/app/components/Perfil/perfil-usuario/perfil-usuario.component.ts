import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/service/auth-service/auth.service";
import { UsuarioService } from "src/app/service/usuario-service/usuario.service";
import { Usuario } from "../../Usuario/listar-usuario/listar-usuario/listar-usuario.component";
import Swal from 'sweetalert2';

@Component({
  selector: "app-perfil-usuario",
  templateUrl: "./perfil-usuario.component.html",
  styleUrls: ["./perfil-usuario.component.css"],
})
export class PerfilUsuarioComponent implements OnInit {
  idUser: any;
  email: any;
  pass: any;
  user: any;
  oldPassword: any;
  newPassword: any;
  confirmPassword: any;
  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.idUser = this.authService.obtenerIdUsuario();
    //console.log("IDUSER: ", this.idUser);
    this.usuarioService.buscarUsuario(this.idUser).subscribe((data) => {
      //console.log("Data: ", data);
      this.user = data.usuario;
      console.log("Usuario: ", this.user);
      this.email = this.user.correo;
      this.pass = this.user.contrasenia;

      console.log("Correo: ", this.email)
      console.log("Pass: ", this.pass)
    });
  }

  cambiarContrasenia() {
    const idUsuario = this.idUser;
    const oldPassword = this.oldPassword;
    const newPassword = this.newPassword;

    this.usuarioService
      .cambiarContrasenia(idUsuario, oldPassword, newPassword)
      .subscribe(
        (response) => {
          console.log("Respuesta: ", response)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Contraseña cambiada exitosamente!',
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => {
            window.location.reload();
          }, 800);
          if(idUsuario == this.authService.obtenerIdUsuario()){
            this.authService.logout();
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Para que los cambios sean reflejados, debe volver a ingresar',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al cambiar la contraseña',
          });
          setTimeout(() => {
            window.location.reload();
          }, 800);
        });

        
  }
}
