import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario-service/usuario.service';
import Swal from 'sweetalert2';
interface Roles {
  rol: String;
}
@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css'],
})
export class ActualizarUsuarioComponent implements OnInit {
  rut_usuario: any;
  nombre_usuario: any;
  apellido: any;
  fono: any;
  correo: any;
  rol: any;
  contrasenia:any;

  roles: Roles[] = [];
  selectedRoles: any;
  usuariosListar: any[] = [];
  respuesta: any;
  respuestaBusqueda: any;
  usuarioSelect: any;
  seleccion: boolean = false;
  camposCompletos: boolean = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.roles = [
      { rol: '' },
      { rol: 'Vendedor' },
      { rol: 'Administrador' },
      { rol: 'Bodeguero' },
      { rol: 'Facturador' },
    ];
    this.usuarioService.listarUsuario().subscribe((date) => {
      this.respuesta = date;
      this.usuariosListar = this.respuesta.usuario;
    });
  }

  cargarDatos() {
    this.seleccion = true;

    this.usuarioService
      .buscarUsuario(this.usuarioSelect._id)
      .subscribe((data) => {
        this.respuestaBusqueda = data;

        if (this.respuestaBusqueda && this.respuestaBusqueda.usuario) {
          this.rut_usuario = this.respuestaBusqueda.usuario.rut_usuario;
          this.nombre_usuario = this.respuestaBusqueda.usuario.nombre_usuario;
          this.apellido = this.respuestaBusqueda.usuario.apellido;
          this.contrasenia = this.respuestaBusqueda.usuario.contrasenia;
          this.fono = this.respuestaBusqueda.usuario.fono;
          this.correo = this.respuestaBusqueda.usuario.correo;
          this.rol = this.respuestaBusqueda.usuario.rol;
        }
      });
  }

  validarTelefonoChileno(telefono: string): boolean {
    const regex = /^\+569\d{8}$/;
    return regex.test(telefono);
  }

  validarCamposCompletos() {
    this.camposCompletos =
      !!this.rut_usuario &&
      !!this.nombre_usuario &&
      !!this.apellido &&
      !!this.contrasenia &&
      !!this.fono &&
      !!this.correo &&
      !!this.selectedRoles.rol;
  }

  actualizar() {
    this.validarCamposCompletos();
    if (this.camposCompletos) {
      //se crea un objeto llamado usuario
      let usuario = {
        rut: this.rut_usuario,
        nombre_usuario: this.nombre_usuario,
        apellido: this.apellido,
        fono: this.fono,
        contrasenia:this.contrasenia,
        correo: this.correo,
        rol: this.selectedRoles.rol,
      };
      if (!this.validarTelefonoChileno(this.fono)) {
        Swal.fire({
          icon: 'info',
          text: 'El número de teléfono no es válido',
        });
        return;
      }

      this.usuarioService
        .actualizarUsuario(this.usuarioSelect._id, usuario)
        .subscribe(
          (date) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Usuario actualizado exitosamente!',
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              window.location.reload();
            }, 800);
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error al actualizar usuario',
            });
          }
        );
    }else{
      Swal.fire({
        icon: 'info',
        text: 'Debe llenar todos los campos antes de guardar.',
      });
    }
  }
}
