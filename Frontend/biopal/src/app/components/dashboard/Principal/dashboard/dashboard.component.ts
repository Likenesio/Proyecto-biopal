import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import{BreakpointObserver} from '@angular/cdk/layout';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {

  constructor(private observer: BreakpointObserver, private cd: ChangeDetectorRef) {

  }


  ngOnInit() {
  }

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav;



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


