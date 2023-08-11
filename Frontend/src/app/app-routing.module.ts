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
import { PedidoComponent } from './components/Pedidos/crear-pedido/pedido.component';
import { ListarPedidoComponent } from './components/Pedidos/listar-pedido/listar-pedido/listar-pedido.component';
import { DetallePedidoComponent } from './components/Pedidos/detalle-pedido/detalle-pedido/detalle-pedido.component';
import { ListarUsuarioComponent } from './components/Usuario/listar-usuario/listar-usuario/listar-usuario.component';
import { ActualizarUsuarioComponent } from './components/Usuario/actualizar-usuario/actualizar-usuario/actualizar-usuario.component';
import { HomeComponent } from './components/home/home/home.component';
import { HistorialPedidoComponent } from './components/historial-pedido/historial-pedido/historial-pedido.component';
import { BoletasComponent } from './components/documentos/boletas/boletas.component';
import { VentasAnualesComponent } from './components/Ventas/ventas-anuales/ventas-anuales.component';
import { FacturaComponent } from './components/Factura/factura/factura.component';
import { PerfilUsuarioComponent } from './components/Perfil/perfil-usuario/perfil-usuario.component';
import { VentasMesComponent } from './components/ventas-mes/ventas-mes/ventas-mes.component';



const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch: 'full'},
  {path:'', redirectTo:'home', pathMatch: 'full'},
  {path:'home', component : HomeComponent , canActivate: [RoleGuard], data: { requiredRoles: ['Vendedor', 'Administrador','Bodeguero'] }},
  {path:'productos/listar', component: ListarProductosComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Vendedor', 'Administrador','Bodeguero'] }},
  {path: 'productos/ingresar', component: IngresarProductoComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Vendedor', 'Administrador','Bodeguero'] }},
  {path:'productos/actualizar', component: ActualizarProductoComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Vendedor', 'Administrador','Bodeguero'] }},
  {path:'cliente/listar', component: ListarClienteComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Vendedor', 'Administrador'] }},
  {path:'cliente/crear', component: CrearClienteComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Vendedor', 'Administrador'] }},
  {path:'cliente/update', component: UpdateClienteComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Vendedor', 'Administrador'] }},
  {path:'pedidos/crear', component: PedidoComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Vendedor', 'Administrador'] }},
  {path:'pedidos/listar', component: ListarPedidoComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Vendedor', 'Administrador','Bodeguero', 'Facturador'] }},
  {path:'pedidos/detalle/:pedido', component: DetallePedidoComponent, canActivate: [RoleGuard], data:{ requiredRoles: ['Vendedor', 'Administrador','Bodeguero', 'Facturador'] }},
  {path:'pedidos/historialPedidos', component: HistorialPedidoComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Vendedor', 'Administrador'] }},
  {path:'pedidos/ventasPorMes', component: VentasAnualesComponent, canActivate: [RoleGuard], data: { requiredRoles: [ 'Administrador'] }},
  {path:'pedidos/ventasPorDia', component: VentasMesComponent, canActivate: [RoleGuard], data: { requiredRoles: [ 'Administrador'] }},
  {path:'usuario/listarUsuario', component: ListarUsuarioComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Vendedor', 'Administrador'] }},
  {path:'usuario/crear', component: CrearUsuarioComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Vendedor', 'Administrador'] }},
  {path:'usuario/modificarUsuario', component: ActualizarUsuarioComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Vendedor', 'Administrador'] }},
  {path:'usuario/perfilUsuario', component: PerfilUsuarioComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Vendedor', 'Administrador'] }},
  {path:'documentos/boletas', component: BoletasComponent, canActivate: [RoleGuard], data:{ requiredRoles: ['Administrador','Facturador'] }},
  {path:'documentos/facturas', component: FacturaComponent, canActivate: [RoleGuard], data:{ requiredRoles: ['Administrador','Facturador'] }},
  {path:'denegate', component : DenegateComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
