import { Component } from '@angular/core';
import { ProductosService } from 'src/app/service/productos.service';

//interfaces
interface Unidad {
  unidad: string;
}

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})

export class ActualizarProductoComponent {
//Variables

codigo_barra: any;
nombre_producto: any;
precio_unitario: any;
unidad: any;
stock:any;
unidades: Unidad[] = [];

selectedUnidad: any;
productosListar: any[] = []
respuesta: any
productoSelect : any
respuestaBusqueda: any;
seleccion: boolean= false ;

//Llama al servicio de producto
constructor(private productosService: ProductosService) {}


//main
ngOnInit(){
this.unidades = [
    { unidad: 'KG' },
    { unidad: 'UD.'},
];
this.productosService.listarProductos().subscribe((date)=>{
    this.respuesta = date;
    this.productosListar = this.respuesta.product;
    
})

}

//funciones
cargarDatos(){
     this.seleccion = true; //una vez se llama a la funcion a traves de la busqueda el valor cambia a true y muestra la seccion formulario para actualizar
     //se llama a la funcion buscarProductos() que se encuentra en el productService y seleciona la id del producto para luego guarda la busqueda en la variable data
     this.productosService.buscarProductos(this.productoSelect._id).subscribe((data)=>{
     this.respuestaBusqueda = data;
     //se llama a cada atributo del modelo y extrae el producto del backend
     this.codigo_barra = this.respuestaBusqueda.product.codigo_barra;
     this.nombre_producto = this.respuestaBusqueda.product.nombre_producto;
     this.precio_unitario = this.respuestaBusqueda.product.precio_unitario;
     this.unidad = this.respuestaBusqueda.product.unidad;
     this.stock = this.respuestaBusqueda.product.stock;
     })
}

actualizar() {
  let producto = {
    codigo_barra: this.productoSelect.codigo_barra, // Mantener el mismo código de barras
    nombre_producto: this.nombre_producto,
    precio_unitario:this.precio_unitario,
    unidad: this.selectedUnidad.unidad,
    stock: this.stock
  };

  this.productosService.actualizarProductos(this.productoSelect._id, producto).subscribe(
    (data) => {
      alert("Producto actualizado");
    },
    (err) => {
      alert("Error al actualizar producto");
    }
  );
}
}

