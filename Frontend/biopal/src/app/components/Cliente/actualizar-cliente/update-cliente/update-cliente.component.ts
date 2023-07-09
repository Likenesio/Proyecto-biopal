import { Component } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente-service/cliente.service';

interface Comuna {
  comuna: string;
}
@Component({
  selector: 'app-update-cliente',
  templateUrl: './update-cliente.component.html',
  styleUrls: ['./update-cliente.component.css']
})
export class UpdateClienteComponent{

    rut: any;
    nombre_cliente: any;
    contacto:any;
    email:any;
    direccion: any;
    comuna: any;

    comunas: Comuna [] = [];
    selectedComuna: any;
    clientesListar: any[] = []
    respuesta: any
    respuestaBusqueda: any;
    clienteSelect : any
    seleccion: boolean= false ;


  constructor(private clienteService: ClienteService) { }

  ngOnInit(){
    this.comunas = [
      { comuna: '' },
      { comuna: 'San Pedro de la Paz' },
      { comuna: 'Chiguayante' },
      { comuna: 'Concepción' },
      { comuna: 'Talcahuano'},
  ];
    this.clienteService.listarClientes().subscribe((date)=>{
        this.respuesta = date;
        this.clientesListar = this.respuesta.client;
    })

    }
    cargarDatos() {
      this.seleccion = true;


      this.clienteService.buscarCliente(this.clienteSelect._id).subscribe((data) => {
        this.respuestaBusqueda = data;



        if (this.respuestaBusqueda && this.respuestaBusqueda.client) {
          this.rut = this.respuestaBusqueda.client.rut;
          this.nombre_cliente = this.respuestaBusqueda.client.nombre_cliente;
          this.contacto = this.respuestaBusqueda.client.contacto;
          this.email = this.respuestaBusqueda.client.email;
          this.direccion = this.respuestaBusqueda.client.direccion;
          this.comuna = this.respuestaBusqueda.client.comuna;
        }
      });
    }

 actualizar(){
  //se crea un objeto llamado cliente
  let cliente = {
    rut: this.rut,
    nombre_cliente:this.nombre_cliente,
    contacto:this.contacto,
    email: this.email,
    direccion: this.direccion,
    comuna:this.selectedComuna.comuna

  }

  this.clienteService.actualizarCliente(this.clienteSelect._id, cliente).subscribe((date)=>{
    alert("cliente actualizado");
  },
  err =>{alert("Error al actualizar cliente")});
}
}
