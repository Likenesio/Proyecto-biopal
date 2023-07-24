import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { InputNumberModule } from 'primeng/inputnumber';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';

import { DialogModule } from 'primeng/dialog';


import { ListarProductosComponent } from './components/Producto/listar-productos/listar-productos.component';
import { IngresarProductoComponent } from './components/Producto/ingresar-producto/ingresar-producto.component';
import { ActualizarProductoComponent } from './components/Producto/actualizar-producto/actualizar-producto.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CrearClienteComponent } from './components/Cliente/ingresar-cliente/crear-cliente/crear-cliente.component';
import { ListarClienteComponent } from './components/Cliente/listar-cliente/listar-cliente/listar-cliente.component';
import { UpdateClienteComponent } from './components/Cliente/actualizar-cliente/update-cliente/update-cliente.component';
import { CrearUsuarioComponent } from './components/Usuario/ingresar-usuario/crear-usuario.component';
import { LoginComponent } from './components/login/login/login.component';
import { PedidoComponent } from './components/Pedidos/crear-pedido/pedido.component';
import { AuthService } from './service/auth-service/auth.service';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { DenegateComponent } from './components/denegate/denegate/denegate.component';
import { DashboardComponent } from './components/dashboard/Principal/dashboard/dashboard.component';
import { ListarPedidoComponent } from './components/Pedidos/listar-pedido/listar-pedido/listar-pedido.component';
import { DetallePedidoComponent } from './components/Pedidos/detalle-pedido/detalle-pedido/detalle-pedido.component';
import { ListarUsuarioComponent } from './components/Usuario/listar-usuario/listar-usuario/listar-usuario.component';
import { ActualizarUsuarioComponent } from './components/Usuario/actualizar-usuario/actualizar-usuario/actualizar-usuario.component';
import { HomeComponent } from './components/home/home/home.component';
import { HistorialPedidoComponent } from './components/historial-pedido/historial-pedido/historial-pedido.component';
import { BoletasComponent } from './components/documentos/boletas/boletas.component';
import { VentasAnualesComponent } from './components/Ventas/ventas-anuales/ventas-anuales.component';

@NgModule({
  declarations: [
    AppComponent,
    IngresarProductoComponent,
    ListarProductosComponent,
    ActualizarProductoComponent,
    NavbarComponent,
    CrearClienteComponent,
    ListarClienteComponent,
    UpdateClienteComponent,
    CrearUsuarioComponent,
    PedidoComponent,
    LoginComponent,
    DenegateComponent,
    DashboardComponent,
    ListarPedidoComponent,
    DetallePedidoComponent,
    HistorialPedidoComponent,
    ListarUsuarioComponent,
    ActualizarUsuarioComponent,
    HomeComponent,
    BoletasComponent,
    VentasAnualesComponent

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CalendarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    FormsModule,
    CardModule,
    ButtonModule,
    TableModule,
    HttpClientModule,
    MenubarModule,
    SweetAlert2Module,
    InputNumberModule,
    NgbModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatTreeModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatTableModule,
    DialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgChartsModule,



    ],
  providers: [AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
