import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css'
})
export class UserdashboardComponent {

}
