import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario-service/usuario.service';

interface Rol{
  rol:string
}
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  rut_usuario: any;
  nombre_usuario: any;
  apellido:any;
  contrasenia: any;
  fono: any;
  correo:any;
  rol: any;
  roles: Rol [] = [];
  selectedRol: any;
  camposCompletos: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.roles =[
      {rol: ''},
      {rol: 'Administrador'},
      {rol: 'Vendedor'},
      {rol: 'Facturador'},
      {rol: 'Bodeguero'},
    ];

}

validarCamposCompletos() {
  this.camposCompletos = !!this.rut_usuario && !!this.nombre_usuario && !!this.fono && !!this.correo && !!this.contrasenia && !!this.selectedRol;
}
validarTelefonoChileno(telefono: string): boolean {
  const regex = /^\+?56(?:9\d{8}|\d{8})$/;
  return regex.test(telefono);
}

validarRut(): boolean {
  if (!this.rut_usuario || this.rut_usuario.trim() === "") {
    console.log("El RUT es requerido");
    return false;
  }

  const regex = /^[0-9]{8}-[0-9kK]{1}$/;

  if (!regex.test(this.rut_usuario)) {
    console.log("Formato de RUT inválido");
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
  const digitoCalculado = String(11 - resto);
  const digitoEsK = digitoCalculado === "10" ? "k" : digitoCalculado;

  if (digitoEsK !== digitoVerificador.toLowerCase()) {
    console.log("RUT inválido");
    return false;
  }

  console.log("RUT válido");
  return true;
}


ingresar(){
  if (!this.validarRut()) {
    alert("El RUT no es válido.");
    return;
  }
  if (!this.validarTelefonoChileno(this.fono)) {
    alert("El número de teléfono no es válido.");
    return;
  }
  this.validarCamposCompletos();

  let usuario = {
   rut_usuario:this.rut_usuario,
   nombre_usuario:this.nombre_usuario,
   apellido:this.apellido,
   contrasenia:this.contrasenia,
   fono: this.fono,
   correo:this.correo,
   rol: this.selectedRol.rol
  };
  this.usuarioService.insertarUsuario(usuario).subscribe(
    (data:any)=>{
      console.log(data)
      alert("Usuario creado exitosamente")
    },
    (error:any)=>{
      alert("Error al crear usuario")
    }
  )
}
}

