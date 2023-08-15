import { Component } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente-service/cliente.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
interface Comuna {
  comuna: string;
}
@Component({
  selector: 'app-update-cliente',
  templateUrl: './update-cliente.component.html',
  styleUrls: ['./update-cliente.component.css'],
})
export class UpdateClienteComponent {
  rut: any;
  nombre_cliente: any;
  contacto: any;
  email: any;
  direccion: any;
  comuna: any;
  giroemis:any

  comunas: Comuna[] = [];
  selectedComuna: any;
  clientesListar: any[] = [];
  respuesta: any;
  respuestaBusqueda: any;
  clienteSelect: any;
  seleccion: boolean = false;

  camposCompletos: boolean = false;


  constructor(private clienteService: ClienteService, private _location: Location) {}

  ngOnInit() {
    this.comunas = [
      { comuna: 'San Pedro de la Paz' },
      { comuna: 'Chiguayante' },
      { comuna: 'Concepción' },
      { comuna: 'Talcahuano' },
    ];
    this.clienteService.listarClientes().subscribe((date) => {
      this.respuesta = date;
      this.clientesListar = this.respuesta.client;
    });
  }

  validarCamposCompletos() {
    this.camposCompletos =
      !!this.nombre_cliente &&
      !!this.giroemis&&
      !!this.contacto &&
      !!this.email &&
      !!this.direccion &&
      !!this.selectedComuna;
  }

  validarTelefonoChileno(telefono: string): boolean {
    const regex = /^\+569\d{8}$/;
    return regex.test(telefono);
  }

  cargarDatos() {
    this.seleccion = true;

    this.clienteService
      .buscarCliente(this.clienteSelect._id)
      .subscribe((data) => {
        this.respuestaBusqueda = data;
          this.rut = this.respuestaBusqueda.client.rut;
          this.nombre_cliente = this.respuestaBusqueda.client.nombre_cliente;
          this.contacto = this.respuestaBusqueda.client.contacto;
          this.email = this.respuestaBusqueda.client.email;
          this.giroemis = this.respuestaBusqueda.client.giroemis;
          this.direccion = this.respuestaBusqueda.client.direccion;
          this.comuna = this.respuestaBusqueda.client.comuna;
      });
  }

  validarCorreoElectronico(correo: string) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
  }

  validarNombre(nombre: string): boolean {
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(nombre);
  }

  actualizar() {
    this.validarCamposCompletos();
    if (this.camposCompletos) {
      //se crea un objeto llamado cliente
      let cliente = {
        rut: this.rut,
        nombre_cliente: this.nombre_cliente,
        contacto: this.contacto,
        email: this.email,
        giroemis: this.giroemis,
        direccion: this.direccion,
        comuna: this.selectedComuna.comuna,
      };
      if(!this.validarNombre(this.nombre_cliente)){
        Swal.fire({
          icon: 'info',
          text: 'Ingrese un nombre sin carácteres númericos',
        });
        return;
      }

      if (!this.validarCorreoElectronico(this.email)) {
        Swal.fire({
          icon: 'info',
          text: 'El email no es válido.',
        });
        return;
      }

      if (!this.validarTelefonoChileno(this.contacto)) {
        Swal.fire({
          icon: 'info',
          text: 'El número de teléfono no es válido',
        });
        return;
      }
      this.clienteService
        .actualizarCliente(this.clienteSelect._id, cliente)
        .subscribe(
          (date) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cliente actualizado exitosamente!',
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(()=>{
              window.location.reload();
            }, 800);
          },

          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error al actualizar cliente!',
            });
          }
        );
    } else {
      Swal.fire({
        icon: 'info',
        text: 'Debe llenar todos los campos antes de actualizar al cliente.',
      });
    }
  }
  goBack(){
    this._location.back();
  }
}
