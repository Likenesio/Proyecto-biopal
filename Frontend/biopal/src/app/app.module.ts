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

import {MatInputModule} from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListarProductosComponent } from './components/Producto/listar-productos/listar-productos.component';
import { IngresarProductoComponent } from './components/Producto/ingresar-producto/ingresar-producto.component';
import { ActualizarProductoComponent } from './components/Producto/actualizar-producto/actualizar-producto.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CrearClienteComponent } from './components/Cliente/ingresar-cliente/crear-cliente/crear-cliente.component';
import { ListarClienteComponent } from './components/Cliente/listar-cliente/listar-cliente/listar-cliente.component';
import { UpdateClienteComponent } from './components/Cliente/actualizar-cliente/update-cliente/update-cliente.component';
import { CrearUsuarioComponent } from './components/Usuario/ingresar-usuario/crear-usuario.component';
import { LoginComponent } from './components/login/login/login.component';
import { PedidoComponent } from './components/Pedidos/pedido/pedido.component';
import { AuthService } from './service/auth-service/auth.service';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { DenegateComponent } from './components/denegate/denegate/denegate.component';



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
    DenegateComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    MatInputModule




  ],
  providers: [AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
