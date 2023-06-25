import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/service/auth-service/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
    constructor(private authService: AuthService, private router:Router){}

  items: MenuItem[] = [];

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
    window.location.reload()
  }




      ngOnInit(){

        if(this.authService.obtenerRol() =="Administrador"){
        this.items = [
          {
            label: 'Clientes',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Listar Clientes',
                icon: 'pi pi-fw pi-plus',
                routerLink:['cliente/listar']

            },
            {
            label: 'Actualizar Cliente Existente',
            icon: 'pi pi-fw pi-trash',
            routerLink:['cliente/update']

           },
           {
            label: 'Ingresar Nuevo Cliente',
            icon: 'pi pi-fw pi-trash',
            routerLink:['cliente/crear']

             }
            ]

        },
        {
          label: 'Quit',
          icon: 'pi pi-fw pi-power-off',
          command: ()  => this.logout()
        }

        ]}

        if(this.authService.obtenerRol() =="Vendedor"){
        this.items = [ {

          label: 'Inventario Productos',
          icon: 'pi pi-fw pi-file',
          items: [
              {
                  label: 'Listar Productos',
                  icon: 'pi pi-fw pi-plus',
                  routerLink:['productos/listar']

              },
              {
              label: 'Actualizar Producto Exitente',
              icon: 'pi pi-fw pi-trash',
              routerLink:['productos/actualizar']

             },
             {
              label: 'Ingresar Nuevo Producto',
              icon: 'pi pi-fw pi-trash',
              routerLink:['productos/ingresar']

             }
       ]


      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: ()  => this.logout()
      }

        ]
    }


        this.items = [

            {

                label: 'Inventario Productos',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'Listar Productos',
                        icon: 'pi pi-fw pi-plus',
                        routerLink:['productos/listar']

                    },
                    {
                    label: 'Actualizar Producto Exitente',
                    icon: 'pi pi-fw pi-trash',
                    routerLink:['productos/actualizar']

                   },
                   {
                    label: 'Ingresar Nuevo Producto',
                    icon: 'pi pi-fw pi-trash',
                    routerLink:['productos/ingresar']

                   }
            ]


            },

            {
                label: 'Clientes',
                icon: 'pi pi-fw pi-pencil',
                items: [
                  {
                    label: 'Listar Clientes',
                    icon: 'pi pi-fw pi-plus',
                    routerLink:['cliente/listar']

                },
                {
                label: 'Actualizar Cliente Existente',
                icon: 'pi pi-fw pi-trash',
                routerLink:['cliente/update']

               },
               {
                label: 'Ingresar Nuevo Cliente',
                icon: 'pi pi-fw pi-trash',
                routerLink:['cliente/crear']

                 }
                ]
            },
            {
                label: 'Pedidos',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-user-minus'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Filter',
                                icon: 'pi pi-fw pi-filter',
                                items: [
                                    {
                                        label: 'Print',
                                        icon: 'pi pi-fw pi-print'
                                    }
                                ]
                            },
                            {
                                icon: 'pi pi-fw pi-bars',
                                label: 'List'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Usuaios',
                icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                      label: 'Ingresar Nuevo Usuario',
                      icon: 'pi pi-fw pi-trash',
                      routerLink:['usuario/crear']


                    },
                    {
                        label: 'Archieve',
                        icon: 'pi pi-fw pi-calendar-times',
                        items: [
                            {
                                label: 'Remove',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Quit',
                icon: 'pi pi-fw pi-power-off',
                command: ()  => this.logout()
            }
        ];
    }
}


