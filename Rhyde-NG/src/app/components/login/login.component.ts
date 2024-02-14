import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { loginDetails } from '../../interfaces/login.interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    title = 'Login Here'
    link = '../assets/login.png'

    login(details:loginDetails){
      console.log(details);
      

    }
}
