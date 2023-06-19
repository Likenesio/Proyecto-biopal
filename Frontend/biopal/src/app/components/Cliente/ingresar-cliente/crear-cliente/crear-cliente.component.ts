import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente-service/cliente.service';

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
    contacto:any;
    email:any;
    comunas: Comuna [] = [];
    selectedComuna: any;
    camposCompletos: boolean = false;


    constructor(private clienteService: ClienteService) {}

      ngOnInit() {
          this.comunas = [
              { comuna: '' },
              { comuna: 'San Pedro de la Paz' },
              { comuna: 'Chiguayante' },
              { comuna: 'Concepción' },
              { comuna: 'Talcahuano'},
          ];
      }
      validarCamposCompletos() {
        this.camposCompletos = !!this.rut && !!this.nombre_cliente && !!this.contacto && !!this.email && !!this.direccion && !!this.selectedComuna;
      }
      validarTelefonoChileno(telefono: string): boolean {
        const regex = /^\+?56(?:9\d{8}|\d{8})$/;
        return regex.test(telefono);
      }

      guardar() {
        this.validarRut();
        if (!this.validarRut()) {
          alert("El RUT no es válido.");
          return;
        }
        if (!this.validarTelefonoChileno(this.contacto)) {
          alert("El número de teléfono no es válido.");
          return;
        }
        this.validarCamposCompletos();
        if (this.camposCompletos) {
          let cliente = {
            rut: this.rut,
            nombre_cliente: this.nombre_cliente,
            contacto: this.contacto,
            email: this.email,
            direccion: this.direccion,
            comuna: this.selectedComuna.comuna
          };

          this.clienteService.insertarCliente(cliente).subscribe(
            data => {
              alert("Cliente insertado");
            },
            err => {
              alert("Error al insertar cliente");
            }
          );
        } else {
          alert("Debe llenar todos los campos antes de guardar.");
        }
      }



      validarRut(): boolean {
        if (!this.rut || this.rut.trim() === "") {
          console.log("El RUT es requerido");
          return false;
        }

        const regex = /^[0-9]{8}-[0-9kK]{1}$/;

        if (!regex.test(this.rut)) {
          console.log("Formato de RUT inválido");
          return false;
        }

        const rutLimpio = this.rut.replace(/\./g, "").replace(/-/g, "");
        const digitoVerificador = rutLimpio.slice(-1);
        const rutSinDigito = rutLimpio.slice(0, -1);

        let suma = 0;
        let multiplicador = 2;

        for (let i = rutSinDigito.length - 1; i >= 0; i--) {
          suma += Number(rutSinDigito[i]) * multiplicador;
          multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }

        const resto = suma % 11;
        const digitoCalculado = String(11 - resto);
        const digitoEsK = digitoCalculado === "10" ? "k" : digitoCalculado;

        if (digitoEsK !== digitoVerificador.toLowerCase()) {
          console.log("RUT inválido");
          return false;
        }

        console.log("RUT válido");
        return true;
      }


}
