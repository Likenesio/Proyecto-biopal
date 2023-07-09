import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../service/usuario-service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {

  respuesta: any;
  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.listarUsuario().subscribe((data)=>{
      this.respuesta= data;
      this.usuarios = this.respuesta.usuario
    })
  }

    eliminar(id: string) {
      Swal.fire({
        title: '¿Seguro desea eliminar al usuario?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: 'Denegar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario(id).subscribe(data => {
            Swal.fire('¡Realizado!', '', 'success');
            window.location.reload();
          });
        } else if (result.isDenied) {
          Swal.fire('No se ha eliminado al usuario', '', 'info');
        }
      });
    }

}

