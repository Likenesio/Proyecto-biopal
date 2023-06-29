import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import{BreakpointObserver} from '@angular/cdk/layout';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { Router } from "@angular/router";




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {

  constructor(private observer: BreakpointObserver, private cd: ChangeDetectorRef, private authService: AuthService, private router: Router) {

  }


  ngOnInit() {
  }

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav;

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
    window.location.reload()
  }

  ngAfterViewInit(){
    this.observer.observe(['(max-width:960px)']).subscribe((resp:any)=>{
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

}


