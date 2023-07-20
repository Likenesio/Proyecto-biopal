import { Component } from '@angular/core';
import { AuthService } from './service/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'biopal';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    //Verifica si hay sesión abierta
    this.isLoggedIn = this.authService.isLoggedIn()
  }
}
