import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente-service/cliente.service';
import Swal from 'sweetalert2';
interface Comuna {
  comuna: string;
}
@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css'],
})
export class CrearClienteComponent {
  rut: any;
  nombre_cliente: any;
  direccion: any;
  comuna: any;
  contacto: any;
  giroemis: any;
  email: any;
  comunas: Comuna[] = [];
  selectedComuna: any;
  camposCompletos: boolean = false;

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.comunas = [
      { comuna: '' },
      { comuna: 'San Pedro de la Paz' },
      { comuna: 'Chiguayante' },
      { comuna: 'Concepción' },
      { comuna: 'Talcahuano' },
    ];
  }
  validarCamposCompletos() {
    this.camposCompletos =
      !!this.rut &&
      !!this.nombre_cliente &&
      !!this.giroemis &&
      !!this.contacto &&
      !!this.email &&
      !!this.direccion &&
      !!this.selectedComuna.comuna;
  }
  validarTelefonoChileno(telefono: string): boolean {
    const regex = /^\+569\d{8}$/;
    return regex.test(telefono);
  }

  guardar() {
    this.validarRut();
    if (!this.validarRut()) {
      //alert("El RUT no es válido.");
      return;
    }
    if (!this.validarTelefonoChileno(this.contacto)) {
      Swal.fire({
        icon: 'info',
        text: 'El número de teléfono no es válido.',
      });
      return;
    }
    this.validarCamposCompletos();
    if (this.camposCompletos) {
      let cliente = {
        rut: this.rut,
        nombre_cliente: this.nombre_cliente,
        contacto: this.contacto,
        giroemis: this.giroemis,
        email: this.email,
        direccion: this.direccion,
        comuna: this.selectedComuna.comuna,
      };

      this.clienteService.insertarCliente(cliente).subscribe(
        (data) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cliente guardado exitosamente!',
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
            text: 'Error al guardar el cliente!',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'info',
        text: 'Debe llenar todos los campos antes de guardar.',
      });
    }
  }

  validarRut(): boolean {
    if (!this.rut || this.rut.trim() === '') {
      Swal.fire({
        icon: 'info',
        text: 'El número rut es requerido',
      });
      return false;
    }

    const regex = /^[0-9]{8}-(?:[0-9-kK])$/;

    if (!regex.test(this.rut)) {
      Swal.fire({
        icon: 'info',
        text: 'El formato del rut no es válido',
      });
      return false;
    }

    const rutLimpio = this.rut.replace(/\./g, '').replace(/-/g, '');
    const digitoVerificador = rutLimpio.slice(-1);
    const rutSinDigito = rutLimpio.slice(0, -1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = rutSinDigito.length - 1; i >= 0; i--) {
      suma += Number(rutSinDigito[i]) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = suma % 11;
    const digitoCalculado =
      resto === 0 ? '0' : resto === 1 ? 'k' : String(11 - resto);
    const digitoEsK = digitoCalculado === '10' ? 'k' : digitoCalculado;

    if (digitoEsK !== digitoVerificador.toLowerCase()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El RUT es inválido o no existe',
      });
      //alert("RUT inválido");
      return false;
    }
    //alert("RUT válido");
    return true;
  }
}
