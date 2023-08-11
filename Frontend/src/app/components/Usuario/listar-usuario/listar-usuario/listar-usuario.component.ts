import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../service/usuario-service/usuario.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth-service/auth.service';

export interface Usuario{
  rut_usuario: String;
  nombre_usuario: String;
  fono: String;
  correo: String;
  rol: String;
}
@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css'],
})
export class ListarUsuarioComponent implements OnInit {
  respuesta: any;
  usuarios: any[] = [];
  first = 0;
  rows = 10;
  listarUsuarios: Usuario[] = [];
  usuarioLogeado:any;
  idUsuario : any;
  usuarioDatos: any;

  constructor(private usuarioService: UsuarioService, private authService: AuthService) {}

  ngOnInit() {
    this.usuarioService.listarUsuario().subscribe((data) => {
      this.respuesta = data;
      this.usuarios = this.respuesta.usuario;
    });
    this.usuarioService.listarUsuario().subscribe((data)=>{
      this.respuesta = data.client;
      this.respuesta.map((cliente:any)=>{
        this.listarUsuarios.push({
          rut_usuario: cliente.rut_usuario,
          nombre_usuario: cliente.nombre_usuario,
          fono: cliente.fono,
          correo: cliente.correo,
          rol: cliente.rol
        });
      })
     })
this.usuarioLogeado = this.authService.isLoggedIn()
console.log(this.usuarioLogeado)
this.idUsuario = this.authService.obtenerIdUsuario();
this.usuarioService.buscarUsuario(this.idUsuario)
.subscribe((data)=>{
  this.usuarioDatos= data.usuario
});

  }

  eliminar(id: string) {
    if (this.usuarioDatos && this.usuarioLogeado && this.usuarioDatos._id === id) {
      Swal.fire({
        title: 'No puedes eliminar al usuario logeado',
        text: 'El usuario logeado no puede ser eliminado.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
  
    Swal.fire({
      title: 'Estás seguro de eliminar al usuario?',
      text: 'No podrás revertirlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          );
          setTimeout(() => {
            window.location.reload();
          }, 800);
        });
      }
    });
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.listarUsuarios ? this.first === this.listarUsuarios.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.listarUsuarios ? this.first === 0 : true;
  }

}
