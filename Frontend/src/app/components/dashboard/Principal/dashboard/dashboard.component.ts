import { ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import{BreakpointObserver} from '@angular/cdk/layout';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { Router } from "@angular/router";
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';
import { UsuarioService } from 'src/app/service/usuario-service/usuario.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})


export class DashboardComponent implements OnInit {
  idUsuario : any;
  usuario: any;
  respuestaIdUsuario: any
  obtenerRol: any
  email: any;
  apellido:any;
  rut:any;

  items: MenuItem[] = [];
  panelAbierto: number | null = null;

  itemss: MenuItem[] | any;

  home: MenuItem | any;

  constructor(private _location: Location, private observer: BreakpointObserver, private cd: ChangeDetectorRef, public authService: AuthService,
     private router: Router, private usuarioService: UsuarioService) {


    }


    ngOnInit() {
        this.itemss= [{ label: 'Facturas', routerLink: 'documentos/facturas'}];

        this.home = { icon: 'pi pi-home', routerLink: '/home' };


      this.idUsuario = this.authService.obtenerIdUsuario();
      this.usuarioService.buscarUsuario(this.idUsuario)
      .subscribe((data)=>{
        this.respuestaIdUsuario = data;
        //console.log( "este:", this.respuestaIdUsuario)
        this.usuario = this.respuestaIdUsuario.usuario.nombre_usuario;
        this.apellido = this.respuestaIdUsuario.usuario.apellido;
        this.email = this.respuestaIdUsuario.usuario.correo;

        this.obtenerRol = this.authService.obtenerRol();

      });
    }
    agregarBreadcrumb(items: MenuItem) {
      this.itemss.push(items);
    }

    eliminarUltimoBreadcrumb() {
      this.itemss.pop();
    }

    @ViewChild(MatSidenav)
    sidenav!:MatSidenav;


  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
    window.location.reload()
  }

  ngAfterViewInit(){
    this.observer.observe(['(max-width:1300px)']).subscribe((resp:any)=>{
      if(resp.matches){
      this.sidenav.mode ='over';
      this.sidenav.close();
      }else{
        this.sidenav.mode ='side';
        this.sidenav.open();
      }

      })
      this.cd.detectChanges()
    }

    cambiarPanel(index: number) {
      if (this.panelAbierto === index) {
        this.panelAbierto = null;
      } else {
        this.panelAbierto = index;
      }
    }

    goBack(){
      this._location.back();
    }

}


