import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario-service/usuario.service';

interface Roles{
  rol: String;
}
@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit {

  rut: any;
  nombre_usuario: any;
  fono:any;
  correo:any;
  rol: any;

  roles: Roles [] = [];
  selectedRoles: any;
  usuariosListar: any[] = []
  respuesta: any
  respuestaBusqueda: any;
  usuarioSelect : any
  seleccion: boolean= false ;

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit() {
    this.roles = [
      { rol: '' },
      { rol: 'Vendedor' },
      { rol: 'Administrador' },
      { rol: 'Bodeguero' },
      { rol: 'Facturador'},
  ];
    this.usuarioService.listarUsuario().subscribe((date)=>{
        this.respuesta = date;
        this.usuariosListar = this.respuesta.usuario;
    })

  }

  cargarDatos() {
    this.seleccion = true;


    this.usuarioService.buscarUsuario(this.usuarioSelect._id).subscribe((data) => {
      this.respuestaBusqueda = data;



      if (this.respuestaBusqueda && this.respuestaBusqueda.usuario) {
        this.rut = this.respuestaBusqueda.usuario.rut_usuario;
        this.nombre_usuario = this.respuestaBusqueda.usuario.nombre_usuario;
        this.fono = this.respuestaBusqueda.usuario.fono;
        this.correo = this.respuestaBusqueda.usuario.correo;
        this.rol = this.respuestaBusqueda.usuario.rol;
      }
    });
  }

  actualizar(){
    //se crea un objeto llamado usuario
    let usuario = {
      rut: this.rut,
      nombre_usuario:this.nombre_usuario,
      fono:this.fono,
      correo: this.correo,
      tol:this.selectedRoles.rol

    }
    this.usuarioService.actualizarUsuario(this.usuarioSelect._id, usuario).subscribe((date)=>{
      alert("Usuario actualizado satisfactoriamente");
    },
    err =>{alert("Error al actualizar al usuario")});
  }
}
