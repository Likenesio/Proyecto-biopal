import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './components/Producto/listar-productos/listar-productos.component';
import { IngresarProductoComponent } from './components/Producto/ingresar-producto/ingresar-producto.component';
import { ActualizarProductoComponent } from './components/Producto/actualizar-producto/actualizar-producto.component';
import { ListarClienteComponent } from './components/Cliente/listar-cliente/listar-cliente/listar-cliente.component';
import { CrearClienteComponent } from './components/Cliente/ingresar-cliente/crear-cliente/crear-cliente.component';
import { UpdateClienteComponent } from './components/Cliente/actualizar-cliente/update-cliente/update-cliente.component';
import { CrearUsuarioComponent } from './components/Usuario/ingresar-usuario/crear-usuario.component';
import { LoginComponent } from './components/login/login/login.component';




const routes: Routes = [
  {path:'productos/listar', component: ListarProductosComponent},
  {path: 'productos/ingresar', component: IngresarProductoComponent},
  {path:'productos/actualizar', component: ActualizarProductoComponent},
  {path:'cliente/listar', component: ListarClienteComponent},
  {path:'cliente/crear', component: CrearClienteComponent},
  {path:'cliente/update', component: UpdateClienteComponent},
  {path:'usuario/crear', component: CrearUsuarioComponent},
  {path:'login', component: LoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
