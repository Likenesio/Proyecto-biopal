import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario-service/usuario.service';
import Swal from 'sweetalert2';
interface Rol {
  rol: string;
}
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  rut_usuario: any;
  nombre_usuario: any;
  apellido: any;
  contrasenia: any;
  fono: any;
  correo: any;
  rol: any;
  roles: Rol[] = [];
  selectedRol: any;
  camposCompletos: boolean = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.roles = [
      { rol: '' },
      { rol: 'Administrador' },
      { rol: 'Vendedor' },
      { rol: 'Facturador' },
      { rol: 'Bodeguero' },
    ];
  }

  validarCamposCompletos() {
    this.camposCompletos =
      !!this.rut_usuario &&
      !!this.nombre_usuario &&
      !!this.apellido &&
      !!this.fono &&
      !!this.correo &&
      !!this.contrasenia &&
      !!this.selectedRol.rol;
  }
  validarTelefonoChileno(telefono: string): boolean {
    const regex = /^\+569\d{8}$/;
    return regex.test(telefono);
  }

  validarRut():boolean {
    if (!this.rut_usuario || this.rut_usuario.trim() === "") {
      Swal.fire({
        icon: 'info',
        text: 'El número rut es requerido',
      })
      return false;
    }

    const regex = /^[0-9]{8}-(?:[0-9-kK])$/;

    if (!regex.test(this.rut_usuario)) {
      Swal.fire({
        icon: 'info',
        text: 'El formato del rut no es válido',
      })
      return false;
    }

    const rutLimpio = this.rut_usuario.replace(/\./g, "").replace(/-/g, "");
    const digitoVerificador = rutLimpio.slice(-1);
    const rutSinDigito = rutLimpio.slice(0, -1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = rutSinDigito.length - 1; i >= 0; i--) {
      suma += Number(rutSinDigito[i]) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = suma % 11;
    const digitoCalculado = resto === 0 ? "0" : resto === 1 ? "k" : String(11 - resto);
    const digitoEsK = digitoCalculado === "10" ? "k" : digitoCalculado;

    if (digitoEsK !== digitoVerificador.toLowerCase()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El RUT es inválido o no existe',
      })
      //alert("RUT inválido");
      return false;
    }
    //alert("RUT válido");
    return true;
  }


  ingresar() {
    this.validarRut();
    if (!this.validarRut()) {
      //alert('El RUT no es válido.');
      return;
    }
    if (!this.validarTelefonoChileno(this.fono)) {
      Swal.fire({
        icon: 'info',
        text: 'El número de teléfono no es válido.',
      })
      return;
    }
    this.validarCamposCompletos();
    if (this.camposCompletos) {
    let usuario = {
      rut_usuario: this.rut_usuario,
      nombre_usuario: this.nombre_usuario,
      apellido: this.apellido,
      contrasenia: this.contrasenia,
      fono: this.fono,
      correo: this.correo,
      rol: this.selectedRol.rol,
    };
    this.usuarioService.insertarUsuario(usuario).subscribe(
      (data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario guardado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(()=>{
          window.location.reload();
        }, 800);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al guardar el usuario!',
        })
      }
    );
   } else {
    Swal.fire({
      icon: 'info',
      text: 'Debe llenar todos los campos antes de guardar.',
    })
  }
 }
}
