import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './components/Producto/listar-productos/listar-productos.component';
import { IngresarProductoComponent } from './components/Producto/ingresar-producto/ingresar-producto.component';
import { ActualizarProductoComponent } from './components/Producto/actualizar-producto/actualizar-producto.component';
import { ListarClienteComponent } from './components/Cliente/listar-cliente/listar-cliente/listar-cliente.component';
import { CrearClienteComponent } from './components/Cliente/ingresar-cliente/crear-cliente/crear-cliente.component';
import { UpdateClienteComponent } from './components/Cliente/actualizar-cliente/update-cliente/update-cliente.component';
import { CrearUsuarioComponent } from './components/Usuario/ingresar-usuario/crear-usuario.component';
import { DenegateComponent } from './components/denegate/denegate/denegate.component';
import { RoleGuard } from './role.guard';
import { DashboardComponent } from './components/dashboard/Principal/dashboard/dashboard.component';
import { PedidoComponent } from './components/Pedidos/crear-pedido/pedido.component';
import { ListarPedidoComponent } from './components/Pedidos/listar-pedido/listar-pedido/listar-pedido.component';
import { DetallePedidoComponent } from './components/Pedidos/detalle-pedido/detalle-pedido/detalle-pedido.component';
import { ListarUsuarioComponent } from './components/Usuario/listar-usuario/listar-usuario/listar-usuario.component';




const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch: 'full'},
  {path:'dashboard', component : DashboardComponent},
  {path:'productos/listar', component: ListarProductosComponent, canActivate: [RoleGuard], data: { requiredRole: 'Vendedor' }},
  {path: 'productos/ingresar', component: IngresarProductoComponent, canActivate: [RoleGuard], data: { requiredRole: 'Vendedor' }},
  {path:'productos/actualizar', component: ActualizarProductoComponent, canActivate: [RoleGuard], data: { requiredRole: 'Vendedor' }},
  {path:'cliente/listar', component: ListarClienteComponent, canActivate: [RoleGuard], data: { requiredRole: 'Vendedor' }},
  {path:'cliente/crear', component: CrearClienteComponent, canActivate: [RoleGuard], data: { requiredRole: 'Vendedor' }},
  {path:'cliente/update', component: UpdateClienteComponent, canActivate: [RoleGuard], data: { requiredRole: 'Vendedor'}},
  {path:'pedidos/crear', component: PedidoComponent, canActivate: [RoleGuard], data: { requiredRole: 'Vendedor'}},
  {path:'pedidos/listar', component: ListarPedidoComponent, canActivate: [RoleGuard], data: { requiredRole: 'Vendedor'}},
  {path:'pedidos/detalle/:pedido', component: DetallePedidoComponent, canActivate: [RoleGuard], data: { requiredRole: 'Vendedor'}},
  {path:'usuario/listarUsuario', component: ListarUsuarioComponent, canActivate: [RoleGuard], data: { requiredRole: 'Administrador' }},
  {path:'usuario/crear', component: CrearUsuarioComponent, canActivate: [RoleGuard], data: { requiredRole: 'Administrador' }},
  {path:'denegate', component : DenegateComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
